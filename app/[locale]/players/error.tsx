'use client';

import React, { useEffect, type ReactElement } from "react";

const PlayersError = (
    { error, reset }:
        Readonly<{ lang: string; error: Error & { digest?: string }, reset: () => void }>): ReactElement => {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return <div>
        <h2>Something went wrong!</h2>
        <button onClick={() => { reset(); }}>Try again</button>
    </div>;
};

export default PlayersError;