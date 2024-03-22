'use client';

import styles from "@/lib/styles/pages/count.module.scss";
import { useStore } from "@/store/store";

const CountUpdater = () => {

    const incrementCount = useStore(state => state.setUpdatedCount);

    return (
        <button type="submit" className={styles.button} onClick={incrementCount}>Click me</button>
    );
}

export default CountUpdater;
