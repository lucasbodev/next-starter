'use client';

import React from 'react';
import styles from '@/app/[locale]/count/count.module.css';
import { useStore } from '@/store/store';
import { useTranslations } from 'next-intl';

const CountViewer = () => {

  const count = useStore(state => state.count);
  const t = useTranslations('CountViewer');

  return (
    <p className={styles.description}>{t('countViewer', {count})}</p>
  );
};

export default CountViewer;
