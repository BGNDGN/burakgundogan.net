import React from 'react';
import styles from '../css/NotFoundCard.module.css';
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate();

    return(
      <div className={styles.errorDiv}>
        <h2>404 Not Found</h2>
        <hr className={styles.NotFound}></hr>
        <p>Aradığınız sayfa bulunamadı.</p>
        <button onClick={() => navigate('/')}>Giriş Sayfası'na Git</button>
        <button onClick={() => navigate('/homepage')}>Anasayfa'ya Git</button>
        <button onClick={() => navigate('/login')}>Kullanıcı Giriş Sayfası'na Git</button>
        <button onClick={() => navigate('/register')}>Kullanıcı Kayıt Sayfası'na Git</button>
      </div>
    )
}

export default Error;