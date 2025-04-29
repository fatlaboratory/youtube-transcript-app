// pages/api/transcript.js
import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  const { videoId, lang } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: "Please enter a valid YouTube URL." });
  }

  try {
    // Önce video ID'sinin geçerli olduğunu kontrol et
    if (!/^[\w-]{11}$/.test(videoId)) {
      return res.status(400).json({ error: "Invalid video ID format." });
    }

    // Transcript'i çekmeyi dene
    let transcript;
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: lang || 'en',
        country: 'US'
      });
    } catch (transcriptError) {
      console.error("Transcript fetch error:", transcriptError);
      
      // Hata mesajından mevcut dilleri çıkar
      const errorMessage = transcriptError.message;
      const availableLanguagesMatch = errorMessage.match(/Available languages: ([^)]+)/);
      
      if (availableLanguagesMatch) {
        const availableLanguages = availableLanguagesMatch[1].split(', ').map(lang => {
          // Dil kodlarını tam isimlerine çevir
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

    // Metni düzenle ve her cümleyi ayrı bir satıra al
    const formattedTranscript = transcript.map(item => {
      // HTML karakterlerini düzelt
      const cleanText = item.text
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      // Cümleleri ayır
      const sentences = cleanText
        .replace(/([.!?])\s+/g, '$1\n') // Noktalama işaretlerinden sonra yeni satır
        .split('\n')
        .map(sentence => {
          // Cümleyi temizle ve büyük harfle başlat
          const trimmed = sentence.trim();
          if (trimmed.length === 0) return '';
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        })
        .filter(sentence => {
          // Sadece noktalama işareti ile biten cümleleri al
          return sentence.length > 0 && /[.!?]$/.test(sentence);
        });

      // Her cümle için yeni bir transcript öğesi oluştur
      return sentences.map(sentence => ({
        text: sentence,
        duration: item.duration / sentences.length, // Süreyi cümle sayısına böl
        offset: item.offset
      }));
    }).flat(); // Düzleştir

    return res.status(200).json(formattedTranscript);
  } catch (err) {
    console.error("Transcript error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
