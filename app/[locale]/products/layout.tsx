import React from "react";

const ProductsLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="bg-base-200 p-6">
            {children}
        </div>
    );
};

export default ProductsLayout;
