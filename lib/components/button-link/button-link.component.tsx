'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';

interface ButtonLinkProps {
    href: any;
    name: string;
    type?: string;
}

const ButtonLink = (props: ButtonLinkProps) => {

    const { href, name, type } = props;

    const router = useRouter();

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        <button
            className={`btn ${type === 'outline' && 'btn-outline'} btn-primary`}
            onClick={() => { router.push(href); }}>{name}
        </button>

    );
};

export default ButtonLink;
