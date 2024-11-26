/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/actions/product-actions";

const Products = async () => {

    const t = await getTranslations("Products");

    const products = await getProducts();

    return (
        <>
            {products.map(product => (
                <div className="card bg-base-100 shadow-xl" key={product.id}>
                    <figure>
                        <img
                            src={product.imageUrl}
                            alt={product.name} />
                    </figure>
                    <div className="card-body">
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
            ))}
        </>
    );
};

export default Products;