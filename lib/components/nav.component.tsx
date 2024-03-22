import Link from "next/link";
import styles from "@/lib/styles/components/nav.module.scss";
import Account from "@/lib/components/account";

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">
                        <strong>Home</strong>
                    </Link>
                </li>
                <li>
                    <Link href="/players">
                        <strong>Joueurs</strong>
                    </Link>
                </li>
                <li>
                    <Account />
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
