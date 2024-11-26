import React from "react";
import styles from "@/app/[locale]/edit-product/edit-product.module.css";
import ProductForm from "@/components/product-form/product-form.component";

const EditProduct = (params: {id: number}) => {

    return (
        <div className={styles.edit__product__form__container}>
            <ProductForm />
        </div>
    );
};

export default EditProduct;