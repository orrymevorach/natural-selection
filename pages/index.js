import Media from '@/components/HomePage/Media/Media';
import Meta from '@/components/shared/head/head';
import { getMedia } from '@/lib/contentful';
import { UserProvider } from 'context/user-context/user-context';

export default function HomePage({ media = [] }) {
  return (
    <div>
      <Meta />
      {/* <UserProvider></UserProvider> */}
      <Media media={media} />
    </div>
  );
}

export async function getStaticProps() {
  const media = await getMedia();
  return {
    props: { media },
  };
}
