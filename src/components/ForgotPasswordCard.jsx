import React, { useState } from 'react';

import { useNavigate }
  from 'react-router-dom';

import { toast }
  from 'react-toastify';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  forgotPassword,
  resetForgotPasswordState
} from '../redux/slices/forgotPasswordSlice';

import styles
  from '../css/ForgotPasswordCard.module.css';

const ForgotPasswordCard = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.forgotPassword
  );

  const [email, setEmail] = useState('');

  const handleForgotPassword =
    async (e) => {

      e.preventDefault();

      const trimmedEmail =
        email.trim();

      if (!trimmedEmail) {

        toast.error(
          'E-mail boş bırakılamaz.'
        );

        return;
      }

      const result = await dispatch(
        forgotPassword(trimmedEmail)
      );

      if (
        forgotPassword.fulfilled.match(result)
      ) {

        toast.success(
          result.payload.message ||
          'Mail gönderildi'
        );

        setEmail('');

        dispatch(
          resetForgotPasswordState()
        );

      } else {

        toast.error(
          result.payload ||
          'Bir hata oluştu'
        );
      }
    };

  return (
    <div className={styles.page}>

      <div className={styles.card}>

        <h2 className={styles.title}>
          Şifre Sıfırlama
        </h2>

        <hr />

        <p className={styles.description}>
          E-mail adresini gir,
          sana güvenli bir
          sıfırlama linki gönderelim.
        </p>

        <p className={styles.description}>
          Sayfaya kayıt olduğun
          mail adresi,
          gerçekten kullandığın
          bir gmail hesabın olmalı.
          Aksi olursa
          Sıfırlama Linki
          alamazsınız.
        </p>

        <p className={styles.description}>
          Mail spam kutusuna
          düşebilir.
          Tamamen güvenilirdir.
        </p>

        <form
          className={styles.form}
          onSubmit={
            handleForgotPassword
          }
        >

          <input
            className={styles.input}
            type="email"
            placeholder="E-mail adresin"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            autoComplete="email"
          />

          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? 'Gönderiliyor...'
                : 'Sıfırlama Linki Gönder'
            }

          </button>

        </form>

        <div className={styles.navButtons}>

          <button
            type="button"
            onClick={() =>
              navigate('/login')
            }
          >
            Giriş Yap
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/register')
            }
          >
            Kayıt Ol
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/')
            }
          >
            Giriş Sayfasına Dön
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/homepage')
            }
          >
            Anasayfaya Dön
          </button>

        </div>

      </div>

    </div>
  );
};

export default ForgotPasswordCard;