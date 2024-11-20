import {
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
} from '@/graphql/contentful/queries';
import { client } from '@/graphql/contentful/apollo-config';
import { getEntryByField } from './contentful-utils';
import { CONTENT_MODELS } from '@/utils/constants';

export const getFeatureFlag = async ({ name }) => {
  const { data } = await client.query({
    query: GET_FEATURE_FLAG,
    variables: {
      name,
    },
    fetchPolicy: 'no-cache',
  });
  return data.featureFlagCollection.items[0].value;
};

const getIsPagePublished = async ({ url }) => {
  const { data } = await client.query({
    query: GET_IS_PAGE_PUBLISHED,
    variables: {
      url,
    },
    fetchPolicy: 'no-cache',
  });
  const isPagePublished =
    data?.pageCollection?.items && data?.pageCollection?.items.length > 0;

  const isPasswordProtected =
    isPagePublished && data?.pageCollection?.items[0].passwordProtection;
  return { isPagePublished, isPasswordProtected };
};

export const getPageLoadData = async ({ url }) => {
  const { isPagePublished, isPasswordProtected } = await getIsPagePublished({
    url,
  });

  return {
    isPagePublished,
    isPasswordProtected,
  };
};

export async function getMedia() {
  const media = await getEntryByField({
    contentTypeId: CONTENT_MODELS.LIST_MEDIA,
    fieldName: 'title',
    fieldValue: 'HOME_PAGE',
  });
  const items = media.media.map(item => {
    return {
      createdAt: item.sys.createdAt,
      ...item.fields,
    };
  });
  return {
    ...media,
    items,
  };
}
