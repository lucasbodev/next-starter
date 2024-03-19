import styles from "@/app/styles/page.module.scss";
import Link from "next/link";

const Home = () => {
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Next.js starter</h1>
      <Link href={"/count"}>Go to Count</Link>
    </main>
  );
}

export default Home;
