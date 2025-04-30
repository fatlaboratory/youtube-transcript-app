import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>About - YouTube Transcript Extractor</title>
        <meta name="description" content="Learn more about YouTube Transcript Extractor" />
      </Head>

      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>About YouTube Transcript Extractor</h1>
          
          <div className={styles.chatBubble}>
            <h2>What is YouTube Transcript Extractor?</h2>
            <p>
              YouTube Transcript Extractor is a free online tool that helps you extract transcripts from YouTube videos. 
              Our tool makes it easy to get the text content of any YouTube video in multiple languages.
            </p>
          </div>

          <div className={styles.chatBubble}>
            <h2>Features</h2>
            <ul>
              <li>Extract transcripts from any public YouTube video</li>
              <li>Support for multiple languages</li>
              <li>Clean and readable transcript format</li>
              <li>Easy copy functionality</li>
              <li>Completely free to use</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <h2>How to Use</h2>
            <ol>
              <li>Paste the YouTube video URL</li>
              <li>Select your preferred language</li>
              <li>Click "Get Transcript"</li>
              <li>Copy or download the transcript</li>
            </ol>
          </div>

          <div className={styles.chatBubble}>
            <h2>Why Use Our Tool?</h2>
            <p>
              Our tool is designed to be simple, fast, and reliable. Whether you're a student, researcher, 
              content creator, or just someone who wants to read the transcript of a video, our tool makes 
              it easy to get the text content you need.
            </p>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className={styles.button}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 