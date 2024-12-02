'use client'

import Image from 'next/image';
import styles from '@/components/image-preview/image-preview.module.css';
import { useRef } from 'react';

const ImagePreview = ({ src }: { src?: string }) => {

    const skeleton = useRef<HTMLDivElement>(null);

    const onLoad = () => {
        skeleton.current!.style.display = "none";
    }

    return (
        <div className={styles.image__preview}>
            {
                src &&
                <Image
                    src={src}
                    alt="Image preview"
                    height={"32"}
                    width={"32"}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: 'absolute',
                        objectFit: 'cover',
                    }}
                    onLoad={() => onLoad()}
                />
            }
            <div ref={skeleton} className="skeleton h-full w-full" style={{position: 'absolute'}}></div>
        </div>
    )
}

export default ImagePreview;