import { isEven } from '@/utils/utils';

function addWinnerToMatchups({ player, matchups, matchupId, winner }) {
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
        matchup.actualWinner = {
          ...matchup?.actualWinner,
          team2: winner.name,
        };
      } else {
        matchup.team1 = player;
        matchup.actualWinner = {
          ...matchup?.actualWinner,
          team1: winner.name,
        };
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

export const addUpdatedBracketSelectionsToMatchups = (
  updatedBracketSelections,
  contests
) => {
  const contestsCopy = Array.from(contests);

  // Loop through the updated bracket selections for each contest, and add the winner to the matchups
  for (let i = 0; i < updatedBracketSelections.length; i++) {
    const contest = updatedBracketSelections[i];
    const contestAsArray = Object.entries(contest);
    for (let [matchupId, selectedWinner] of contestAsArray) {
      // Convert the matchups into an object, where the key is the matchupId
      const matchupsAsMap = contestsCopy[i].matchups.reduce((acc, curr) => {
        acc[curr.matchupId] = curr;
        return acc;
      }, {});
      // Get the current matchup data, so that we can get the actual winner
      const currentMatchup = matchupsAsMap[matchupId];
      const winner = currentMatchup?.actualWinner;
      if (matchupId.includes('_')) {
        const updatedMatchups = addWinnerToMatchups({
          player: selectedWinner,
          matchups: contestsCopy[i].matchups,
          matchupId,
          winner,
        });
        contestsCopy[i].matchups = updatedMatchups;
      }
    }
  }
  return contestsCopy;
};
