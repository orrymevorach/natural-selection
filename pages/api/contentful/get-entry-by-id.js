const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { entryId } = req.body;
    // Fetch the entry by ID
    let entry;
    try {
      entry = await client.getEntry(entryId);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
    res.status(200).json({ entry });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
