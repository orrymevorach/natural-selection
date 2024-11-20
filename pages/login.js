import Meta from '@/components/shared/head/head';
import ParticlesContainer from '@/components/shared/particles/particles';
import Login from 'components/login/login';
import { UserProvider } from 'context/user-context/user-context';

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Meta />
      <ParticlesContainer />
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}
