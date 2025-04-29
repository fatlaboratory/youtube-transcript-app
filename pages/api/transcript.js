// pages/api/transcript.js
import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  const { videoId } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: "videoId parametresi eksik." });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    if (!Array.isArray(transcript)) {
      return res
        .status(500)
        .json({ error: "Beklenen formatta transcript alınamadı." });
    }
    return res.status(200).json(transcript);
  } catch (err) {
    console.error("Transcript error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
