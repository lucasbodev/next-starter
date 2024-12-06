"use client";

import React, { useRef, useState } from "react";
import styles from "@/components/product-card/product-card.module.css";
import Image from 'next/image';
import { Link } from "@/i18n/routing";
import { ProductDTO } from "@/models/DTOs/product-DTO";
import { useTranslations } from "next-intl";
import { deleteProduct } from "@/actions/product-actions";
import toast from "react-hot-toast";
import DaisyToast from "../daisy-toast/daisy-toast.component";

const ProductCard = ({ product, onDeletion }:
    { product: ProductDTO, onDeletion?: () => void }) => {

    const t = useTranslations("ProductCard");

    const [deletionLoading, setDeletionLoading] = useState(false);

    const deletionModal = useRef<HTMLDialogElement>(null);

    const showDeletionModal = () => {
        deletionModal.current!.showModal();
    }

    const handleDeletion = (id: number) => {
        setDeletionLoading(true);
        deleteProduct(id).then(() => {
            deletionModal.current!.close();
            toast.custom(<DaisyToast message={t('deletionSuccess')} type="success" />);
            setDeletionLoading(false);
        }).catch((e) => {
            toast.custom(<DaisyToast message={(e as Error).message} type="error" />);
            setDeletionLoading(false);
        });
    }

    return (
        <div className="card bg-base-100 shadow-xl" key={product.id}>
            <figure>
                <img
                    src={product.image as string}
                    alt={product.name} />
            </figure>
            <div className="card-body">
                <div className="card-actions justify-end">
                    <div className={styles.action__icons}>
                        <div className="tooltip tooltip-accent" data-tip="Edit product">
                            <Link href={{
                                pathname: '/edit-product/[id]',
                                params: { id: `${product.id}` }
                            }}>
                                <Image src={`/icons/edit.svg`} alt={'Edit'} width="24" height="24" />
                            </Link>
                        </div>
                        <div className="tooltip tooltip-accent" data-tip="Delete product">
                            <button onClick={() => showDeletionModal()}>
                                <Image src={`/icons/delete.svg`} alt={'Edit'} width="24" height="20" />
                            </button>
                        </div>

                    </div>
                    <dialog ref={deletionModal} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">{t('deletionModalTitle')}</h3>
                            <p className="py-4">{t('deletionModalDescription')}</p>
                            {
                                deletionLoading ?
                                    <div className="modal-action">
                                        <span className="loading loading-ring loading-lg"></span>
                                    </div> :
                                    <div className="modal-action">
                                        <button className="btn btn-primary btn-outline" onClick={() => handleDeletion(product.id!)}>{t('delete')}</button>
                                        <form method="dialog">
                                            <button className="btn btn-primary">{t('cancel')}</button>
                                        </form>
                                    </div>
                            }
                        </div>
                    </dialog>
                </div>
                <h2 className="card-title">
                    {product.name}
                    <div className="badge badge-secondary">{product.price}€</div>
                </h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;