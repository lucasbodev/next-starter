import linkStyles from "@/lib/styles/components/outline-link.module.scss";
import { getSession } from '@auth0/nextjs-auth0';

const Nav = async () => {

    const user = await getSession();
    
    return (
        user ? (<div>
                    <a href="/api/auth/logout" className={linkStyles.outline_link}>Logout</a>
                </div>)
                :
                (<div>
                    <a href="/api/auth/login" className={linkStyles.outline_link}>Login</a>
                </div>)
    );
}

export default Nav;
