// import { type ActionResult } from "@/lib/actions/action-result";

// export interface Repository<ActionType, ResultType, CreateResultType> {
//     all: () => Promise<ActionResult<ResultType[]>>;
//     create: (data: ActionType) => Promise<ActionResult<CreateResultType>>;
// }

import { Submission, SubmissionResult } from "@conform-to/react";

export abstract class Repository<T> {
    
    protected readonly t: (key: string) => string;

    constructor(t: (key: string) => string) {
        this.t = t;
    }

    abstract all(): Promise<T[]>;
    abstract find(id: number): Promise<T>;
    abstract create(submission: Submission<T>): Promise<SubmissionResult>;
    abstract update(submission: Submission<T>, id: number): Promise<SubmissionResult>;
    abstract delete(id: string): Promise<T>;
}