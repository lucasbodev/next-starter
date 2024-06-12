import CountViewer from '@/lib/components/count/count-viewer.component';
import CountUpdater from '@/lib/components/count/count-updater.component';
import styles from '@/app/[lang]/count/count.module.scss';
import React, { type ReactElement } from 'react';
import { getDictionary} from '@/dictionaries';
import { type LangParams } from '@/lib/models/dictionaries/lang-params';

const Count = async ({ params: { lang } }: Readonly<{ params: LangParams }>): Promise<ReactElement> => {

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
