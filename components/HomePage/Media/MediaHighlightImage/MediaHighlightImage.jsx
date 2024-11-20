import clsx from 'clsx';
import styles from './MediaHighlightImage.module.scss';
import Image from 'next/image';
import { getImage } from '@/lib/contentful-utils';

export default function MediaHighlightImage({ media, currentIndex }) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      {media.items.map((item, index) => {
        const image = getImage(item.image);
        if (index === currentIndex)
          return (
            <div className={styles.image}>
              <Image {...image} alt={image.alt} />
            </div>
          );
      })}
      {media.items.map((item, index) => {
        const image = getImage(item.image);
        if (index === currentIndex + 1)
          return (
            <div className={clsx(styles.image, styles.nextImage)}>
              <Image {...image} alt={image.alt} />
            </div>
          );
      })}
    </div>
  );
}
