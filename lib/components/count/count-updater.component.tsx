'use client';

import { type Dictionary } from '@/lib/models/dictionaries/dictionary';
import styles from '@/app/[lang]/count/count.module.scss';
import { useStore } from '@/store/store';
import React, { type ReactElement } from 'react';

const CountUpdater = (dictionary: Dictionary): ReactElement => {
  
  const incrementCount = useStore(state => state.setUpdatedCount);

  return (
        <button type="submit" className={styles.button} onClick={incrementCount}>{dictionary.count.increment}</button>
  );
};

export default CountUpdater;
