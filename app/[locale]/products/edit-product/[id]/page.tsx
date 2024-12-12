import React from "react";
import styles from "@/app/[locale]/products/edit-product/edit-product.module.css";
import ProductForm from "@/components/product-form/product-form.component";
import { getProduct, getProducts } from "@/actions/product-actions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Products' });

    return {
        title: t('title')
    };
}

// export async function generateStaticParams() {
//     const products = await getProducts();

//     return products.map((product) => ({
//         id: product.id,
//     }))
// }

const EditProduct = async ({ params }: { params: Promise<{ locale: string, id: string }> }) => {
    const id = (await params).id;
    const locale = (await params).locale;

    const product = await getProduct(id);
    console.log(product);
    console.log(locale);

    // const locale = await getLocale();
    // console.log(locale);

    return (
        <div className={styles.edit__product__form__container}>
            <ProductForm defaultValue={product} />
        </div>
    );
};

export default EditProduct;