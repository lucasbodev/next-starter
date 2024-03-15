import Image from "next/image";
import styles from "@/app/page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
        <Link href={"/count"}>Count</Link>
    </main>
  );
}
