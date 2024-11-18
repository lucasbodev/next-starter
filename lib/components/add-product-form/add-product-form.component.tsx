"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from "react";
import styles from "@/lib/components/add-product-form/add-product-form.module.css";
import { useTranslations } from "next-intl";
import ButtonLink from "@/lib/components/button-link/button-link.component";

const AddProductForm = () => {

    const t = useTranslations("AddProductForm");
    const successModal = useRef<HTMLDialogElement>(null);

    return (
        <>
            <form className={styles.add__product__form}>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{t('addProductTitle')}</h2>
                        <p className={styles.add__product__form__description}>{t('addProductDescription')}</p>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t('nameLabel')}</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">{t('descriptionLabel')}</span>
                            </div>
                            <textarea className="textarea textarea-bordered h-24" placeholder="Product description"></textarea>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t('priceLabel')}</span>
                            </div>
                            <input type="number" placeholder="Type price" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t('imagePickerLabel')}</span>
                            </div>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                        <div className="card-actions justify-end">
                            <button type="button" className="btn btn-primary" onClick={() => successModal.current?.showModal()}>{t('addProductBtn')}</button>
                        </div>
                    </div>
                </div>
            </form>
            <dialog ref={successModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t('successModalTitle')}</h3>
                    <p className="py-4">{t('successModalDescription')}</p>
                    <div className="modal-action">
                        <ButtonLink href="/products" name={t('successModalLinkButton')} />
                        <form method="dialog">
                            <button className="btn btn-primary">{t('successModalCloseButton')}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default AddProductForm;