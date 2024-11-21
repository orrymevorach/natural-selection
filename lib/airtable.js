import { client } from 'graphql/apollo-config';
import {
  UPDATE_USER_BRACKET,
  GET_SNOWBOARDERS,
  CREATE_BRACKET,
  CREATE_LEAGUE,
  CREATE_USER,
  GET_LEAGUE_BRACKETS,
  JOIN_LEAGUE,
  GET_BRACKET,
  GET_WINNERS,
  GET_USER_TEAM,
  GET_LEAGUE_MEMBERS,
  GET_LEAGUE_CONFIG,
  EDIT_LEAGUE_NAME,
  GET_LEAGUE_IDS,
  GET_CURRENT_USER_BRACKETS,
  GET_ALL_BRACKETS,
  GET_BRACKET_NAME,
  EDIT_BRACKET_NAME,
  GET_ALL_MEMBERS_WITH_LEAGUE_DATA,
  GET_USER_WITH_PICKS,
} from 'graphql/queries';
import { getRecord, getRecordById } from './airtable-utils';
import Cookies from 'cookies';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
      fetchPolicy: 'no-cache',
      fetchPolicy: 'no-cache',
    });

    const snowboarders = data.snowboarders;
    return { snowboarders, isLoading: loading };
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ uid }) => {
  try {
    const { record: user } = await getRecord({
      tableId: 'Members',
      field: 'UID',
      fieldValue: uid,
      endpoint: '/get-user-by-uid',
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserWithLeagueData = async ({ uid }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_WITH_PICKS,
      fetchPolicy: 'no-cache',
      variables: {
        uid,
      },
    });
    return data.members[0];
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async ({ uid, name, email }) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        uid,
        name,
        email,
      },
    });
    return {
      userTeamData: data.insert_members[0],
    };
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({ name, memberRecordId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_LEAGUE,
      variables: {
        name,
        memberRecordId,
      },
    });
    return data.insert_leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const joinLeague = async ({ id, memberRecordIds }) => {
  try {
    const { data } = await client.mutate({
      mutation: JOIN_LEAGUE,
      variables: {
        id,
        memberRecordIds,
      },
    });
    return data.update_leagues[0];
  } catch (err) {
    console.error(err);
  }
};

export const editLeagueName = async ({ id, leagueName }) => {
  try {
    const { data } = await client.mutate({
      mutation: EDIT_LEAGUE_NAME,
      variables: {
        id,
        leagueName,
      },
    });
    return data.update_leagues[0];
  } catch (err) {
    console.error(err);
  }
};

export const editBracketName = async ({ id, bracketName }) => {
  try {
    const { data } = await client.mutate({
      mutation: EDIT_BRACKET_NAME,
      variables: {
        id,
        bracketName,
      },
    });
    return data.update_userBrackets[0];
  } catch (err) {
    console.error(err);
  }
};

export const getLeagueBrackets = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_BRACKETS,
      fetchPolicy: 'no-cache',
      variables: {
        id,
      },
    });
    return data.leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueConfig = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_CONFIG,
      fetchPolicy: 'no-cache',
      variables: {
        id,
      },
    });
    return data.leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueMembers = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_MEMBERS,
      fetchPolicy: 'no-cache',
      variables: {
        id,
      },
    });
    return data.leagues[0].members;
  } catch (error) {
    console.log(error);
  }
};

export const createBracket = async ({ name, memberId, leagueId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_BRACKET,
      variables: {
        name,
        memberId,
        leagueId,
      },
    });
    return data.insert_userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const getBracket = async ({ recId }) => {
  try {
    const { data } = await client.query({
      query: GET_BRACKET,
      fetchPolicy: 'no-cache',
      variables: {
        recId,
      },
    });
    return data.userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateUserBracket = async ({ rounds, id }) => {
  try {
    await client.mutate({
      mutation: UPDATE_USER_BRACKET,
      variables: {
        id,
        D_R1_M1: rounds['D_R1_M1'],
        D_R1_M2: rounds['D_R1_M2'],
        D_R1_M3: rounds['D_R1_M3'],
        D_R1_M4: rounds['D_R1_M4'],
        D_R1_M5: rounds['D_R1_M5'],
        D_R1_M6: rounds['D_R1_M6'],
        D_R1_M7: rounds['D_R1_M7'],
        D_R1_M8: rounds['D_R1_M8'],
        DW_R1_M1: rounds['DW_R1_M1'],
        DW_R1_M2: rounds['DW_R1_M2'],
        DW_R1_M3: rounds['DW_R1_M3'],
        DW_R1_M4: rounds['DW_R1_M4'],
        R_R1_M1: rounds['R_R1_M1'],
        R_R1_M2: rounds['R_R1_M2'],
        R_R1_M3: rounds['R_R1_M3'],
        R_R1_M4: rounds['R_R1_M4'],
        R_R1_M5: rounds['R_R1_M5'],
        R_R1_M6: rounds['R_R1_M6'],
        R_R1_M7: rounds['R_R1_M7'],
        R_R1_M8: rounds['R_R1_M8'],
        R_R3_M1: rounds['R_R3_M1'],
        RW_R1_M1: rounds['RW_R1_M1'],
        RW_R1_M2: rounds['RW_R1_M2'],
        RW_R1_M3: rounds['RW_R1_M3'],
        RW_R1_M4: rounds['RW_R1_M4'],
        S_R1_M1: rounds['S_R1_M1'],
        S_R1_M2: rounds['S_R1_M2'],
        S_R1_M3: rounds['S_R1_M3'],
        S_R1_M4: rounds['S_R1_M4'],
        S_R2_M1: rounds['S_R2_M1'],
        S_R2_M2: rounds['S_R2_M2'],
        S_R3_M1: rounds['S_R3_M1'],
        SW_R1_M1: rounds['SW_R1_M1'],
        SW_R1_M2: rounds['SW_R1_M2'],
        SW_R2_M1: rounds['SW_R2_M1'],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWinners = async () => {
  try {
    const { data } = await client.query({
      query: GET_WINNERS,
      fetchPolicy: 'no-cache',
      variables: {
        name: 'Master Winners Bracket',
      },
    });
    return data.userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueIds = async () => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_IDS,
      fetchPolicy: 'no-cache',
    });
    return data.leagues;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserBrackets = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_CURRENT_USER_BRACKETS,
      fetchPolicy: 'no-cache',
      variables: {
        id,
      },
    });
    return data.members[0].brackets;
  } catch (error) {
    console.log(error);
  }
};

export const getInitialMatchups = async () => {
  const res = await fetch('/api/airtable/get-initial-matchups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
  return res;
};

export const addUserSelectionsToRounds = async ({ matchups, bracket }) => {
  const res = await fetch('/api/airtable/add-user-selections-to-rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, bracket }),
  }).then(res => res.json());
  return res.matchups;
};

export const applyLiveResults = async ({ matchups, winners }) => {
  const res = await fetch('/api/airtable/apply-live-results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, winners }),
  }).then(res => res.json());
  return res.matchups;
};

export const getUserLeagueData = async ({ uid }) => {
  const res = await fetch('/api/airtable/get-user-league-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  }).then(res => res.json());
  return res.userLeagues;
};

export const getAllBrackets = async () => {
  const { data } = await client.query({
    query: GET_ALL_BRACKETS,
    fetchPolicy: 'no-cache',
  });
  return data.userBrackets;
};

export const getBracketName = async ({ id }) => {
  const { data } = await client.query({
    query: GET_BRACKET_NAME,
    fetchPolicy: 'no-cache',
    variables: {
      id,
    },
  });
  return data.userBrackets[0];
};

export const getAllMembersWithLeagueData = async () => {
  const { data } = await client.query({
    query: GET_ALL_MEMBERS_WITH_LEAGUE_DATA,
    fetchPolicy: 'no-cache',
  });
  return data.members;
};

export async function getPageLoadData({ req, res }) {
  const cookies = new Cookies(req, res);
  const uid = cookies.get('uid');
  if (!uid)
    return {
      user: null,
    };
  const user = await getUser({ uid });
  return {
    user,
  };
}
