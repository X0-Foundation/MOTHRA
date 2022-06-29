// SPDX-License-Identifier: MIT

pragma solidity =0.8.4;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct Agent {
    address account;
    uint level;
    uint stakedAmount;
}

enum TaskStatus {
    Pending,
    Verified,
    Posted,
    Assigned,
    Delivered,
    Complete,
    Incomplete,
    Cancelled
}

enum JobBidType {
    FirstPerson,    // first person can complete the job.
    OneWinner,      // a selected bidder from multiple bidders can complete the job.
    MultiWinner     // multiple bidders are selected and the reward is splitted evenly
}

struct TaskDetails {
    string name;
    string summary;
    uint reward;
    uint bonus;
    uint8 minLevel;
    uint8 minCompletions;
    JobBidType jobType;
    TaskStatus status;
    uint8[] skillSet;
    address owner;
    uint dueTime;
    uint verifiedTime;
}

contract XdaoAgency is UUPSUpgradeable, Ownable, Initializable {
    IERC20 public tgr;

    mapping(address => bool) public isAgent;
    mapping(address => Agent) public agentInfo;
    mapping(uint => TaskDetails) public tasks;
    mapping(uint => uint) public taskVerifiersCount;
    mapping(address => uint[]) private userTasks;
    mapping(address => mapping(uint => bool)) public agentVerifiedTask;
    mapping(uint => address[]) public doers;

    mapping(uint => address[]) public bidders;
    mapping(uint => mapping(address => bool)) public bidden;

    mapping(uint => address[]) public taskCompleters;

    mapping(uint => address[]) public taskEndVerifiers;

    mapping(address => uint) public agentLastSlashTime;

    uint currentTaskId = 0;
    uint NumVerificationsNeeded = 11;
    uint SlashImpactPeriod = 7 days; // The time period of being level 0 after you get slashed

    event TaskCreated(uint id, string name, uint reward, uint status, uint minLevel, address creator);
    event TaskVerified(uint id);
    event TaskPosted(uint id);
    event TaskAssigned(uint id, address doer);
    event TaskDone(uint id, address doer);
    event TaskDelivered(uint id);
    event TaskEndVerified(uint id);

    modifier onlyAgent() {
        require(isAgent[msg.sender], "No Agent");
        _;
    }

    function setNumVerificationsNeeded(uint _num) external onlyOwner {
        NumVerificationsNeeded = _num;
    }

    function setSlashImpactPeriod(uint _time) external onlyOwner {
        SlashImpactPeriod = _time;
    }

    function initialize(IERC20 _tgr) public initializer {
        tgr = _tgr;
    }

    function _isTask(uint _id) internal view returns (bool) {
        return _id < currentTaskId;
    }

    function submitTask(
        TaskDetails memory _task
    ) external onlyAgent returns (uint taskId) {

        currentTaskId++;
        _task.status = TaskStatus.Pending;
        _task.owner = msg.sender;
        tasks[currentTaskId] = _task;

        emit TaskCreated(currentTaskId, _task.name, _task.reward, uint(TaskStatus.Pending), _task.minLevel, msg.sender);

        return 0;
    }

    function verifyTask(uint _taskId) external onlyAgent {
        require (_isTask(_taskId), "V: Invalid ID");
        require (agentInfo[msg.sender].level >= tasks[_taskId].minLevel, "V: Level!");
        require (!agentVerifiedTask[msg.sender][_taskId], "V: Already");
        require (tasks[_taskId].status == TaskStatus.Pending, "V: Invalid Req");

        agentVerifiedTask[msg.sender][_taskId] = true;
        taskVerifiersCount[_taskId] += 1;

        if (taskVerifiersCount[_taskId] >= NumVerificationsNeeded) {
            tasks[_taskId].status = TaskStatus.Verified;
            tasks[_taskId].verifiedTime = block.timestamp;
            emit TaskVerified(_taskId);
        }
    }

    function requestRevalidation(uint _id, string memory _evidence) external onlyAgent {

    }

    function postTask(uint _id) external {
        require (tasks[_id].owner == msg.sender, "P: Access denied");
        require (tasks[_id].status == TaskStatus.Verified, "P: Invalid status");
        require (block.timestamp >= tasks[_id].verifiedTime + 24 hours, "P: Wait pls");

        tasks[_id].status = TaskStatus.Posted;
        emit TaskPosted(_id);
    }

    function placeBid(uint _id) external {
        require (tasks[_id].status == TaskStatus.Posted, "B: Not verified");
        require (agentInfo[msg.sender].level >= tasks[_id].minLevel, "B: No level");

        if (tasks[_id].jobType == JobBidType.FirstPerson) {
            tasks[_id].status = TaskStatus.Assigned;
            doers[_id].push(msg.sender);

            emit TaskAssigned(_id, msg.sender);
        } else {
            require (!bidden[_id][msg.sender], "B: Already bidden");

            bidders[_id].push(msg.sender);
            bidden[_id][msg.sender] = true;
        }
    }

    function assignTask(uint _id, uint[] memory _bidders) external onlyAgent {
        require (tasks[_id].owner == msg.sender, "A: Access denied");
        require (tasks[_id].status == TaskStatus.Posted, "A: Invalid status");

        uint i;
        for (i = 0; i < _bidders.length; i+=1) {
            uint id = _bidders[i];
            doers[_id].push(bidders[_id][id]);

            emit TaskAssigned(_id, bidders[_id][id]);
        }

        tasks[_id].status = TaskStatus.Assigned;
    }

    function _isTaskCompletedByUser(uint _id, address user) public view returns (bool) {
        uint i;
        for (i = 0; i < taskCompleters[_id].length; i+=1) {
            if (taskCompleters[_id][i] == user) return true;
        }
        return false;
    }

    function compeletTask(uint _id) external onlyAgent {
        require (tasks[_id].status == TaskStatus.Assigned, "C: Invalid status");
        require (!_isTaskCompletedByUser(_id, msg.sender), "C: Already done!");
        require (bidden[_id][msg.sender], "C: Not bidder!");
        
        taskCompleters[_id].push(msg.sender);

        emit TaskDone(_id, msg.sender);
        if (taskCompleters[_id].length >= tasks[_id].minCompletions) {
            emit TaskDelivered(_id);
            tasks[_id].status = TaskStatus.Delivered;
        }
    }

    function _isTaskEndVerifiedByUser(uint _id, address user) public view returns (bool) {
        uint i;
        for (i = 0; i < taskEndVerifiers[_id].length; i+=1) {
            if (taskEndVerifiers[_id][i] == user) return true;
        }
        return false;
    }

    function verifyTaskCompletion(uint _id) external onlyAgent {
        require (tasks[_id].status == TaskStatus.Delivered, "VC: Invalid status");
        require (agentVerifiedTask[msg.sender][_id], "VC: Access denied!");
        require (!_isTaskEndVerifiedByUser(_id, msg.sender), "VC: Already done!");
        
        taskEndVerifiers[_id].push(msg.sender);

        if (taskEndVerifiers[_id].length >= NumVerificationsNeeded) {
            emit TaskEndVerified(_id);
            tasks[_id].status = TaskStatus.Complete;
        }
    }

    function stake(uint amount) external onlyAgent {
        require (amount > 0, "Invalid amount");

        tgr.transferFrom(msg.sender, address(this), amount);
        agentInfo[msg.sender].stakedAmount += amount;
        updateAgentLevel(msg.sender);
    }

    function updateAgentLevel(address _agent) public {
        Agent storage agent = agentInfo[_agent];

        if (agentLastSlashTime[_agent] + SlashImpactPeriod > block.timestamp) {
            agent.level = 0;
            return;
        }

        if (agent.stakedAmount >= 50000) {
            agent.level = 5;
        } else if (agent.stakedAmount >= 5000) {
            agent.level = 4;
        } else if (agent.stakedAmount >= 500) {
            agent.level = 3;
        } else if (agent.stakedAmount >= 100) {
            agent.level = 2;
        } else if (agent.stakedAmount >= 10) {
            agent.level = 1;
        } else {
            agent.level = 0;
        }
    }

    function unStake(uint amount) external onlyAgent {
        require (amount <= agentInfo[msg.sender].stakedAmount, "Invalid amount");

        tgr.transfer(msg.sender, amount);
        agentInfo[msg.sender].stakedAmount -= amount;
        updateAgentLevel(msg.sender);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
