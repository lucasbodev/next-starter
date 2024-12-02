import React from "react";
import styles from "@/app/[locale]/edit-product/edit-product.module.css";
import ProductForm from "@/components/product-form/product-form.component";
import { getProduct } from "@/actions/product-actions";

const EditProduct = async ({ params }: { params: Promise<{ id: number }> }) => {
    const id = (await params).id;

    const product = await getProduct(id);

    return (
        <div className={styles.edit__product__form__container}>
            <ProductForm defaultValue={product}/>
        </div>
    );
};

export default EditProduct;