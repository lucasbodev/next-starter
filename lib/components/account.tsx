import linkStyles from '@/lib/styles/components/outline-link.module.scss';
import { getSession } from '@auth0/nextjs-auth0';
import React, { type ReactElement } from 'react';

const Nav = async (): Promise<ReactElement> => {
  const user = await getSession();

  return (
    (user != null)
      ? (<div>
                <a href="/api/auth/logout" className={linkStyles.outline_link}>Logout</a>
            </div>)
      : (<div>
                <a href="/api/auth/login" className={linkStyles.outline_link}>Login</a>
            </div>)
  );
};

export default Nav;
