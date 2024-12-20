import Meta from '@/components/shared/Head/Head';
import { getPageLoadData } from '@/lib/airtable';
import Login from '@/components/LoginPage/Login';
import { UserProvider } from 'context/user-context/user-context';

export default function LoginPage() {
  return (
    <>
      <Meta />
      <UserProvider>
        <Login />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
