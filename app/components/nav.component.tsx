import Link from "next/link";
import styles from "@/app/styles/components/nav.module.scss";
import linkStyles from "@/app/styles/components/outline-link.module.scss";
import Account from "@/app/components/account";

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
