'use client';

import styles from '@/lib/styles/pages/count.module.scss';
import { useStore } from '@/store/store';
import React, { type ReactElement } from 'react';

const CountViewer = (): ReactElement => {
  const count = useStore(state => state.count);

  return (
        <p className={styles.description}>You clicked {count} times</p>
  );
};

export default CountViewer;
