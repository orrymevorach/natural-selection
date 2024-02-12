import styles from './dashboard.module.scss';
import UserBracketsTable from './user-brackets-table/user-brackets-table';
import { ROUNDS } from '../league/league';
import Layout from '../shared/layout/layout';
import Button from '../shared/button/button';
import { useState } from 'react';
import CreateLeagueTakeover from './create-league-takeover/create-league-takeover';
import JoinLeagueTakeover from './join-league-takeover/join-league-takeover';
import OverallRankingsTable from './overall-rankings-table/overall-rankings-table';

export default function Dashboard({ overallRankingsData }) {
  const [showCreateLeagueTakeover, setShowCreateLeagueTakeover] =
    useState(false);
  const [showJoinLeagueTakeover, setShowJoinLeagueTakeover] = useState(false);

  return (
    <Layout>
      {showCreateLeagueTakeover && (
        <CreateLeagueTakeover setShowTakeover={setShowCreateLeagueTakeover} />
      )}
      {showJoinLeagueTakeover && (
        <JoinLeagueTakeover setShowTakeover={setShowJoinLeagueTakeover} />
      )}
      <div className={styles.topContainer}>
        <div>
          <p className={styles.dashboardText}>Dashboard</p>
          <p className={styles.yourLeaguesText}>Your Leagues</p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            handleClick={() => setShowJoinLeagueTakeover(true)}
            classNames={styles.button}
          >
            Join League
          </Button>
          <Button
            handleClick={() => setShowCreateLeagueTakeover(true)}
            classNames={styles.button}
          >
            Create League
          </Button>
        </div>
      </div>
      <UserBracketsTable currentRound={ROUNDS[0].name} />
      <OverallRankingsTable overallRankingsData={overallRankingsData} />
    </Layout>
  );
}
