export interface ProductDTO {
    id?: number;
    reference: string; 
    name: string; 
    description: string; 
    price: number; 
    image?: File;
    imageUrl?: string;
    errors?: string | undefined;
}