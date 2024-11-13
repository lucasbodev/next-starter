import React from 'react';
import styles from '@/app/[locale]/home.module.css';
import HomeAnimations from '@/app/[locale]/home.animations';
import { setRequestLocale, getTranslations } from 'next-intl/server';

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {

  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Home');

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
