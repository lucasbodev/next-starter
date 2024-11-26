import { Repository } from "./repository";
import { prisma } from "@/db";
import { ProductDTO } from "@/models/DTOs/product-DTO";
import { Submission, SubmissionResult } from "@conform-to/react";
import { Prisma } from "@prisma/client";
import { VercelFileStorage } from "../storage/vercel-file-storage";


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
                imageUrl: product.image,
            })));
        } catch (e) {
            throw new Error(this.t('productsFetchFailed'));
        }
    }

    async find(id: number): Promise<ProductDTO> {
        try {
            return await prisma.product.findUnique({
                where: { id: id },
            }).then(product => ({
                id: product?.id,
                reference: product?.reference,
                name: product?.name,
                description: product?.description,
                price: product?.price,
                imageUrl: product?.image,
            }) as ProductDTO);
        } catch (e) {
            throw new Error(this.t('productFetchFailed'));
        }
    }

    async create(submission: Submission<ProductDTO>): Promise<SubmissionResult> {
        const submissionResult = await this.storeImage(submission);

        if (submissionResult.status === 'error') {
            return submissionResult;
        }

        try {
            return await this.addProduct(submission);
        } catch (e) {
            return await this.cancelProductCreation(submission, e as Error);
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
        return prisma.product.delete({
            where: { id: Number(id) }
        }).then(product => ({
            id: product.id,
            reference: product.reference,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.image,
        }) as ProductDTO);
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

    private async addProduct(submission: Submission<ProductDTO>): Promise<SubmissionResult> {
        const { reference, name, description, price } = submission.payload;

        await prisma.product.create({
            data: {
                reference: reference as string,
                name: name as string,
                description: description as string,
                price: Number(price),
                image: this.lastStoredFile,
            }
        });
        return submission.reply();
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
}