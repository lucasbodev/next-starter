import React from 'react';
import styles from '@/app/[locale]/home.module.css';
// import { getDictionary } from "@/dictionaries";
// import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import HomeAnimations from '@/app/[locale]/home.animations';
import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/routing';

// interface HomeParams {
//   params: LangParams | Promise<LangParams>
// }

const Home = async () => {

  // const awaitedParams = await params;
  // const { lang } = awaitedParams;
  // const dictionary = await getDictionary(lang);

  const t = useTranslations('home');



  return (
    <main className={styles.main}>
      <HomeAnimations>
        <div className={styles.title__wrapper}>
          <div className={styles.line} id='topLine' />
          <h1 className={styles.title} id='homeTitle'>
            <strong>{t('title')}</strong>
          </h1>
          <div className={styles.reverse__line} id='bottomLine' />
        </div>
      </HomeAnimations>
    </main>
  );
};

export default Home;
