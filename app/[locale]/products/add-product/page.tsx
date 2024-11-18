/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styles from "@/app/[locale]/products/add-product/add-product.module.css";
import AddProductForm from "@/lib/components/add-product-form/add-product-form.component";

const AddProduct = () => {

    return (
        <div className={styles.add__product__form__container}>
            <AddProductForm />
        </div>
    );
};

export default AddProduct;