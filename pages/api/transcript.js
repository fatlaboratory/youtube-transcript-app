import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!videoId) {
    return res.status(400).json({ error: "Please enter a valid YouTube video URL." });
  }

  try {
    const response = await fetch(`https://youtube-transcript3.p.rapidapi.com/api/transcript?videoId=${videoId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,  // .env.local içine yazdığın key
        'x-rapidapi-host': 'youtube-transcript3.p.rapidapi.com'
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return res.status(200).json(data.transcript);
    } else {
      return res.status(404).json({ error: data.error || "Transcript not available." });
    }
  } catch (err) {
    console.error("Transcript fetch error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
