'use client'

import styles from "@/app/styles/count.module.scss";
import { incrementCount } from "@/app/actions/count-actions";

const CountUpdater = () => {


    const onSubmit = async () => {
        await incrementCount();
    };

    return (
        <form action={ onSubmit }>
            <button type="submit" className={styles.button}>Click me</button>
        </form>
    );
}

export default CountUpdater;
