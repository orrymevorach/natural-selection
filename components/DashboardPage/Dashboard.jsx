import { useState } from 'react';
import NewUserDashboard from './NewUserDashboard/NewUserDashboard';
import MainDashboard from './MainDashboard/MainDashboard';
import CreateLeagueTakeover from './CreateLeagueTakeover/CreateLeagueTakeover';
import JoinLeagueTakeover from './JoinLeagueTakeover/JoinLeagueTakeover';
import DashboardBar from './DashboardBar/DashboardBar';
import Layout from '@/components/shared/Layout/Layout';
import Loader from '@/components/shared/Loader/Loader';
import SettingsButton from './SettingsButton/SettingsButton';
import { ROUTES } from '@/utils/constants';
import styles from './Dashboard.module.scss';
import OpeningSoon from './OpeningSoon/OpeningSoon';
import { useUser } from '@/context/user-context/user-context';
import Wrapper from '../shared/Wrapper/Wrapper';

export default function Dashboard({
  leagues,
  sports,
  enableDashboardFeatureFlag,
}) {
  const user = useUser();
  const leagueData = user?.leagues;
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);
  const hasLeagues = leagueData && leagueData.length > 0;
  if (!user) return <Loader isFullPage />;
  return (
    <Layout removeWrapper>
      <DashboardBar>
        {/* <SettingsButton
          href={{
            pathname: `${ROUTES.ACCOUNT_SETTINGS}`,
          }}
          classNames={styles.settingsButton}
          text="Account"
        /> */}
      </DashboardBar>
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover
          setShowTakeover={setShowCreateLeagueTakeover}
          sports={sports}
        />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      <Wrapper>
        {!enableDashboardFeatureFlag ? (
          <OpeningSoon />
        ) : hasLeagues ? (
          <MainDashboard
            leagueData={leagues}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
            sports={sports}
          />
        ) : (
          <NewUserDashboard
            showCreateLeagueTakeover={showCreateLeagueTakeover}
            setShowCreateLeagueTakeover={setShowCreateLeagueTakeover}
            showJoinLeagueTakeover={showJoinLeagueTakeover}
            setShowJoinLeagueTakeover={setShowJoinLeagueTakeover}
          />
        )}
      </Wrapper>
    </Layout>
  );
}
