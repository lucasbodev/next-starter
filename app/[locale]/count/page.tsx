import React from 'react';
import CountViewer from '@/lib/components/count/count-viewer.component';
import CountUpdater from '@/lib/components/count/count-updater.component';
import styles from '@/app/[locale]/count/count.module.css';
import { useTranslations } from 'next-intl';

const Count = () => {

  const t = useTranslations('Count');

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{t('title')}</h1>
      <CountViewer />
      <CountUpdater />
    </section>
  );
};

export default Count;
