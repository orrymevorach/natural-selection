import Link from 'next/link';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import styles from './MobileNav.module.scss';
import clsx from 'clsx';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/shared/Button/Button';
import { useState } from 'react';

export default function MobileNav({ handleSignOut }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <>
      <div className={styles.hamburger}>
        <HamburgerMenu
          hamburgerMenuColor="white"
          setIsOpen={setIsMobileNavOpen}
        />
      </div>

      {isMobileNavOpen && (
        <>
          <nav className={clsx(styles.mobileNav)}>
            <ul>
              <Link className={styles.link} href={ROUTES.DASHBOARD}>
                Back to dashboard
              </Link>

              <Button className={styles.link} handleClick={handleSignOut}>
                Sign Out
              </Button>
            </ul>
          </nav>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className={styles.overlay}
          ></button>
        </>
      )}
    </>
  );
}
