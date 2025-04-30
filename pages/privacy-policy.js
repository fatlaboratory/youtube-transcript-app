import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - YouTube Transcript Extractor</title>
        <meta name="description" content="Privacy Policy for YouTube Transcript Extractor" />
      </Head>

      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>Privacy Policy</h1>
          
          <div className={styles.chatBubble}>
            <h2>Information We Collect</h2>
            <p>
              When you use YouTube Transcript Extractor, we collect:
            </p>
            <ul>
              <li>YouTube video URLs that you submit for transcript extraction</li>
              <li>Your language preferences</li>
              <li>Basic usage statistics to improve our service</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <h2>How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul>
              <li>Provide transcript extraction services</li>
              <li>Improve our tool's functionality</li>
              <li>Analyze usage patterns to enhance user experience</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <h2>Data Storage</h2>
            <p>
              We do not permanently store any transcripts or personal information. All data is processed in real-time 
              and is not retained on our servers after the request is completed.
            </p>
          </div>

          <div className={styles.chatBubble}>
            <h2>Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul>
              <li>YouTube API for video information</li>
              <li>RapidAPI for transcript extraction</li>
              <li>Google Analytics for usage statistics</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of analytics tracking</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Privacy Policy, please contact us through our 
              <Link href="/contact" className={styles.link}> contact page</Link>.
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