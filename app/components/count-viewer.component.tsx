'use client'

import styles from "@/app/styles/count.module.scss";

type CountViewerProps = {
    countValue: number;
}

const CountViewer = ({ countValue }: CountViewerProps) => {
    return (
        <p className={styles.description}>You clicked {countValue} times</p>
    );
}

export default CountViewer;
