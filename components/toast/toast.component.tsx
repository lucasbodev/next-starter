"use client";

import { useRef } from "react";

const Toast = ({ message }: { message: string }) => {

    const toast = useRef<HTMLDivElement>(null);

    return (
        <div ref={toast} className="toast toast-bottom toast-end">
            <div className="alert alert-success">
                <span>{message}</span>
            </div>
        </div>
    );
}