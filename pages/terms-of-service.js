import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kullanım Koşulları - YouTube Transcript App</title>
        <meta name="description" content="YouTube Transcript App kullanım koşulları" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Kullanım Koşulları</h1>

        <div className={styles.content}>
          <section>
            <h2>1. Hizmet Kullanımı</h2>
            <p>
              YouTube Transcript App'i kullanarak, aşağıdaki koşulları kabul etmiş sayılırsınız:
            </p>
            <ul>
              <li>Hizmeti yasal amaçlar için kullanacağınızı</li>
              <li>YouTube'un hizmet şartlarına uyacağınızı</li>
              <li>Telif hakkı ve diğer fikri mülkiyet haklarına saygı göstereceğinizi</li>
              <li>Hizmeti kötüye kullanmayacağınızı</li>
            </ul>
          </section>

          <section>
            <h2>2. Sorumluluk Reddi</h2>
            <p>
              YouTube Transcript App, YouTube API Hizmetleri'ni kullanmaktadır. Hizmetimiz:
            </p>
            <ul>
              <li>YouTube'un hizmet şartlarına tabidir</li>
              <li>YouTube'un gizlilik politikasına uyar</li>
              <li>YouTube'un API kullanım koşullarına bağlıdır</li>
            </ul>
          </section>

          <section>
            <h2>3. Değişiklikler</h2>
            <p>
              Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutarız. 
              Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.
            </p>
          </section>

          <section>
            <h2>4. İletişim</h2>
            <p>
              Kullanım koşulları hakkında sorularınız için lütfen bizimle iletişime geçin.
            </p>
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