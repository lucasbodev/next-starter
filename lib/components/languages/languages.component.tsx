'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Link, routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const Languages = () => {

    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button radius='full'>
                    {currentLocale.toUpperCase()}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                onSelectionChange={(key) => {
                    router.replace(pathname, { locale: key.currentKey });
                }}
            >
                {routing.locales.map((locale) => (
                    <DropdownItem key={locale} className='text-black' textValue={locale}>
                        <Link locale={locale} href="/">{locale.toUpperCase()}</Link>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default Languages;
