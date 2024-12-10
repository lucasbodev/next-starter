'use client';

import styles from '@/app/[locale]/counter/counter.module.css';
import { useStore } from '@/store/store';
import { useTranslations } from 'next-intl';
import React from 'react';

const CountUpdater = () => {

  const incrementCount = useStore(state => state.setUpdatedCount);
  const t = useTranslations('CounterUpdater');

  return (
    <button type="submit" className="btn btn-primary" onClick={incrementCount}>{t('increment')}</button>
  );
};
 
export default CountUpdater;
