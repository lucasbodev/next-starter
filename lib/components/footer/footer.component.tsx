import styles from '@/lib/components/footer/footer.module.scss';
import React, { type ReactElement } from 'react';
import { type LangParams } from '@/app/dictionaries';
import Languages from '../languages/languages.component';

const Footer = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

    return (
        <div className={styles.footer}>
            <Languages lang={lang} />
        </div>
    );
};

export default Footer;
