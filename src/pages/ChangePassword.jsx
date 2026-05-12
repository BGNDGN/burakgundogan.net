import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../api/baseURL';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Eye, EyeOff } from 'lucide-react';
import styles from '../css/ChangePassword.module.css';
import Layout from '../components/Layout';

function ChangePassword() {

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);


  const validatePassword = (password) => {
    if (!password) return "Şifre boş bırakılamaz!";
    if (password.length > 17) return "Şifre en fazla 17 karakter olabilir.";

    const startsWithUpper = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!startsWithUpper)
      return "Şifre büyük harf ile başlamalıdır.";

    if (!hasNumber)
      return "Şifre en az 1 rakam içermelidir.";

    return "";
  };

  const handleChangePassword = async () => {

    if (!oldPassword) {
      toast.error("Eski şifre boş olamaz!");
      return;
    }

    const error = validatePassword(newPassword);
    if (error) {
      toast.error(error);
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("Yeni şifre eski şifre ile aynı olamaz!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const res = await axios.put(
        `${baseURL}/api/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(res.data.message || "Şifre başarıyla değiştirildi");

      setOldPassword('');
      setNewPassword('');

      setTimeout(() => {
        navigate('/homepage');
      }, 800);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Şifre değiştirilemedi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/15869190_1080_1920_30fps.mp4">
      <div className={styles.page}>
        <div className={styles.card}>
          <h2 className={styles.title}>🔐 Şifre Değiştir</h2>

          <div className={styles.inputGroup}>
            <input className={styles.input} type={showOldPassword ? "text" : "password"} placeholder="Eski şifre" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
            <button className={styles.eyeButton} onClick={() => setShowOldPassword(prev => !prev)} type="button">{showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <div className={styles.inputGroup}>
            <input className={styles.input} type={showNewPassword ? "text" : "password"} placeholder="Yeni şifre" value={newPassword} maxLength={17} onChange={(e) => setNewPassword(e.target.value)}/>
            <button className={styles.eyeButton} onClick={() => setShowNewPassword(prev => !prev)} type="button">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <button className={styles.primaryButton} onClick={handleChangePassword} disabled={loading}>{loading ? "Güncelleniyor..." : "Şifreyi Değiştir"}</button>
          <button className={styles.secondaryButton} onClick={() => navigate('/homepage')}>Geri Dön</button>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;