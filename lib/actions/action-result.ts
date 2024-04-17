export interface ActionResult<T> {
    message: string;
    error: boolean;
    data?: T;
}