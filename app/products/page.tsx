import Link from "next/link";
import Layout from "@/app/products/layout";

export default function Products() {
    return (
        <>
            <div className="h1">Produits</div>
            <Layout><Link href={"/"}>Go home</Link></Layout>
        </>
    );
}