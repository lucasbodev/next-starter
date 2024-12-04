import React, { RefObject, useRef } from "react";
import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card/product-card.component";
import { getTranslations } from "next-intl/server";

const Products = async () => {

    const t = await getTranslations("Products");
    const products = await getProducts();
    const toast = useRef<HTMLDivElement>(null);


    const showToast = (toastRef: RefObject<HTMLDivElement>, message: string) => {
        toast.current!.classList.add('show');
        setTimeout(() => {
            toast.current!.classList.remove('show');
        }, 3000);
    }

    return (
        <>
            <div ref={toast} className="toast toast-bottom toast-end">
                <div className="alert alert-success">
                    <span>{t('deleteSuccessMessage')}</span>
                </div>
            </div>
            {
                products.map(product => (
                    <ProductCard key={product.id} product={product} onDeletion={() => showToast} />
                ))
            }
        </>
    );
};

export default Products;