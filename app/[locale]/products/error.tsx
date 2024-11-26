'use client';

import React from 'react';

const ProductsError = ({ error, reset }: {error: Error & { digest?: string }, reset: () => void }) => {
    return (
        <div>
            <h1>{error.message}</h1>
            <button onClick={() => { reset(); }}>Try again</button>
        </div>
    );
};

export default ProductsError;

