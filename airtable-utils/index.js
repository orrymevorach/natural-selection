import { client } from 'graphql/apollo-config';
import {
  UPDATE_USER_BRACKET,
  GET_SNOWBOARDERS,
  ADD_LEAGUE_ID,
  CREATE_BRACKET,
  CREATE_LEAGUE,
  CREATE_USER,
  GET_LEAGUE,
  GET_USER,
  JOIN_LEAGUE,
  GET_BRACKET,
} from 'graphql/queries';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
    });
    return { snowboarders: data.snowboarders, isLoading: loading };
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ uid }) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        uid,
      },
    });
    return { userTeamData: data.members[0] };
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ uid, name }) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        uid,
        name,
      },
    });
    return {
      userTeamData: data.insert_members[0],
    };
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({
  name,
  adminUid,
  adminAirtableRecordId,
}) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_LEAGUE,
      variables: {
        name,
        adminUid,
        adminAirtableRecordId,
      },
    });
    const { id, members } = data.insert_leagues[0];
    return {
      leagueRecordId: id,
      userTeamData: members[0],
    };
  } catch (error) {
    console.log(error);
  }
};

export const addLeagueId = async ({ leagueId, id }) => {
  try {
    await client.mutate({
      mutation: ADD_LEAGUE_ID,
      variables: {
        leagueId,
        id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const joinLeague = async ({ id, memberRecordId }) => {
  try {
    const { data } = await client.mutate({
      mutation: JOIN_LEAGUE,
      variables: {
        id,
        memberRecordId,
      },
    });
    const { members } = data.update_leagues[0];
    return {
      userTeamData: members[0],
    };
  } catch (err) {
    console.error(err);
  }
};

export const getLeague = async ({ name }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE,
      variables: {
        name,
      },
    });
    return { league: data.leagues[0] };
  } catch (error) {
    console.log(error);
  }
};

export const createBracket = async ({ name, memberId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_BRACKET,
      variables: {
        name,
        memberId,
      },
      awaitRefetchQueries: true,
    });
    const { memberId: allMemberIds } = data.insert_userBrackets[0];
    const userTeamData = allMemberIds.find(member => member.id === memberId);
    return {
      userTeamData,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getBracket = async ({ memberId }) => {
  try {
    const { data } = await client.query({
      query: GET_BRACKET,
      variables: {
        memberId,
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
        R1_M1: rounds['R1_M1'],
        R1_M2: rounds['R1_M2'],
        R1_M3: rounds['R1_M3'],
        R1_M4: rounds['R1_M4'],
        R1_M5: rounds['R1_M5'],
        R1_M6: rounds['R1_M6'],
        R1_M7: rounds['R1_M7'],
        R1_M8: rounds['R1_M8'],
        R2_M1: rounds['R2_M1'],
        R2_M2: rounds['R2_M2'],
        R2_M3: rounds['R2_M3'],
        R2_M4: rounds['R2_M4'],
        R3_M1: rounds['R3_M1'],
        R3_M2: rounds['R3_M2'],
        R4_M1: rounds['R4_M1'],
        R5_M1: rounds['R5_M1'],
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateUserBracket = async ({
//   roundOneWinners,
//   quarterFinalWinners,
//   semiFinalWinners,
//   winner,
//   id,
// }) => {
//   try {
//     await client.mutate({
//       mutation: UPDATE_USER_BRACKET,
//       variables: {
//         roundOneWinners,
//         quarterFinalWinners,
//         semiFinalWinners,
//         winner,
//         id,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
