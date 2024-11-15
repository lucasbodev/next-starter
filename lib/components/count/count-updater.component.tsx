'use client';

import styles from '@/app/[locale]/count/count.module.css';
import { useStore } from '@/store/store';
import { useTranslations } from 'next-intl';
import React from 'react';

const CountUpdater = () => {

  const incrementCount = useStore(state => state.setUpdatedCount);
  const t = useTranslations('CountUpdater');

  return (
    <button type="submit" className={styles.button} onClick={incrementCount}>{t('increment')}</button>
  );
};

export default CountUpdater;
