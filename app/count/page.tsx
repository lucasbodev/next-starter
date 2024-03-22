import CountViewer from "@/lib/components/count/count-viewer.component";
import CountUpdater from "@/lib/components/count/count-updater.component";
import styles from "@/lib/styles/pages/count.module.scss";

const Count = async () => {

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Count</h1>
            <CountViewer/>
            <CountUpdater/>
        </section>
    );
}

export default Count;
