// import { type ActionResult } from "@/lib/actions/action-result";

// export interface Repository<ActionType, ResultType, CreateResultType> {
//     all: () => Promise<ActionResult<ResultType[]>>;
//     create: (data: ActionType) => Promise<ActionResult<CreateResultType>>;
// }

import { ActionResult } from "@/lib/actions/action-result";
import { Submission, SubmissionResult } from "@conform-to/react";

export abstract class Repository<T> {
    
    protected readonly t: (key: string) => string;

    constructor(t: (key: string) => string) {
        this.t = t;
    }

    abstract all(): Promise<ActionResult<T>[]>;
    abstract create(submission: Submission<T>): Promise<SubmissionResult>;
    abstract update(submission: Submission<T>): Promise<ActionResult<T>>;
    abstract delete(id: string): Promise<ActionResult<T>>;
}