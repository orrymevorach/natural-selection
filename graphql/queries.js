import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      name
      id
      matchupId
      country
    }
  }
`;

export const GET_USER_TEAM = gql`
  query GetUserTeam($name: String) {
    userTeams(name: $name) {
      name
      quarterFinalMatchups {
        name
        matchupId
        id
      }
      semiFinalMatchups {
        name
        matchupId
        id
      }
      finalsMatchup {
        name
        matchupId
        id
      }
      winner {
        name
        matchupId
        id
      }
    }
  }
`;

export const UPDATE_USER_TEAM = gql`
  mutation UPDATE_USER_TEAM(
    $id: String
    $roundOneWinners: [String]
    $quarterFinalWinners: [String]
    $semiFinalWinners: [String]
    $winner: [String]
  ) {
    update_userBrackets(
      id: $id
      roundOneWinners: $roundOneWinners
      quarterFinalWinners: $quarterFinalWinners
      semiFinalWinners: $semiFinalWinners
      winner: $winner
    ) {
      id
    }
  }
`;
