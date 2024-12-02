import React from "react";
import { getProducts } from "@/actions/product-actions";
import Image from 'next/image';
import { Link } from "@/i18n/routing";

const Products = async () => {

    const products = await getProducts();

    return (
        <>
            {products.map(product => (
                <div className="card bg-base-100 shadow-xl" key={product.id}>
                    <figure>
                        <img
                            src={product.image as string}
                            alt={product.name} />
                    </figure>
                    <div className="card-body">
                        <div className="card-actions justify-end">
                            <Link href={{
                                pathname: '/edit-product/[id]',
                                params: { id: `${product.id}` }
                            }}>
                                <Image src={`/icons/edit.svg`} alt={'Edit'} width="24" height="24" />
                            </Link>
                        </div>
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