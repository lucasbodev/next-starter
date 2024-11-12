import CountViewer from '@/lib/components/count/count-viewer.component';
import CountUpdater from '@/lib/components/count/count-updater.component';
import styles from '@/app/[lang]/count/count.module.css';
import React, { type ReactElement } from 'react';
import { getDictionary} from '@/dictionaries';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';

interface CountParams {
  params: LangParams | Promise<LangParams>;
}

const Count = async ({ params }: Readonly<CountParams>): Promise<ReactElement> => {

  const awaitedParams = await params;
  const { lang } = awaitedParams;

  const dictionary = await getDictionary(lang);
  
  return (
        <section className={styles.section}>
            <h1 className={styles.title}>{dictionary.count.title}</h1>
            <CountViewer {...dictionary}/>
            <CountUpdater {...dictionary}/>
        </section>
  );
};

export default Count;
