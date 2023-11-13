import styles from './league.module.scss';
import Loader from 'components/shared/loader/loader';
import { useState } from 'react';
import RoundButtons from '@/components/league/round-buttons/round-buttons';
import useGetLeagueRankings from '@/components/league/useGetLeagueRankings';
import LeagueRankingsTable from '@/components/league/league-rankings-table/league-rankings-table';
import LeaguePageLayout from './league-page-layout/league-page-layout';
import SettingsButton from './settings-button/settings-button';
import CreateBracketPrompt from './create-bracket-prompt/create-bracket-prompt';

export const ROUNDS = [
  {
    displayName: 'Overall',
    name: 'Overall',
  },
  {
    displayName: 'NST Duels',
    name: 'Duels',
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: 'Revelstoke',
  },
  {
    displayName: 'Selkirk Tangiers',
    name: 'Selkirk',
  },
];

export default function League() {
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const { bracketsSortedByRankings } = useGetLeagueRankings();
  const hasBracketData =
    !!bracketsSortedByRankings && bracketsSortedByRankings.length > 0;

  return (
    <LeaguePageLayout title="League Rankings:">
      <SettingsButton />
      <CreateBracketPrompt brackets={bracketsSortedByRankings || []} />

      {isLoading && <Loader classNames={styles.loader} />}
      {!isLoading && hasBracketData && (
        <>
          <RoundButtons
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            setIsLoading={setIsLoading}
            rounds={ROUNDS}
          />
          <LeagueRankingsTable
            leagueData={bracketsSortedByRankings}
            currentRound={currentRound.name}
          />
        </>
      )}
    </LeaguePageLayout>
  );
}
