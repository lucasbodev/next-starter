export interface ProductSubmission {
    id?: string;
    reference: string; 
    name: string; 
    description: string; 
    price: number; 
    image: File;
    errors?: string | undefined;
}