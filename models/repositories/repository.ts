
export abstract class Repository<T> {
    
    protected readonly t: (key: string) => string;

    constructor(t: (key: string) => string) {
        this.t = t;
    }

    abstract all(): Promise<T[]>;
    abstract find(id: number): Promise<T>;
    abstract create(data: T): Promise<T>;
    abstract update(data: T): Promise<T>;
    abstract delete(id: number): Promise<T>;
}