import CountViewer from "@/app/components/count/count-viewer.component";
import CountUpdater from "@/app/components/count/count-updater.component";
import styles from "@/app/styles/pages/count.module.scss";

const Count = async () => {

    const count = await fetch('http://localhost:3000/api/count', {next: {tags: ['count']}})
        .then(data => {
            return data.json();
        }).then(data => {
            return data.count;
        });

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Count</h1>
            <CountViewer countValue={count!}/>
            <CountUpdater/>
        </section>
    );
}

export default Count;
