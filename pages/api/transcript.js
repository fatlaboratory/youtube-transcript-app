// pages/api/transcript.js
import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  const { videoId, lang } = req.query;

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!videoId) {
    return res.status(400).json({ error: "Please enter a valid YouTube URL." });
  }

  try {
    // Video ID formatını kontrol et
    if (!/^[\w-]{11}$/.test(videoId)) {
      return res.status(400).json({ error: "Invalid video ID format." });
    }

    // Transcript çek
    let transcript;
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: lang || 'en',
        country: 'US'
      });
    } catch (transcriptError) {
      console.error("Transcript fetch error:", transcriptError);

      const errorMessage = transcriptError.message;

      // Eğer transcript devre dışıysa
      if (errorMessage.includes("Transcript is disabled")) {
        return res.status(404).json({
          error: "This video has disabled transcripts. Please try another video."
        });
      }

      // Mevcut dilleri kullanıcıya bildirme
      const availableLanguagesMatch = errorMessage.match(/Available languages: ([^)]+)/);

      if (availableLanguagesMatch) {
        const availableLanguages = availableLanguagesMatch[1].split(', ').map(lang => {
          const languageNames = {
            'en': 'English',
            'tr': 'Turkish',
            'de': 'German',
            'fr': 'French',
            'es': 'Spanish',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'ar': 'Arabic',
            'hi': 'Hindi',
            'nl': 'Dutch',
            'pl': 'Polish',
            'sv': 'Swedish',
            'da': 'Danish',
            'fi': 'Finnish',
            'no': 'Norwegian',
            'cs': 'Czech',
            'zh-CN': 'Chinese (Simplified)',
            'zh-TW': 'Chinese (Traditional)',
            'pt-BR': 'Portuguese (Brazil)',
            'pt-PT': 'Portuguese (Portugal)',
            'el': 'Greek',
            'gu': 'Gujarati',
            'iw': 'Hebrew',
            'hu': 'Hungarian',
            'fa': 'Persian',
            'th': 'Thai',
            'vi': 'Vietnamese',
            'ckb': 'Kurdish'
          };
          return languageNames[lang] || lang;
        });

        return res.status(404).json({
          error: `No transcript available in the selected language. Available languages: ${availableLanguages.join(', ')}`
        });
      } else {
        return res.status(404).json({
          error: "No transcript available for this video in any language."
        });
      }
    }

    if (!Array.isArray(transcript)) {
      return res.status(500).json({ error: "Unexpected transcript format." });
    }

    // Transcript düzenleme
    const formattedTranscript = transcript.map(item => {
      const cleanText = item.text
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      const sentences = cleanText
        .replace(/([.!?])\s+/g, '$1\n')
        .split('\n')
        .map(sentence => {
          const trimmed = sentence.trim();
          if (trimmed.length === 0) return '';
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        })
        .filter(sentence => {
          return sentence.length > 0 && /[.!?]$/.test(sentence);
        });

      return sentences.map(sentence => ({
        text: sentence,
        duration: item.duration / sentences.length,
        offset: item.offset
      }));
    }).flat();

    return res.status(200).json(formattedTranscript);

  } catch (err) {
    console.error("Transcript error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
