import HomePageLayout from '@/components/HomePage/Layout/Layout';
import Media from '@/components/HomePage/Media/Media';
import Nav from '@/components/shared/Nav/Nav';
import Footer from '@/components/shared/Footer/Footer';
import Meta from '@/components/shared/Head/Head';
import { getMedia } from '@/lib/contentful';
import { UserProvider } from 'context/user-context/user-context';
import BrandBanner, {
  getBrandLogos,
} from '@/components/shared/BrandBanner/BrandBanner';
import useWindowSize from '@/hooks/useWindowSize';
import { getEntryByField } from '@/lib/contentful-utils';

export default function HomePage({ media = [], brandLogos }) {
  const { isDesktop } = useWindowSize();
  return (
    <div>
      <Meta />
      <UserProvider>
        <HomePageLayout>
          <Nav isFixed isDark>
            {isDesktop && <BrandBanner isNav brandLogos={brandLogos} />}
          </Nav>
          <Media media={media} />
        </HomePageLayout>
        <Footer hideMarginTop />
      </UserProvider>
    </div>
  );
}

export async function getStaticProps() {
  const media = await getMedia();
  const brandLogos = await getBrandLogos({ fieldValue: 'BRAND_LOGOS' });
  return {
    props: { media, brandLogos },
  };
}
