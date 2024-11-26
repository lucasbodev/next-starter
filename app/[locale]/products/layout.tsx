import React from "react";
import styles from "@/app/[locale]/products/products.module.css";
import { getTranslations } from "next-intl/server";
import ButtonLink from "@/components/button-link/button-link.component";

const ProductsLayout = async (
    { children }: { children: React.ReactNode }) => {

    const t = await getTranslations("Products");

    return (
        <div className={styles.products__container}>
            <div className={styles.products__header}>
                <div>
                    <h1 className={styles.products__title}>{t('title')}</h1>
                    <p className={styles.products__description}>{t('description')}</p>
                </div>
                <ButtonLink href="/add-product" name={t('addProductBtn')} type="outline" />
            </div>
            <div className={styles.products__grid}>
                {children}
            </div>
        </div>

    );
};

export default ProductsLayout;
