const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { contentTypeId, fieldName, fieldValue } = req.body;
    try {
      const entry = await client.getEntries({
        content_type: contentTypeId,
        [`fields[${fieldName}]`]: fieldValue,
      });

      res.status(200).json({ entry: entry.items[0].fields });
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(400).json({ error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
