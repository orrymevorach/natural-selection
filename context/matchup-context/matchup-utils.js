import { isEven } from '@/utils/utils';

export function addWinnerToMatchups({ player, matchups, matchupId }) {
  const round = parseFloat(matchupId.split('_M')[0].replace('R', ''));
  const position = parseFloat(matchupId.split('_M')[1]);
  // Determining the next round number
  const nextRound = round + 1;
  // Determining the next matchup number. If a position is even, dividing it by 2 gives you the next matchup number. If it is odd, first add 1, then divide it by 2.
  const nextMatchup = isEven(position) ? position / 2 : (position + 1) / 2;
  // Create the matchupId for this players next round.
  const nextMatchupId = `R${nextRound}_M${nextMatchup}`;
  // If a matchup position is an odd number, they will be the top position in the next matchup. If it is even, they will be the bottom position in the next matchup
  const isPositionEven = isEven(position);
  const updatedMatchups = matchups.map(matchup => {
    // Add the player to their next matchup bracket
    if (matchup.matchupId === nextMatchupId) {
      if (isPositionEven) {
        matchup.team2 = player;
      } else {
        matchup.team1 = player;
      }
    }
    // Set the winner for the current matchup
    if (matchup.matchupId === matchupId) {
      matchup.winner = player;
    }
    return matchup;
  });
  return updatedMatchups;
}
