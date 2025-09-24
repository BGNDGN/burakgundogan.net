import styles from '../css/Login.module.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearLoginState } from '../redux/slices/loginSlice';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, success, error } = useSelector(state => state.login);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [layoutLoaded, setLayoutLoaded] = useState(false);


  useEffect(() => {
    if (success && user && layoutLoaded) {
      toast.success('Giriş başarılı !');
      navigate('/homepage');
      dispatch(clearLoginState());
    }

    if (error && layoutLoaded) {
      toast.error("Kullanıcı bulunamadı. Lütfen önce kayıt olun.");
      dispatch(clearLoginState());
    }
  }, [success, user, error, layoutLoaded, navigate, dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    if (!email) return "E-posta adresi boş bırakılamaz!";

    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Sadece gmail, hotmail veya outlook adreslerini kullanarak giriş yapın. Örneğin: example@gmail.com, example@hotmail.com, example@outlook.com";
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!allowedDomains.includes(domain)) {
      return "Sadece gmail, hotmail veya outlook adreslerini kullanarak giriş yapın. Örneğin:\nexample@gmail.com, example@hotmail.com, example@outlook.com";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Şifre boş bırakılamaz!";
    const startsWithUpper = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!startsWithUpper || !hasNumber) return "Şifre büyük harf ile başlamalı ve en az 1 rakam içermelidir.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    const emailError = validateEmail(formData.email);
    if (emailError) errors.push(emailError);

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.push(passwordError);

    errors.slice(0, 3).forEach(err => toast.error(err));

    if (errors.length > 0) return;

    dispatch(loginUser(formData));
  };

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/20004535-uhd_2560_1440_30fps_wvukgh.mp4" onLoaded={() => setLayoutLoaded(true)}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Giriş Sayfası</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail:</label>
            <input className={styles.formInput} id="email" name="email" type="email" maxLength={30} value={formData.email} onChange={handleChange} required/>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Şifre:</label>
            <div className={styles.passwordInputWrapper}>
              <input className={styles.formInput} id="password" type={showPassword ? 'text' : 'password'} maxLength={23} name="password" value={formData.password} onChange={handleChange} required/>
              <button className={styles.eyeButton} type="button" aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'} onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOff size={18} color="black" /> : <Eye size={18} color="black" />}</button>
            </div>
          </div>

          <button className={styles.submitButton} type="submit" disabled={loading}>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</button>

          <p className={styles.loginPageParagraph}>
            Kayıtlı değil misiniz? <Link to="/register">Kayıt olun!</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
