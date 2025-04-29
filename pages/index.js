// pages/index.js
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mainRef = useRef();

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
      const res = await fetch(`/api/transcript?videoId=${videoId}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setTranscript([]);
      } else if (!Array.isArray(data)) {
        setError("Unexpected response format.");
        setTranscript([]);
      } else {
        setTranscript(data);
      }
    } catch {
      setError("Failed to fetch transcript.");
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
    <div className={styles.container}>
      {/* 1. Arama çubuğu en üstte */}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
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

      {/* 2. Sohbet baloncukları burada */}
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
    </div>
  );
}
