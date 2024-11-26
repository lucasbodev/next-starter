import { Submission } from "@conform-to/react";

export abstract class Validation<T> {

    protected readonly t: (key: string) => string;

    constructor(t: (key: string) => string) {
        this.t = t;
    }

    abstract validate(data: FormData): Submission<T>;
}