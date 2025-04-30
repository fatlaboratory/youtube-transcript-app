import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
    <div className={styles.container}>
      <Head>
        <title>İletişim - YouTube Transcript App</title>
        <meta name="description" content="YouTube Transcript App ile iletişime geçin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>İletişim</h1>

        <div className={styles.content}>
          <section>
            <h2>Bizimle İletişime Geçin</h2>
            <p>
              Sorularınız, önerileriniz veya geri bildirimleriniz için aşağıdaki iletişim kanallarını 
              kullanabilirsiniz. Size en kısa sürede dönüş yapmaya çalışacağız.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h3>E-posta</h3>
                <p>
                  <a href="mailto:info@youtubetranscript.app">info@youtubetranscript.app</a>
                </p>
              </div>

              <div className={styles.contactItem}>
                <h3>GitHub</h3>
                <p>
                  <a href="https://github.com/yourusername/youtube-transcript-app" target="_blank" rel="noopener noreferrer">
                    github.com/yourusername/youtube-transcript-app
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>Sık Sorulan Sorular</h2>
            <p>
              Birçok sorunun cevabını Sık Sorulan Sorular sayfamızda bulabilirsiniz. Lütfen önce 
              bu sayfayı kontrol edin.
            </p>
            <div className={styles.backToHome}>
              <Link href="/faq">
                <a>Sık Sorulan Sorular →</a>
              </Link>
            </div>
          </section>
        </div>

        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Ana Sayfaya Dön</a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/privacy-policy">
          <a>Gizlilik Politikası</a>
        </Link>
        <span className={styles.divider}>|</span>
        <Link href="/terms-of-service">
          <a>Kullanım Koşulları</a>
        </Link>
        <span className={styles.divider}>|</span>
        <Link href="/contact">
          <a>İletişim</a>
        </Link>
      </footer>
    </div>
  );
} 