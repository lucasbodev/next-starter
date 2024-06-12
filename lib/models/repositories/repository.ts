import { type ActionResult } from "@/lib/actions/action-result";

export interface Repository<ActionType, ResultType, CreateResultType> {
    all: () => Promise<ActionResult<ResultType[]>>;
    create: (data: ActionType) => Promise<ActionResult<CreateResultType>>;
}