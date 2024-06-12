import { type ActionResult } from "../../actions/action-result";
import { list, type ListBlobResultBlob, put } from '@vercel/blob';
import { type Repository } from '@/lib/models/repositories/repository';

export class FileRepository implements Repository<File, ListBlobResultBlob, string> {
    
    async create(data: File): Promise<ActionResult<string>> {
        try {
            const { url } = await put(data.name, data, {
                access: 'public',
            });
            return { message: 'Upload successful', error: false, data: url };
        } catch (e) {
            return { message: 'Upload failed', error: true };
        }
    }

    async all(): Promise<ActionResult<ListBlobResultBlob[]>> {
        try {
            const { blobs } = await list({ prefix: 'images' });
            return { message: 'Files found', error: false, data: blobs };
        } catch (e) {
            return { message: 'Files not found', error: true };
        }
    }
}