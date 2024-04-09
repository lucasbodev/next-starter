import React, { type ReactElement } from 'react';
import styles from '@/app/[lang]/home.module.scss';
import { getDictionary, type LangParams } from '../dictionaries';
import HomeAnimations from '@/app/[lang]/home.animations';

const Home = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

  const dictionary = await getDictionary(lang);

  return (
    <main className={styles.main}>
      <HomeAnimations>
        <div className={styles.title__wrapper}>
          <div className={styles.line} id='topLine' />
          <h1 className={styles.title} id='homeTitle'>
            <strong>{dictionary.home.title}</strong>
          </h1>
          <div className={styles.reverse__line} id='bottomLine' />
        </div>
      </HomeAnimations>
    </main>
  );
};

export default Home;
