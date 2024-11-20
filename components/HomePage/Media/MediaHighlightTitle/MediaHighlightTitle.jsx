import styles from './MediaHighlightTitle.module.scss';
import clsx from 'clsx';

export default function MediaHighlightTitle({ media, currentIndex }) {
  return (
    <>
      {media.items.map((item, index) => {
        if (index === currentIndex)
          return (
            <div key={`media-title-${item.title}`} className={styles.title}>
              <p>{item.title}</p>
            </div>
          );
      })}
      {media.items.map((item, index) => {
        if (index === currentIndex + 1)
          return (
            <div
              key={`media-next-title-${item.title}`}
              className={clsx(styles.title, styles.nextTitle)}
            >
              <p>{item.title}</p>
            </div>
          );
      })}
    </>
  );
}