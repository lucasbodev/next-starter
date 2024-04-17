import { type ActionResult } from "@/lib/actions/action-result";
import { type z } from "zod";

export abstract class Validation<DataType> {

    abstract validate(data: DataType): ActionResult<void>;

    static getZodMessage = (error: z.ZodError): string => {
        const {issues} = error;
        if (issues.length > 0) {
            const currentIssue = issues[0];
            return currentIssue.message;
        }
        return 'An error occured';
    };
}