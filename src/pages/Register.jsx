import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegisterState } from '../redux/slices/registerSlice';
import styles from '../css/Register.module.css';
import signUpImage from '../assets/undraw_fingerprint-login_19qv.webp';
import Layout from '../components/Layout';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);

  useEffect(() => {
    if (success) setToastQueue(prev => [...prev, { type: 'success', message: 'Kayıt başarılı! Giriş yapabilirsiniz.' }]);
    if (error) setToastQueue(prev => [...prev, { type: 'error', message: error }]);
  }, [success, error]);

  useEffect(() => {
    if (!layoutLoaded) return;

    if (success) {
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      
      setTimeout(() => {
        dispatch(clearRegisterState());
        navigate('/login');
      }, 1000);
    }

    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch(clearRegisterState());
      }, 1000);
    }
  }, [success, error, layoutLoaded, dispatch, navigate]);

  const validateName = (name) => {
    if (!name.trim()) return 'İsim alanı boş bırakılamaz.';
    if (/\d/.test(name)) return 'İsim alanına sayı girilemez.';
    if (/[^a-zA-ZçÇğĞıİöÖşŞüÜ\s]/.test(name)) return 'İsim alanına özel karakter girilemez.';
    if (!/^[A-ZÇĞİÖŞÜ]/.test(name)) return 'İsim büyük harf ile başlamalıdır.';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return "E-posta adresi boş bırakılamaz!";
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Sadece gmail, hotmail veya outlook adreslerini kullanarak giriş yapın. Örneğin: example@gmail.com, example@hotmail.com, example@outlook.com";

    const domain = email.split('@')[1]?.toLowerCase();
    if (!allowedDomains.includes(domain)) return "Sadece gmail, hotmail veya outlook adreslerini kullanarak giriş yapın. Örneğin: example@gmail.com, example@hotmail.com, example@outlook.com";

    return '';
  };

  const validatePassword = (password) => {
    if (!password) return "Şifre boş bırakılamaz!";
    const startsWithUpper = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!startsWithUpper || !hasNumber) return "Şifre büyük harf ile başlamalı ve en az 1 rakam içermelidir.";
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [
      validateName(formData.name),
      validateEmail(formData.email),
      validatePassword(formData.password)
    ].filter(Boolean);

    errors.slice(0, 3).forEach(err => toast.error(err));

    if (errors.length === 0) {
      dispatch(registerUser(formData));
    }
  };

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/1093662-hd_1920_1080_30fps.mp4" onLoaded={() => setLayoutLoaded(true)}>
      <div className={styles.RegisterMain}>
        <h2 className={styles.registerTitle}>Kayıt Sayfası</h2>

        <form className={styles.registerZone} onSubmit={handleSubmit}>
          <div className={styles.registerInputGroup}>
            <label htmlFor="name">İsim:</label>
            <input className={styles.registerInputField} id="name" name="name" type="text" maxLength={23} value={formData.name} onChange={handleChange} required/>
          </div>

          <div className={styles.registerInputGroup}>
            <label htmlFor="email">E-mail:</label>
            <input className={styles.registerInputField} id="email" name="email" type="email" maxLength={30} value={formData.email} onChange={handleChange} required/>
          </div>

          <div className={styles.registerInputGroup}>
            <label htmlFor="password">Şifre:</label>
            <div className={styles.passwordInputWrapper}>
              <input className={styles.registerInputField} id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} maxLength={17} required/>
              <button type="button" aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'} className={styles.registerEyeButton} onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.registerSubmitButton}>{loading ? 'Kaydoluyor...' : 'Kaydol'}</button>

          <p className={styles.ifUWantToRegister}>Eğer kayıt olmadan anasayfaya gitmek istiyorsanız <Link to="/homepage">tıklayınız !</Link></p>
        </form>

        <div className={styles.photographZone}>
          <h2 className={styles.tokenIsSafingYourInfos}>Tüm bilgileriniz Token ile gizlenmektedir.</h2>
          <hr className={styles.tokenIsSafingYourInfosHr} />
          <img className={styles.registerImage} src={signUpImage} alt="Kayıt Ol" loading="lazy" />
        </div>
      </div>
    </Layout>
  );
}

export default Register;
