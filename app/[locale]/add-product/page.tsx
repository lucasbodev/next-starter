/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styles from "@/app/[locale]/add-product/add-product.module.css";
import AddProductForm from "@/components/add-product-form/add-product-form.component";

const AddProduct = () => {

    return (
        <div className={styles.add__product__form__container}>
            <AddProductForm />
        </div>
    );
};

export default AddProduct;