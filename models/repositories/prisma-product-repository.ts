import { Repository } from "./repository";
import { prisma } from "@/db";
import { ProductDTO } from "@/models/DTOs/product-DTO";
import { Submission, SubmissionResult } from "@conform-to/react";
import { Prisma } from "@prisma/client";
import { VercelFileStorage } from "../storage/vercel-file-storage";
import { ErrorResponse } from "../errors/error-response";


export class PrismaProductRepository extends Repository<ProductDTO> {

    private readonly fileStorage: VercelFileStorage;
    private lastStoredFile: string = '';

    constructor(t: (key: string) => string) {
        super(t);
        this.fileStorage = new VercelFileStorage();
    }

    all(): Promise<ProductDTO[]> {
        try {
            return prisma.product.findMany().then(products => products.map(product => ({
                id: product.id,
                reference: product.reference,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
            })));
        } catch (e) {
            throw new Error(this.t('productsFetchFailed'));
        }
    }

    async find(id: number): Promise<ProductDTO> {
        try {
            return await prisma.product.findUnique({
                where: { id: Number(id) }
            }).then(product => ({
                id: product?.id,
                reference: product?.reference,
                name: product?.name,
                description: product?.description,
                price: product?.price,
                image: product?.image,
            }) as ProductDTO);
        } catch (e) {
            console.error(e);
            throw new Error(this.t('productFetchFailed'));
        }
    }

    async create(data: ProductDTO): Promise<ProductDTO> {
        try {
            const { reference, name, description, price, image } = data;
            const product = await prisma.product.create({
                data: {
                    reference: reference as string,
                    name: name as string,
                    description: description as string,
                    price: Number(price),
                    image: image as string,
                }
            });
            return product;
        } catch (e) {
            console.error((e as Error).message);
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new ErrorResponse(this.t('unicityConstraintViolation'), 'reference');
                }
            }
            throw new ErrorResponse(this.t('productCreationFailed'), 'internal');
        }
    }

    async update(submission: Submission<ProductDTO>, id: number): Promise<SubmissionResult> {
        const { reference, name, description, price, image } = submission.payload;

        const previousProduct = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!previousProduct) {
            return submission.reply({
                fieldErrors: {
                    errors: [this.t('productNotFound')],
                }
            });
        }

        await this.replaceImage(submission, previousProduct.image);

        try {
            await prisma.product.update({
                where: { id: Number(id) },
                data: {
                    reference: reference as string,
                    name: name as string,
                    description: description as string,
                    price: Number(price),
                    image: image as string,
                }
            });
            return submission.reply();
        } catch (e) {
            return submission.reply({
                fieldErrors: {
                    errors: [this.t('productUpdateFailed')],
                }
            });
        }
    }

    delete(id: string): Promise<ProductDTO> {
        throw new Error('Method not implemented.');
        // return prisma.product.delete({
        //     where: { id: Number(id) }
        // }).then(product => ({
        //     id: product.id,
        //     reference: product.reference,
        //     name: product.name,
        //     description: product.description,
        //     price: product.price,
        //     imageUrl: product.image,
        // }) as ProductDTO);
    }

    private async storeImage(submission: Submission<ProductDTO>): Promise<SubmissionResult> {
        const { image } = submission.payload;
        try {
            this.lastStoredFile = await this.fileStorage.store(image as File);
            return submission.reply();
        } catch (e) {
            return submission.reply({
                fieldErrors: {
                    image: [this.t('fileUploadFailed')],
                }
            });
        }
    }

    private async replaceImage(submission: Submission<ProductDTO>, previousImageUrl: string): Promise<SubmissionResult> {
        const { image } = submission.payload;
        try {
            await this.fileStorage.delete(previousImageUrl);
            this.lastStoredFile = await this.fileStorage.store(image as File);
            return submission.reply();
        } catch (e) {
            return submission.reply({
                fieldErrors: {
                    image: [this.t('fileUploadFailed')],
                }
            });
        }
    }

    private async addProduct(data: ProductDTO): Promise<ProductDTO> {
        const { reference, name, description, price } = data;

        const product = await prisma.product.create({
            data: {
                reference: reference as string,
                name: name as string,
                description: description as string,
                price: Number(price),
                image: 'refactor',
            }
        });

        return product;
    }

    private async cancelProductCreation(submission: Submission<ProductDTO>, e: Error): Promise<SubmissionResult> {
        this.fileStorage.delete(this.lastStoredFile);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return submission.reply({
                    fieldErrors: {
                        reference: [this.t('unicityConstraintViolation')],
                    }
                });
            }
        }
        return submission.reply({
            fieldErrors: {
                errors: [this.t('productCreationFailed')],
            }
        });
    }

    parseToDTO = (data: any): ProductDTO => {
        return {
            id: data.id,
            reference: data.reference,
            name: data.name,
            description: data.description,
            price: data.price,
            image: 'test',
        };
    }
}