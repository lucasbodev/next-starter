import { ActionResult } from "@/actions/action-result";
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

    update(data: Submission<ProductDTO>): Promise<ActionResult<ProductDTO>> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<ActionResult<ProductDTO>> {
        throw new Error("Method not implemented.");
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