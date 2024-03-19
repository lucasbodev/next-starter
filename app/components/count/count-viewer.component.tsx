'use server';

import styles from "@/app/styles/pages/count.module.scss";

type CountViewerProps = {
    countValue: number;
}

const CountViewer = async ({ countValue }: CountViewerProps) => {
    return (
        <p className={styles.description}>You clicked {countValue} times</p>
    );
}

export default CountViewer;
