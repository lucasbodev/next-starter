import Layout from "@/app/products/layout";
import CounterViewer from "../components/counter-viewer.component";
import CounterUpdater from "../components/counter-updater.component";

async function Products() {
    return (
        <>
            <div className="h1">Produits</div>
            <Layout>
                <CounterViewer></CounterViewer>
            </Layout>
            <Layout>
                <CounterUpdater></CounterUpdater>
            </Layout>
        </>
    );
}

export default Products;