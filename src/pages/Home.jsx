import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Home.module.css';
import burakImage from '../assets/burak-profile.webp';
import Logos from '../logo/Logo';
import register from '../assets/austin-distel-744oGeqpxPQ-unsplash.webp';
import login from '../assets/desola-lanre-ologun-zYgV-NGZtlA-unsplash.webp';
import homepage from '../assets/undraw_fingerprint-login_19qv.webp';
import Layout from '../components/Layout';

function Home () {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = [homepage, register, login];
    let loadedCount = 0;

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  if (!imagesLoaded) {
    return <div style={{ height: '100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>Yükleniyor...</div>;
  }

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/857045-hd_1920_1080_30fps.mp4">
      <div className={styles.homeContainer}>
        <div className={styles.homeMainDiv}>
          <div className={styles.homeFirstDiv}>
            <div className={styles.photograph}>
              <img src={burakImage} className={styles.burakImage} alt="Burak Gündoğan" loading="lazy" />
            </div>
            <hr className={styles.sectionHr} />
            <div className={styles.nameSurname}><p>Burak Gündoğan</p></div>
            <hr className={styles.sectionHr} />
            <div className={styles.socialMedias}><p>Sosyal Medya Hesaplarım ve Github Hesabım</p>
              <Logos />
            </div>
            <hr className={styles.sectionHr} />
            <div className={styles.copyright}><p>Copyright © 2025 - Tüm Hakları Saklıdır.</p></div>
          </div>

          <div className={styles.homeSecondDiv}>
            <p className={styles.blog}>BLOG Ve Giriş/Kayıt Sayfalarım</p>
            <hr className={styles.sectionHrBLOG} />
            <p className={styles.routerToHomePage} style={{ backgroundImage: `url(${homepage})` }}>
              Anasayfaya girmek için&nbsp;
              <Link to="/homepage"><strong className={styles.routerToHomePageStrong}>tıklayınız !</strong></Link>
            </p>
            <p className={styles.routerToLoginPage} style={{ backgroundImage: `url(${register})` }}>
              Kaydolmak için&nbsp;
              <Link to="/register"><strong className={styles.routerToHomeLoginStrong}>tıklayınız !</strong></Link>
            </p>
            <p className={styles.routerToRegisterPage} style={{ backgroundImage: `url(${login})` }}>
              Giriş yapmak için&nbsp;
              <Link to="/login"><strong className={styles.routerToHomeRegisterStrong}>tıklayınız !</strong></Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;