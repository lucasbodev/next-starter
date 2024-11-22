import { ActionResult } from "@/lib/actions/action-result";
import { Repository } from "./repository";
import { prisma } from "@/db";
import { ProductSubmission } from "@/lib/models/submission-types/product-submission";
import { Submission, SubmissionResult } from "@conform-to/react";
import { Prisma } from "@prisma/client";
import { VercelFileStorage } from "../storage/vercel-file-storage";


export class PrismaProductRepository extends Repository<ProductSubmission> {

    private readonly fileStorage: VercelFileStorage;
    private lastStoredFile: string = '';

    constructor(t: (key: string) => string) {
        super(t);
        this.fileStorage = new VercelFileStorage();
    }

    all(): Promise<ActionResult<ProductSubmission>[]> {
        throw new Error("Method not implemented.");
    }

    async create(submission: Submission<ProductSubmission>): Promise<SubmissionResult> {
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

    update(data: Submission<ProductSubmission>): Promise<ActionResult<ProductSubmission>> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<ActionResult<ProductSubmission>> {
        throw new Error("Method not implemented.");
    }

    private async storeImage(submission: Submission<ProductSubmission>): Promise<SubmissionResult> {
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

    private async addProduct(submission: Submission<ProductSubmission>): Promise<SubmissionResult> {
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

    private async cancelProductCreation(submission: Submission<ProductSubmission>, e: Error): Promise<SubmissionResult> {
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