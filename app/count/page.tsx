import CountViewer from '@/lib/components/count/count-viewer.component';
import CountUpdater from '@/lib/components/count/count-updater.component';
import styles from '@/lib/styles/pages/count.module.scss';
import React from 'react';

const Count = async (): Promise<React.JSX.Element> => {
  return (
        <section className={styles.section}>
            <h1 className={styles.title}>Count</h1>
            <CountViewer/>
            <CountUpdater/>
        </section>
  );
};

export default Count;
