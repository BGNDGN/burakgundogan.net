import React, { useState, useEffect } from 'react';
import About from './HomePageCardCards/About.jsx';
import SSS from './HomePageCardCards/SSS.jsx';
import FSDI from './HomePageCardCards/FSDI.jsx';
import UsingTechnologies from './HomePageCardCards/UsingTechnologies.jsx';
import Logos from '../logo/Logo';
import burakImage from '../assets/burak-profile.webp';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/HomePageCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe, logoutUser } from '../redux/slices/loginSlice';

const HomePageContent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.login);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(fetchMe());
    }

    dispatch(fetchMe());

  }, [dispatch]);

  const handleSendMail = (e) => {
    e.preventDefault();
    const gmailURL =
      `https://mail.google.com/mail/?view=cm&fs=1&to=burakgundogan25@gmail.com&su=${encodeURIComponent(subject)}&body=Mail:${email}`;
    window.open(gmailURL, "_blank");
  };

  return (
    <>
      <div className={styles.navbarDiv}>

        <div className={styles.navbarPageName}>
          <Link to="/homepage">burakgundogan.net</Link>
        </div>

        <div className={styles.navbarZones}>
          <a href="#about">Hakkımda</a>
          <a href="#experience">İş Deneyimi</a>
          <a href="#skills">Teknolojiler</a>
          <a href="#contact">İletişim</a>
          <a href="#socials">Sosyal Medya</a>
          <Link to="/">Giriş Sayfasına Geri Dön</Link>

          <div className={styles.profileHoverArea} onClick={() => setIsProfileOpen(true)}>
            <span className={styles.profileIcon}>⚙️</span>
          </div>
        </div>

      </div>

      <div className={`${styles.profileSidebar} ${ isProfileOpen ? styles.profileSidebarOpen : ""}`}>
        <div className={styles.sidebarClose} onClick={() => setIsProfileOpen(false)}>×</div>
        <h3>Kullanıcı Bilgilerim</h3>

        <hr className={styles.userInfoHr} />

        <p><strong>İsim:</strong>{user?.name || "Giriş Yapılmadı"}</p>
        <p><strong>E-mail:</strong>{user?.email || "Giriş Yapılmadı"}</p>
        <button onClick={() => navigate('/login')}>Giriş Sayfasına Git</button>

        <button onClick={() => navigate('/change-password')}>Şifremi Değiştir</button>

        <button onClick={() => { dispatch(logoutUser()); navigate('/');}}>Çıkış Yap</button>
      </div>

      <div id="about" className={styles.aboutZone}>
        <h2>Hakkımda</h2>
        <hr className={styles.sectionHr} />
        <img src={burakImage} className={styles.burakImageHomePage} alt="Burak"/>
        <About />
      </div>

      <div id="experience" className={styles.experienceZone}>
        <h2>İş Deneyimlerim</h2>
        <hr className={styles.sectionHr} />

        <SSS />

        <FSDI />
      </div>

      <div id="skills" className={styles.usingTechnologiesZone}>
        <h2>Kullandığım Teknolojiler</h2>
        <hr className={styles.sectionHr} />

        <UsingTechnologies />
      </div>

      <div id="contact" className={styles.contactMeZone}>
        <h2>İletişim</h2>
        <hr className={styles.sectionHr} />

        <form onSubmit={handleSendMail}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required/>
          <textarea value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Konu" required/>
          <button type="submit">Gönder</button>
        </form>

      </div>
      <div id="socials" className={styles.socialMediasZone}>
        <h2>Sosyal Medya Hesaplarım</h2>
        <hr className={styles.sectionHr} />

        <Logos />
      </div>
    </>
  );
};

export default HomePageContent;