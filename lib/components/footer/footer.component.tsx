import styles from '@/lib/components/footer/footer.module.css';
import React, { type ReactElement } from 'react';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import Languages from '../languages/languages.component';

interface FooterParams {
  params: LangParams | Promise<LangParams>;
}

const Footer = async ({ params }: Readonly<FooterParams>): Promise<ReactElement> => {

  const awaitedParams = await params;
  const { lang } = awaitedParams;

    return (
        <div className={styles.footer}>
            <Languages lang={lang} />
        </div>
    );
};

export default Footer;
