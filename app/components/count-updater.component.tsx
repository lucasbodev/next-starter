'use client'

import styles from "@/app/styles/count.module.scss";
import { countStore } from "@/store/count-store";
import { incrementCount } from "@/app/actions/count-actions";

const CountUpdater = () => {

    const { setUpdatedCount } = countStore();

    const onSubmit = async () => {
        await incrementCount();
        setUpdatedCount();
    };

    return (
        <form action={ onSubmit }>
            <button type="submit" className={styles.button}>Click me</button>
        </form>
    );
}

export default CountUpdater;