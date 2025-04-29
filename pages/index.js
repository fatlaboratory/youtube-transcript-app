// pages/index.js
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";

// API URL'ini tanımla
const API_URL = "/api/transcript";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");
  const mainRef = useRef();

  const languages = [
    { code: "en", name: "English" },
    { code: "tr", name: "Turkish" },
    { code: "de", name: "German" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
    { code: "sv", name: "Swedish" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "no", name: "Norwegian" },
    { code: "cs", name: "Czech" }
  ];

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [transcript]);

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const handleFetchTranscript = async () => {
    setError("");
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setTranscript([]);
      return setError("Please enter a valid YouTube URL.");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?videoId=${videoId}&lang=${selectedLang}`);
      const data = await res.json();
      if (data.error) {
        if (data.error.includes("Available languages:")) {
          const [mainError, availableLangs] = data.error.split("Available languages:");
          setError(
            <>
              {mainError}
              <br />
              <span className={styles.availableLangs}>
                Available languages: {availableLangs}
              </span>
            </>
          );
        } else {
          setError(data.error);
        }
        setTranscript([]);
      } else if (!Array.isArray(data)) {
        setError("Unexpected response format.");
        setTranscript([]);
      } else {
        setTranscript(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch transcript. Please try again later.");
      setTranscript([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    const allText = transcript.map((t) => t.text).join("\n");
    navigator.clipboard
      .writeText(allText)
      .then(() => {
        setTranscript((prev) => [
          ...prev,
          { text: "Copied to clipboard!", isCopyBubble: true },
        ]);
      })
      .catch((err) => alert("Copy failed: " + err));
  };

  return (
    <>
      <Head>
        <title>YouTube Transcript Extractor</title>
        <meta name="description" content="Extract transcripts from YouTube videos in multiple languages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-ADSENSE-CLIENT-ID"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <select
            className={styles.select}
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className={styles.button}
            onClick={handleFetchTranscript}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Transcript"}
          </button>
          <button
            className={styles.button}
            onClick={handleCopyAll}
            disabled={!transcript.length}
          >
            Copy All
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div ref={mainRef} className={styles.main}>
          {transcript.map((t, i) => (
            <div
              key={i}
              className={`${styles.chatBubble} ${
                t.isCopyBubble ? styles.copyBubble : ""
              }`}
            >
              {t.text}
            </div>
          ))}
        </div>

        {/* Ad Space */}
        <div className={styles.adSpace}>
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="YOUR-ADSENSE-CLIENT-ID"
            data-ad-slot="YOUR-AD-SLOT-ID"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>

        {/* About Me Section */}
        <div className={styles.aboutMe}>
          <h2>About This Tool</h2>
          <p>
            This tool helps you extract transcripts from YouTube videos in multiple languages.
            Simply paste a YouTube URL, select your preferred language, and get the transcript instantly.
          </p>
          <ul>
            <li>Support for multiple languages</li>
            <li>Clean and readable transcript format</li>
            <li>Easy copy functionality</li>
            <li>Free to use</li>
          </ul>
        </div>
      </div>
    </>
  );
}
