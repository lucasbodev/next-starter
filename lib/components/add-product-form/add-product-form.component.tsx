"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useActionState, useRef } from "react";
import styles from "@/lib/components/add-product-form/add-product-form.module.css";
import { useTranslations } from "next-intl";
import { createProduct } from "@/lib/actions/product-actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { addProductSchema } from "@/app/lib/zodSchemas";

const AddProductForm = () => {

    const t = useTranslations("AddProductForm");
    const [lastResult, action] = useActionState(createProduct, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: addProductSchema(t) });
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
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">{t('nameLabel')}</span>
                        </div>
                        <input
                            key={fields.name.key}
                            name={fields.name.name}
                            defaultValue={fields.name.initialValue}
                            className={`input input-bordered w-full max-w-xs ${fields.name.errors && "input-error"}`}
                            type="text" placeholder={t('namePlaceholder')}
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
                            defaultValue={fields.description.initialValue}
                            className={`textarea textarea-bordered h-24 ${fields.description.errors && "textarea-error"}`}
                            placeholder={t('descriptionPlaceholder')}></textarea>
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
                            defaultValue={fields.price.initialValue}
                            className={`input input-bordered w-full max-w-xs ${fields.price.errors && "input-error"}`}
                            type="number" placeholder={t('pricePlaceholder')}
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
                        />
                        {
                            fields.image.errors &&
                            <div className="label">
                                <span className="label-text-alt text-error">{fields.image.errors}</span>
                            </div>
                        }
                    </label>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">{t('addProductBtn')}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddProductForm;