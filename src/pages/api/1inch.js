import axios from 'axios';

export default async function handler(req, res) {
  try {
    const tokenUri = decodeURIComponent(req.query.tokenUri);
    const response = await axios.get(tokenUri);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}