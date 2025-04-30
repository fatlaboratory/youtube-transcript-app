import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
      // Örnek olarak basit bir doğrulama yapıyoruz
      if (!name || !email || !message) {
        throw new Error('Please fill in all fields');
      }

      // Form gönderimi simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact - YouTube Transcript Extractor</title>
        <meta name="description" content="Contact us for any questions or feedback" />
      </Head>

      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>Contact Us</h1>

          <p className={styles.description}>
            Have questions or feedback? We'd love to hear from you!
          </p>

          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                  className={styles.textarea}
                  rows="5"
                />
              </div>

              <button 
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}

              {success && (
                <div className={styles.success}>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
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