import React, { type ReactElement } from 'react';
import styles from '@/lib/styles/pages/page.module.scss';
import linkStyles from '@/lib/styles/components/outline-link.module.scss';
import Link from 'next/link';

const Home = (): ReactElement => {
  return (
        <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Next.js starter</h1>
            <Link href={'/count'} className={linkStyles.outline_link}>Go to Count</Link>
        </main>
  );
};

export default Home;
