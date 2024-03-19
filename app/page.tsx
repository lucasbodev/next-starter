import styles from "@/app/styles/pages/page.module.scss";
import linkStyles from "@/app/styles/components/outline-link.module.scss";
import Link from "next/link";

const Home = () => {
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Next.js starter</h1>
      <Link href={"/count"} className={linkStyles.outline_link}>Go to Count</Link>
    </main>
  );
}

export default Home;
