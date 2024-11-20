import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss';

export default function ProgressBar({ isActive }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (isActive) {
      setProgress(0); // Reset progress when activated
      const duration = 5000;
      const interval = 50; // Interval in milliseconds
      const step = (interval / duration) * 100; // Percentage to increase per interval

      timer = setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + step;
          if (nextProgress >= 100) {
            clearInterval(timer);
            return 0; // Ensure the progress is empty when done
          }
          return nextProgress;
        });
      }, interval);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className={styles.progressBar}>
      <div
        style={{ width: `${progress}%` }}
        className={`${styles.filler} ${isActive ? styles.active : ''}`}
      ></div>
    </div>
  );
}
