import React from 'react';
import { useTranslations } from 'next-intl';
import styles from '@/app/[locale]/products/add-product/success/success.module.css';
import ButtonLink from '@/components/button-link/button-link.component';

const AddProductSuccess = () => {

    const t = useTranslations('AddProductSuccess');

    return (
        <div className={styles.add__product__success}>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="font-bold text-lg">{t('title')}</h3>
                    <p className="py-4">{t('description')}</p>
                    <div className="card-actions justify-center">
                        <ButtonLink href="/products" name={t('linkButton')} type='outline'/>
                        <ButtonLink href="/products/add-product" name={t('closeButton')}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductSuccess;
