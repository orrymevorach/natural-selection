export const mapRoundToPoints = {
  1: 10,
  2: 20,
  3: 40,
  4: 80,
};

export function addRankingsToObjects({ inputArray = [] }) {
  if (inputArray.length === 0) return [];

  const rankedObjects = inputArray.map(obj => {
    const ranking = (
      inputArray.filter(otherObj => {
        return otherObj.scoreData.points > obj.scoreData.points;
      }).length + 1
    ).toString();

    return { ...obj, ranking };
  });

  return rankedObjects;
}

export const getRanking = ({ leagueData, winnersData, bracketId }) => {
  const usersWithNumberOfCorrectPicks = leagueData.userBrackets.map(team => {
    const scoreData = countNumberOfCorrectPicks({
      bracketData: team,
      winners: winnersData,
    });
    return {
      scoreData,
      bracketId: team.id,
    };
  });
  const leagueWithRankings = addRankingsToObjects({
    inputArray: usersWithNumberOfCorrectPicks,
  });
  const currentUserBracket = leagueWithRankings.find(team => {
    return team.bracketId === bracketId;
  });
  return currentUserBracket?.ranking || '';
};

export function countNumberOfWinnersInEachRound({ winnersData }) {
  let overallWinners = 0;
  let duelsWinners = 0;
  let revelstokeWinners = 0;
  let selkirkWinners = 0;

  for (const key in winnersData) {
    // Only add winner if one exists
    if (
      key !== '__typename' &&
      winnersData[key] !== null &&
      key !== 'name' &&
      key !== 'id' &&
      key !== 'memberId'
    ) {
      if (key.includes('dR') || key.includes('dwR')) {
        duelsWinners++;
      } else if (key.includes('rR') || key.includes('rwR')) {
        revelstokeWinners++;
      } else if (key.includes('sR') || key.includes('swR')) {
        selkirkWinners++;
      }

      overallWinners++;
    }
  }

  return {
    Duels: duelsWinners,
    Revelstoke: revelstokeWinners,
    Selkirk: selkirkWinners,
    Overall: overallWinners,
  };
}

export const countNumberOfCorrectPicks = ({ bracketData, winners }) => {
  if (!bracketData || !winners) return;
  let count = 0;
  let points = 0;
  for (const key in bracketData) {
    if (
      bracketData.hasOwnProperty(key) &&
      winners.hasOwnProperty(key) &&
      bracketData[key] &&
      bracketData[key] !== undefined &&
      bracketData[key] === winners[key]
    ) {
      // Calculate points
      const round = parseFloat(key.split('R')[1]?.split('M')[0]);
      const pointsInThisRound = mapRoundToPoints[round] || 0;
      // Add to number of correct picks, We first check that this is an actual correct pick
      if (pointsInThisRound) count++;
      points = points + pointsInThisRound;
    }
  }
  return { numberOfCorrectPicks: count, points };
};

export function addNumberOfCorrectPicksToRoundData({
  bracketData,
  winnersData,
}) {
  const numberOfWinnersInRound = countNumberOfWinnersInEachRound({
    winnersData,
  });
  for (const key in bracketData) {
    const { numberOfCorrectPicks, points } = countNumberOfCorrectPicks({
      bracketData: bracketData[key],
      winners: winnersData,
    });

    bracketData[key].numberOfCorrectPicks = numberOfCorrectPicks;
    bracketData[key].numberOfWinnersInRound = numberOfWinnersInRound[key];
    bracketData[key].points = points;
  }
}

export function sortSelectionsIntoRounds(winnersData) {
  const duelsWinners = {};
  const revelstokeWinners = {};
  const overallWinners = {};
  const selkirkWinners = {};

  // Iterate through the each winner in the winners object and sort it into a round based on the key
  for (const key in winnersData) {
    if (key.startsWith('dR') || key.startsWith('dwR')) {
      duelsWinners[key] = winnersData[key];
    } else if (key.startsWith('rR') || key.startsWith('rwR')) {
      revelstokeWinners[key] = winnersData[key];
    } else if (key.startsWith('sR') || key.startsWith('swR')) {
      selkirkWinners[key] = winnersData[key];
    }
    overallWinners[key] = winnersData[key];
  }

  const resultObject = {
    Duels: duelsWinners,
    Revelstoke: revelstokeWinners,
    Selkirk: selkirkWinners,
    Overall: overallWinners,
  };

  return resultObject;
}

export const getTopTenBrackets = ({ brackets }) => {
  // Get the winners bracket
  const winnersBracket = brackets.find(
    ({ name }) => name === 'Master Winners Bracket'
  );

  // Add scoring data to all brackets
  // Filter out the winners bracket so that it doesn't show up in the top ten
  const bracketsWithScoreData = brackets
    .map(bracket => {
      const numberOfCorrectPicks = countNumberOfCorrectPicks({
        bracketData: bracket,
        winners: winnersBracket,
      });
      return {
        ...bracket,
        scoreData: {
          ...numberOfCorrectPicks,
        },
      };
    })
    .filter(({ name }) => name !== 'Master Winners Bracket');

  // Adding the rankings to all the brackets
  const bracketsWithRanking = addRankingsToObjects({
    inputArray: bracketsWithScoreData,
  });

  // Sort the brackets byt their ranking
  const bracketsSortedByRanking = bracketsWithRanking.sort((a, b) => {
    if (parseFloat(a.ranking) > parseFloat(b.ranking)) return 1;
    return -1;
  });

  // Return the number of winners as part of the data
  const numberOfWinners = countNumberOfWinnersInEachRound({
    winnersData: winnersBracket,
  });

  return { bracketsSortedByRanking, numberOfWinners };
};
