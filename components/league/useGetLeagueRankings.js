import { getLeagueBrackets } from '@/lib/airtable';
import { useEffect, useState } from 'react';
import { useWinners } from '@/context/winners-context/winners-context';
import {
  addNumberOfCorrectPicksToRoundData,
  getRanking,
  sortSelectionsIntoRounds,
} from '@/components/dashboard/bracket-ranking-utils';

export default function useGetLeagueRankings({ slug }) {
  const [bracketsSortedByRankings, setBracketsSortedByRankings] =
    useState(null);
  const winnersData = useWinners();
  useEffect(() => {
    const handleGetBracketsSortedByRankings = async () => {
      const league = await getLeagueBrackets({ id: slug });
      const leagueWithRankingsAndNumberOfCorrectPicks = league.brackets.map(
        bracket => {
          const rank = getRanking({
            leagueData: league,
            winnersData,
            bracketName: bracket.name,
          });
          const selectionsSortedByRoundWithNumberOfWinnersPerRound =
            sortSelectionsIntoRounds(bracket);
          addNumberOfCorrectPicksToRoundData({
            bracketData: selectionsSortedByRoundWithNumberOfWinnersPerRound,
            winnersData,
          });
          return {
            ...bracket,
            rank,
            selectedWinners: selectionsSortedByRoundWithNumberOfWinnersPerRound,
          };
        }
      );
      setBracketsSortedByRankings(leagueWithRankingsAndNumberOfCorrectPicks);
    };
    if (winnersData) {
      handleGetBracketsSortedByRankings();
    }
  }, [slug, winnersData]);
  return { bracketsSortedByRankings };
}