'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { locales } from '@/middleware';
import { setPreferredLanguage } from '@/lib/actions/language-actions';
import styles from '@/lib/components/languages/languages.module.css';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';

const Languages: React.FC<LangParams> = ({ lang }) => {

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button radius='full'>
                    {lang.toUpperCase()}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
            >
                {locales.map((locale) => (
                    <DropdownItem key={locale} className='text-black' textValue={locale}>
                        <form action={setPreferredLanguage}>
                            <input type='hidden' name='lang' value={locale} />
                            <button type='submit' className={styles.language__item}></button>
                        </form>
                        {locale.toUpperCase()}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default Languages;
