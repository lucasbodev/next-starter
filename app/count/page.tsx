import CountViewer from "@/app/components/count-viewer.component";
import CountUpdater from "@/app/components/count-updater.component";
import styles from "@/app/styles/count.module.scss";
import { getCount } from "@/app/actions/count-actions";

const Count = async () => {

    const count = await getCount();

    return (
        <>
            <h1 className={styles.title}>Count</h1>
            <CountViewer countValue={count!}/>
            <CountUpdater/>
        </>
    );
}

export default Count;