import { ProductDTO } from "@/models/DTOs/product-DTO";
import { Parser } from "@/models/DTOs/parser";


export class ProductParser implements Parser<ProductDTO> {
    
    parse(data: FormData): ProductDTO {
        return {
            id: data.get('id') ? Number(data.get('id')) : undefined,
            reference: data.get('reference') as string,
            name: data.get('name') as string,
            description: data.get('description') as string,
            price: Number(data.get('price')),
        };
    }
}