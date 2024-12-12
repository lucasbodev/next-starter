import React from "react";

// export const generateStaticParams = () => {
//     return [ {num: '1'}, {num: '2'}, {num: '3'} ];
// }

const ProductsLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="bg-base-200 p-6">
            {children}
        </div>
    );
};

export default ProductsLayout;
