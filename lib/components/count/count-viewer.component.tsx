'use client';

import { type Dictionary } from '@/lib/models/dictionaries/dictionary';
import styles from '@/app/[lang]/count/count.module.scss';
import { useStore } from '@/store/store';
import React, { type ReactElement } from 'react';

const CountViewer = (dictionary: Dictionary): ReactElement => {
  
  const count = useStore(state => state.count);

  return (
        <p className={styles.description}>{dictionary.count.countViewer.replace("{count}", count.toFixed())}</p>
  );
};

export default CountViewer;
