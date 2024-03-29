import styles from './league-page-layout.module.scss';
import Loader from 'components/shared/loader/loader';
import Layout from '@/components/shared/layout/layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import SettingsButton from '../settings-button/settings-button';
import useUser from '@/context/user-context/useUser';
import Button from '@/components/shared/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InviteMemberTakeover from '@/components/league-settings/invite-member-takeover/invite-member-takeover';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LeaguePageLayout({
  children,
  title,
  hideBackButton = false,
  backButtonHref,
  titleName,
}) {
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);
  const { name: leagueName, admin, id } = useLeagueConfig();
  const user = useUser();
  const router = useRouter();
  const pathname = router.pathname;

  const isLeagueSettingsPage = pathname.includes('/league-settings');

  const leagueAdmin = admin?.length > 0 && admin[0].id;
  const isAdmin = leagueAdmin && user.id === leagueAdmin;
  const nameToShow = titleName || leagueName;
  const backButtonText = hideBackButton ? null : `Back to ${nameToShow}`;

  return (
    <Layout
      backButtonHref={backButtonHref || `/league/${id}?leagueId=${id}`}
      backButtonText={backButtonText}
    >
      {showInviteMemberTakeover && (
        <InviteMemberTakeover
          setShowTakeover={setShowInviteMemberTakeover}
          leagueId={id}
        />
      )}
      {nameToShow ? (
        <div className={styles.container}>
          <div>
            <p className={styles.heading}>{title}</p>
            <p className={styles.leagueName}>{nameToShow}</p>
          </div>
          {isAdmin && !isLeagueSettingsPage && (
            <div className={styles.buttonContainer}>
              <Button
                isYellow
                classNames={styles.inviteMemberButton}
                handleClick={() => setShowInviteMemberTakeover(true)}
              >
                <p className={styles.addMemberText}>Invite Member</p>{' '}
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </Button>
              <SettingsButton />
            </div>
          )}
        </div>
      ) : (
        <Loader classNames={styles.loader} />
      )}
      {children}
    </Layout>
  );
}
