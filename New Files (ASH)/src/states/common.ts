
export const JOB_POST_STATUS = 6;

export const enum JOB_STATUS {
    CREATED,                    // 0
    VERIFYING,                  // 1
    VERIFIED_POST,              // 2
    VALIDATIED_POST,            // 3
    DENIED_POST,                // 4
    POSTED,                     // 5
    INPROGRESSING,              // 6
    JOB_SUBMITTED,              // 7
    VERIFYING_SUBMITTED,        // 8
    VERIFIED_SUBMITTED,         // 9
    VALIDATED_SUBMITTED,        // 10
    DENIED_SUBMITTED,           // 11
    DISPUTE_SUBMITTED,          // 12
    VALIDATED_DISPUTE,          // 13
    COMPLETED1,                 // 14
    DONE1,                      // 15
    CANCELED                    // 16
}
export const JOB_STATUS_LABEL = [
    'Created',
    'Verifying for Post',
    'Verified and Validating for Post',
    'Validated for Post',
    'Denied to Post',
    'Posted',
    'In Progressing',
    'Job Submitted',
    'Verifying for Submitted Job',
    'Verified and Validating for Submitted Job',
    'Validated for Submitted Job',
    'Denied to Submitted Job',
    'Submission Disputed by Owner',
    'Dispute Validated',
    'Completed',
    'Done',
    'Canceled'
];
export const MAX_TITLE_LEN = 100

export interface Job {
    index:number,
    jobLevel: number,
    tgrEarning: boolean,
    jobType: number,
    escrowAmount: string,
    defineTime: number,
    completionTime: number,
    buyer: string,
    title: string,
    description: string,
    validationPeriod: number,
    endTime: number,
    status: number,
    buyerReview: number,
    buyerReviewComment: string,
    sellerReview:number,
    sellerReviewComment: string,
    createdAt: number,
    submittedAt: number,
    disputedAt: number,
    doneAt: number,
    withdrawedAt: number
}

export interface JobType {
    label: string,
    value: string
}

export interface Bid {
    bidder: string,
    description: string
}

export interface Vote {
    voter: string,
    result: boolean
}

export interface AgentsForJob {
    // seller: string,
    // bidders: Bid[],
    // approvalValidators: string[],
    // approvalDeniers: string[],
    // completionValidators: string[],
    // completionDeniers: string[],
    // tempValidators: string[],
    // tempDeniers: string[],
    submittedComment:string,
    seller: string,
    bidders: Bid[],
    verifiers: Vote[],
    validators: Vote[],
}

export const JOB_LEVELS = [0, 1, 2, 3, 4, 5];

export const compareAddress = (_address1:string|undefined, _address2:string|undefined) => {
    if(_address1 === undefined || _address2 === undefined) return false;

    if(_address1.toLocaleLowerCase().localeCompare(_address2.toLocaleLowerCase()) === 0) {
        return true;
    }
    return false;
}

export const formatAddress = (_address:string) => {
    if(_address === undefined || _address === '') return "-";
    return `${_address.substring(0, 7)  }...${_address.substring(_address.length - 6, _address.length-1)}`
}

export const formatText = (_title: string, _isShorten:boolean = true) => {
    if(_title === undefined || _title === '') return "-";
    if(_isShorten && _title.length > MAX_TITLE_LEN) {
        return `${_title.substring(0, MAX_TITLE_LEN)  }...`;
    }
    return _title;
}

export const formatDate = (timestamp: number, isWithTime:boolean=false) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (`0${  date.getMonth() + 1}`).substr(-2);
    const day = (`0${  date.getDate()}`).substr(-2);
    const hour = (`0${  date.getHours()}`).substr(-2);
    const minute = (`0${  date.getMinutes()}`).substr(-2);
    const sec = (`0${  date.getSeconds()}`).substr(-2);

    let res = (`${month}/${day}/${year}`);
    
    if(isWithTime) {
        res += (`${hour}:${minute}:${sec}`);
    }
    return res;
}

export const isLimitTimeOver = (_startAt:number, _limit:number) => {
    const now = new Date();
    const current = Number(now.getTime() / 1000);
    if (current > _startAt + _limit) return true;
    return false;
}

export const isTimeOver = (_endAt:number) => {
    const current = Number(Date.now() / 1000);
    if (current > _endAt) return true;
    return false;
}

export const agentContractAddress = process.env.NEXT_PUBLIC_AGENT || '0x0';
export const htzTokenAddress = process.env.NEXT_PUBLIC_HTZ || 0x0;
export const tgrTokenAddress = process.env.NEXT_PUBLIC_TGR || 0x0;
export const taskContractAddress = process.env.NEXT_PUBLIC_TASK || '0x0';