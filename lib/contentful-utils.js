export async function getEntries({ contentTypeId }) {
  const { entries } = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_URL}/api/contentful/get-entries`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentTypeId }),
    }
  ).then(res => res.json());
  return entries;
}

export async function getEntry({ entryId }) {
  const { entry } = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_URL}/api/contentful/get-entry`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entryId }),
    }
  ).then(res => res.json());
  return entry;
}

export async function getEntryByField({
  contentTypeId,
  fieldName,
  fieldValue,
}) {
  const { entry } = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_URL}/api/contentful/get-entry-by-field`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentTypeId, fieldName, fieldValue }),
    }
  ).then(res => res.json());
  return entry;
}

export function getImage(image) {
  const size = image.fields.file.details.image;
  const src = `https:${image.fields.file.url}`;
  const alt = image.fields.title;
  return {
    src,
    alt,
    width: size.width,
    height: size.height,
  };
}
