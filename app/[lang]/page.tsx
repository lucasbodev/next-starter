import React, { type ReactElement } from 'react';
import styles from '@/app/[lang]/home.module.scss';
import { getDictionary } from '../../dictionaries';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import HomeAnimations from '@/app/[lang]/home.animations';
// import { initLocaleCookie } from '@/lib/actions/language-actions';


const Home = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

  const dictionary = await getDictionary(lang);

  // await initLocaleCookie({ lang });

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
