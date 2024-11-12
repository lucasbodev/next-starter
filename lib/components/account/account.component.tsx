import { getDictionary } from '@/dictionaries';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';
import styles from '@/app/utils.module.css';
import { getSession } from '@auth0/nextjs-auth0';
import React, { type ReactElement } from 'react';

interface NavParams {
  params: LangParams | Promise<LangParams>;
}

const Nav = async ({ params }: Readonly<NavParams>): Promise<ReactElement> => {

  const awaitedParams = await params;
  const { lang } = awaitedParams;

  const user = await getSession();
  const dictionary = await getDictionary(lang);

  return (
    (user != null)
      ?
      <a href="/api/auth/logout" className={styles.outlined__button}>{dictionary.log.logout}</a>
      :
      <a href="/api/auth/login" className={styles.outlined__button}>{dictionary.log.login}</a>
  );
};

export default Nav;
