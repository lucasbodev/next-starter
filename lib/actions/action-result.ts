import { SubmissionResult } from "@conform-to/react";

export interface ActionResult<T> {
    submissionResult?: SubmissionResult;
    data?: T;
}