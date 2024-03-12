import Image from "next/image";
import styles from "./page.module.css";
import Counter from "@/app/components/custom-button";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
        <Counter></Counter>
        <Link href={"/products"}>Products</Link>
    </main>
  );
}
