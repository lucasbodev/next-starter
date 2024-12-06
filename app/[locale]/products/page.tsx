import React from "react";
import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card/product-card.component";

const Products = async () => {

    const products = await getProducts();

    return (
        <>
            {
                products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </>
    );
};

export default Products;