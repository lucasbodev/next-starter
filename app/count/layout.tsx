import styles from "@/app/styles/count.module.scss";

const CountLayout = ({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) => {
    return (
      <section className={styles.section}>
        {children}
      </section>
    )
  }

export default CountLayout;