import React from "react";
import styles from "@/app/[locale]/add-product/add-product.module.css";
import ProductForm from "@/components/product-form/product-form.component";

const AddProduct = () => {

    return (
        <div className={styles.add__product__form__container}>
            <ProductForm />
        </div>
    );
};

export default AddProduct;