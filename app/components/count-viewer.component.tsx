'use client'

import styles from "@/app/styles/count.module.scss";
import { countStore } from "@/store/count-store";

type CountViewerProps = {
    countValue: number;
}

const CountViewer = ({ countValue }: CountViewerProps) => {

    const { count } = countStore();

    return (
        <p className={styles.description}>You clicked {count === 0 ? countValue : count} times</p>
    );
}

export default CountViewer;