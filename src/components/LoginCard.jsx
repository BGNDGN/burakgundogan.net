import React, { useState } from 'react';
import styles from '../css/LoginCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/loginSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "react-toastify";

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {

    if (!email)
      return "E-posta adresi boş bırakılamaz!";

    const allowedDomains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com"
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Geçerli bir e-mail girin.";
    }

    const domain = email
      .split("@")[1]
      ?.toLowerCase();

    if (!allowedDomains.includes(domain)) {
      return "Sadece gmail, hotmail veya outlook kullanabilirsiniz.";
    }

    return "";
  };

  const validatePassword = (password) => {

    if (!password)
      return "Şifre boş bırakılamaz!";

    const startsWithUpper = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!startsWithUpper || !hasNumber) {
      return "Şifre büyük harf ile başlamalı ve en az 1 rakam içermelidir.";
    }

    return "";
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errors = [];
    const emailError = validateEmail(formData.email);

    if (emailError)
      errors.push(emailError);

    const passwordError = validatePassword(formData.password);

    if (passwordError)
      errors.push(passwordError);

    errors.forEach(err => toast.error(err));

    if (errors.length > 0)
      return;

    try {

      const result = await dispatch(
        loginUser(formData)
      );

      if (result.payload?.token) {
        toast.success("Giriş başarılı!");
        navigate('/homepage');

      } else {
        toast.error("Giriş başarısız!");
      }

    } catch (err) {
      toast.error("Bir hata oluştu!");
    }
  };

  return (
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
            <button className={styles.eyeButton} type="button" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </div>

        <button className={styles.submitButton} type="submit" disabled={loading}>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</button>
        <p className={styles.loginPageParagraph}>Kayıtlı değil misiniz?<Link to="/register">Kayıt olun!</Link></p>
        <p className={styles.forgotPasswordText}><Link to="/forgot-password">Şifremi Unuttum</Link></p>
      </form>

    </div>
  );
};

export default LoginForm;