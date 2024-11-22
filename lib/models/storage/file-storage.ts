export abstract class FileStorage {
    abstract store(data: File): Promise<string>;
    abstract delete(url: string): Promise<void>;
}