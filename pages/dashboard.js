import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getLeague, getSports } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getPageLoadData } from '@/lib/airtable';
import { getFeatureFlag } from '@/lib/contentful';

export default function Dashboard({
  user,
  leagues,
  sports,
  enableDashboardFeatureFlag,
}) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider user={user}>
        <DashboardPage
          leagues={leagues}
          sports={sports}
          enableDashboardFeatureFlag={enableDashboardFeatureFlag}
        />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const enableDashboardFeatureFlag = await getFeatureFlag({
    name: 'ENABLE_DASHBOARD',
  });
  const { user } = await getPageLoadData(context);
  const sports = await getSports();

  const leagueIds = user.leagues;
  if (!leagueIds || !enableDashboardFeatureFlag) {
    return {
      props: {
        leagues: [],
        sports,
        enableDashboardFeatureFlag,
      },
    };
  }
  const leagues = await Promise.all(
    leagueIds.map(async id => {
      const league = await getLeague({ id });
      const json = league?.json ? JSON.parse(league.json) : [];

      return {
        ...league,
        json,
      };
    })
  );

  return {
    props: {
      user,
      leagues,
      sports,
      enableDashboardFeatureFlag,
    },
  };
}
