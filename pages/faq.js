import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function FAQ() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sık Sorulan Sorular - YouTube Transcript App</title>
        <meta name="description" content="YouTube Transcript App hakkında sık sorulan sorular" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sık Sorulan Sorular</h1>

        <div className={styles.content}>
          <section>
            <h2>Genel Sorular</h2>
            
            <div className={styles.faqItem}>
              <h3>YouTube Transcript App nedir?</h3>
              <p>
                YouTube Transcript App, YouTube videolarının altyazılarını kolayca görüntülemenizi ve 
                indirmenizi sağlayan bir web uygulamasıdır.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Bu uygulama ücretsiz mi?</h3>
              <p>
                Evet, YouTube Transcript App tamamen ücretsizdir ve herhangi bir ücret talep etmemektedir.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Hangi dillerde altyazı desteği var?</h3>
              <p>
                Uygulama, YouTube'un desteklediği tüm altyazı dillerini desteklemektedir. Video sahibi 
                tarafından eklenen tüm altyazı dillerini görüntüleyebilirsiniz.
              </p>
            </div>
          </section>

          <section>
            <h2>Teknik Sorular</h2>

            <div className={styles.faqItem}>
              <h3>Nasıl kullanabilirim?</h3>
              <p>
                Kullanımı çok basittir. YouTube video URL'sini giriş alanına yapıştırın ve "Altyazıları Getir" 
                butonuna tıklayın. Sistem otomatik olarak mevcut altyazıları listeleyecektir.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Altyazıları nasıl indirebilirim?</h3>
              <p>
                İstediğiniz altyazı dilini seçtikten sonra "İndir" butonuna tıklayarak altyazıyı 
                bilgisayarınıza indirebilirsiniz.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Hangi dosya formatlarını destekliyorsunuz?</h3>
              <p>
                Şu anda SRT ve TXT formatlarında indirme desteği sunuyoruz. Yakında daha fazla format 
                desteği eklemeyi planlıyoruz.
              </p>
            </div>
          </section>

          <section>
            <h2>Yardım ve Destek</h2>

            <div className={styles.faqItem}>
              <h3>Bir sorunla karşılaşırsam ne yapmalıyım?</h3>
              <p>
                Herhangi bir sorunla karşılaşırsanız, lütfen bizimle iletişime geçin. Size en kısa sürede 
                yardımcı olmaya çalışacağız.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Önerilerimi nasıl iletebilirim?</h3>
              <p>
                Uygulamamızı geliştirmek için önerilerinizi her zaman bekliyoruz. İletişim sayfamızdan 
                bize ulaşabilirsiniz.
              </p>
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