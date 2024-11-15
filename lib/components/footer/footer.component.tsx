import styles from '@/lib/components/footer/footer.module.css';
import React from 'react';
import Languages from '../languages/languages.component';

const Footer = () => {

    return (
        <div className={styles.footer}>
            <Languages/>
        </div>
    );
};

export default Footer;
