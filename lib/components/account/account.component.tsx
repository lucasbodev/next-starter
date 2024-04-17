import { getDictionary, type LangParams } from '@/dictionaries';
import utils from '@/lib/styles/utils.module.scss';
import { getSession } from '@auth0/nextjs-auth0';
import React, { type ReactElement } from 'react';

const Nav = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

  const user = await getSession();
  const dictionary = await getDictionary(lang);

  return (
    (user != null)
      ?
      <a href="/api/auth/logout" className={utils.outlined__button}>{dictionary.log.logout}</a>
      :
      <a href="/api/auth/login" className={utils.outlined__button}>{dictionary.log.login}</a>
  );
};

export default Nav;
