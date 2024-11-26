"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useActionState } from "react";
import styles from "@/components/product-form/product-form.module.css";
import { useTranslations } from "next-intl";
import { createProduct } from "@/actions/product-actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/models/validations/product-validation";

const ProductForm = () => {

    const t = useTranslations("ProductForm");
    const [lastResult, action, isPending] = useActionState(createProduct, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema(t) });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    return (
        <form className={styles.add__product__form} id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{t('addProductTitle')}</h2>
                    <p className={styles.add__product__form__description}>{t('addProductDescription')}</p>
                    {
                        fields.errors.errors &&
                        <span className="alert alert-error">
                            {fields.errors.errors}
                        </span>
                    }
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">{t('referenceLabel')}</span>
                        </div>
                        <input
                            key={fields.reference.key}
                            name={fields.reference.name}
                            defaultValue={fields.reference.value ?? fields.reference.initialValue}
                            className={`input input-bordered w-full max-w-xs ${fields.reference.errors && "input-error"}`}
                            type="text" placeholder={t('referencePlaceholder')}
                            disabled={isPending}
                        />
                        {
                            fields.reference.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.reference.errors}</span>
                            </div>
                        }

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">{t('nameLabel')}</span>
                        </div>
                        <input
                            key={fields.name.key}
                            name={fields.name.name}
                            defaultValue={fields.name.value ?? fields.name.initialValue}
                            className={`input input-bordered w-full max-w-xs ${fields.name.errors && "input-error"}`}
                            type="text" placeholder={t('namePlaceholder')}
                            disabled={isPending}
                        />
                        {
                            fields.name.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.name.errors}</span>
                            </div>
                        }

                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">{t('descriptionLabel')}</span>
                        </div>
                        <textarea
                            key={fields.description.key}
                            name={fields.description.name}
                            defaultValue={fields.description.value ?? fields.description.initialValue}
                            className={`textarea textarea-bordered h-24 ${fields.description.errors && "textarea-error"}`}
                            placeholder={t('descriptionPlaceholder')}
                            disabled={isPending}></textarea>
                        {
                            fields.description.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.description.errors}</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">{t('priceLabel')}</span>
                        </div>
                        <input
                            key={fields.price.key}
                            name={fields.price.name}
                            defaultValue={fields.price.value ?? fields.price.initialValue}
                            className={`input input-bordered w-full max-w-xs ${fields.price.errors && "input-error"}`}
                            type="number" placeholder={t('pricePlaceholder')}
                            disabled={isPending}
                        />
                        {
                            fields.price.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.price.errors}</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">{t('imagePickerLabel')}</span>
                        </div>
                        <input
                            key={fields.image.key}
                            name={fields.image.name}
                            className={`file-input file-input-bordered w-full max-w-xs ${fields.image.errors && "file-input-error"}`}
                            type="file"
                            disabled={isPending}
                        />
                        {
                            fields.image.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.image.errors}</span>
                            </div>
                        }
                    </label>
                    <div className="card-actions justify-end">
                        {
                            isPending ?
                            <span className="loading loading-ring loading-lg"></span> :
                            <button className="btn btn-primary">{t('addProductBtn')}</button>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;