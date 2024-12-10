import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { getTranslations } from 'next-intl/server';

const Account = async () => {

  const t = await getTranslations('Account');

  const user = await getSession();

  return (
    (user != null)
      ?
      <a href="/api/auth/logout" className="btn">{t('logout')}</a>
      :
      <a href="/api/auth/login" className="btn">{t('login')}</a>
  );
};

export default Account;
