// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../session/interfaces/INode.sol";

library WireLibrary {

    string private constant node_alredy_set = "Node already set";

    function setNode(
        NodeType nodeType,
        address node,
        Nodes storage nodes
    ) external {
        require(node != address(0), "zero address");
        if (nodeType == NodeType.Token) {
            require(nodes.token == address(0), node_alredy_set);
            nodes.token = node;
        } else if (nodeType == NodeType.Center) {
            require(nodes.center == address(0), node_alredy_set);
            nodes.center = node;
        } else if (nodeType == NodeType.Maker) {
            require(nodes.maker == address(0), node_alredy_set);
            nodes.maker = node;
        } else if (nodeType == NodeType.Taker) {
            require(nodes.taker == address(0), node_alredy_set);
            nodes.taker = node;
        } else if (nodeType == NodeType.XFactory) {
            require(nodes.factory == address(0), node_alredy_set);
            nodes.factory = node;
        }
    }

    function isWiredCall(Nodes storage nodes) external view returns (bool) {
        return
            msg.sender != address(0) &&
            (msg.sender == nodes.token ||
                msg.sender == nodes.maker ||
                msg.sender == nodes.taker ||
                msg.sender == nodes.factory);
    }

    function setFeeStores(FeeStores storage feeStores, FeeStores memory _feeStores) external {
        require(_feeStores.accountant != address(0), "Zero address");
        feeStores.accountant = _feeStores.accountant;
    }

    function setFeeRates(
        ActionType _sessionType,
        mapping(ActionType => FeeRates) storage feeRates,
        FeeRates memory _feeRates
    ) external {
        require(uint(_sessionType) < NumberSessionTypes, "Wrong ActionType");
        require(_feeRates.accountant <= RateMagnifier, "Fee rates exceed limit");

        feeRates[_sessionType].accountant = _feeRates.accountant;
    }

    function isSamePair(address tokenA, address tokenB, address _tokenA, address _tokenB
    ) external pure returns (bool) {
        return (tokenA == _tokenA && tokenB == _tokenB) || (tokenA == _tokenB && tokenB == _tokenA);
    }
}
