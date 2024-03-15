import Layout from "@/app/count/layout";
import CountViewer from "@/app/components/count-viewer.component";
import CountUpdater from "@/app/components/count-updater.component";

async function Count() {
    return (
        <>
            <h1>Count</h1>
            <Layout>
                <CountViewer/>
            </Layout>
            <Layout>
                <CountUpdater/>
            </Layout>
        </>
    );
}

export default Count;