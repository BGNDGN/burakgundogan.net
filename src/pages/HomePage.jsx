import React, { useState, useCallback } from 'react';
import About from '../components/About.jsx';
import SSS from '../components/SSS.jsx';
import FSDI from '../components/FSDI.jsx';
import UsingTechnologies from '../components/UsingTechnologies.jsx';
import Logos from '../logo/Logo';
import burakImage from '../assets/burak-profile.webp';
import { Link } from 'react-router-dom';
import styles from '../css/HomePage.module.css';
import Layout from '../components/Layout';
import { toast } from "react-toastify";

function HomePage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const validateEmail = (email) => {
    if (!email) return "E-posta adresi boş bırakılamaz!";

    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const parts = email.split("@");

    if (parts.length !== 2) return "Sadece gmail, hotmail veya outlook adresi girin. Örneğin example@gmail.com example@hotmail.com example@outlook.com";

    const domain = parts[1].toLowerCase();
    if (!allowedDomains.includes(domain)) return "Sadece gmail, hotmail veya outlook adresi girin. Örneğin example@gmail.com example@hotmail.com example@outlook.com";
    
    return ""; 
  };

  const handleSendMail = useCallback((e) => {
    e.preventDefault();

    const error = validateEmail(email);

    if (error) {
      toast.error(error); 
      return;
    }

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=burakgundogan25@gmail.com&su=${encodeURIComponent(subject)}&body=Mail adresim:${email}`;
    window.open(gmailURL, "_blank");
  }, [email, subject]);

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/3129671-uhd_3840_2160_30fps_hzqcf0.mp4">
      <div>

        <div className={styles.navbarDiv}>
          <div className={styles.navbarPageName}>
            <Link to="/homepage">burakgundogan.net</Link>
          </div>

          <div className={styles.navbarZones}>
            <a href="#about">Hakkımda</a>
            <a href="#experience">İş Deneyimlerim</a>
            <a href="#skills">Kullandığım Teknolojiler</a>
            <a href="#socials">Sosyal Medyalarım</a>
            <a href="#contact">Benimle İletişime Geç</a>
            <Link to="/">Giriş Sayfasına Geri Dön</Link>
          </div>
        </div>

        <div id="about" className={styles.aboutZone}>
          <h2>Hakkımda</h2>
          <hr />
          <img src={burakImage} className={styles.burakImageHomePage} alt="Burak Gündoğan" loading="lazy"/>
          <div className={styles.aboutZoneText}>
            <About />
          </div>
          <hr className={styles.aboutZoneThisHrHasToHidden} />
        </div>

        <div id="experience" className={styles.experienceZone}>
          <h2>İş Deneyimlerim</h2>
          <hr />
          <SSS />
          <hr />
          <FSDI />
          <hr />
        </div>

        <div id="skills" className={styles.usingTechnologiesZone}>
          <h2>Kullandığım Teknolojiler</h2>
          <hr />
          <UsingTechnologies />
          <hr />
        </div>

        <div id="contact" className={styles.contactMeZone}>
          <h2>Benimle İletişime Geçin</h2>
          <hr className={styles.contactMeZoneHr} />

          <form onSubmit={handleSendMail}>
            <div className={styles.mailDiv}>
              <label>E-mail:
                <input className={styles.mailInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta adresiniz" required/>
              </label>
            </div>

            <div className={styles.subjectDiv}>
              <label />Konu:
              <textarea className={styles.subjectInput} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Konu başlığı"required />
            </div>

            <div>
              <button type="submit" className={styles.contactMeButton}>Gönder</button>
            </div>
          </form>
        </div>

        <div id="socials" className={styles.socialMediasZone}>
          <h2>Sosyal Medya Hesaplarım</h2>
          <hr className={styles.socialMediasZoneHr} />
          <Logos />
        </div>
        
      </div>
    </Layout>
  );
}

export default HomePage;
