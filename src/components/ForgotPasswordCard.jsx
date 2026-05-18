import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '../api/baseURL';
import styles from '../css/ForgotPasswordCard.module.css';

const ForgotPasswordCard = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("E-mail boş bırakılamaz.");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${baseURL}/api/forgot-password`,
        { email: trimmedEmail },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      toast.success(res.data.message || "Mail gönderildi");

      setEmail('');

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Bir hata oluştu";

      toast.error(msg);

      console.error("ForgotPassword Error:", err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className={styles.page}>

      <div className={styles.card}>
        <h2 className={styles.title}>Şifre Sıfırlama</h2>
        <hr />
        <p className={styles.description}>E-mail adresini gir, sana güvenli bir sıfırlama linki gönderelim.</p>
        
        <p className={styles.description}>
          Sayfaya kayıt olduğun mail adresi, gerçekten kullandığın bir gmail hesabın olmalı.
          Aksi olursa Sıfırlama Linki alamazsınız.
        </p>

        <p className={styles.description}>Mail spam kutusuna düşebilir. Tamamen güvenilirdir.</p>

        <form className={styles.form} onSubmit={handleForgotPassword}>
          <input className={styles.input} type="email" placeholder="E-mail adresin" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"/>
          <button className={styles.button} type="submit" disabled={loading}>{loading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}</button>
        </form>

        <div className={styles.navButtons}>
          <button type="button" onClick={() => navigate('/login')}>Giriş Yap</button>
          <button type="button" onClick={() => navigate('/register')}>Kayıt Ol</button>
          <button type="button" onClick={() => navigate('/')}>Giriş Sayfasına Dön</button>
          <button type="button" onClick={() => navigate('/homepage')}>Anasayfaya Dön</button>
        </div>
      </div>

    </div>
  );
};

export default ForgotPasswordCard;