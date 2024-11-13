import React from 'react';
import styles from '@/app/utils.module.css';
import { getSession } from '@auth0/nextjs-auth0';
import { getTranslations } from 'next-intl/server';

const Account = async () => {

  const t = await getTranslations('Account');

  const user = await getSession();

  return (
    (user != null)
      ?
      <a href="/api/auth/logout" className={styles.outlined__button}>{t('logout')}</a>
      :
      <a href="/api/auth/login" className={styles.outlined__button}>{t('login')}</a>
  );
};

export default Account;
