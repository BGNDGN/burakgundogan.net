import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import baseURL from '../api/baseURL';
import styles from '../css/ResetPassword.module.css';

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {

    if (!password)
      return "Şifre boş bırakılamaz.";

    if (password.length > 17)
      return "Şifre en fazla 17 karakter olabilir.";

    const startsWithUpper = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!startsWithUpper)
      return "Şifre büyük harf ile başlamalıdır.";

    if (!hasNumber)
      return "Şifre en az 1 rakam içermelidir.";

    return "";
  };

  const handleResetPassword = async (e) => {

    e.preventDefault();

    const error = validatePassword(password);

    if (error) {
      toast.error(error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Şifreler uyuşmuyor.");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${baseURL}/api/reset-password/${token}`,
        {
          password
        }
      );

      toast.success(res.data.message);

      navigate('/login');

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Bir hata oluştu."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/857045-hd_1920_1080_30fps.mp4">

      <div className={styles.page}>
        <div className={styles.card}>

          <h2 className={styles.title}>
            Yeni Şifre Oluştur
          </h2>

          <form
            className={styles.form}
            onSubmit={handleResetPassword}
          >

            {/* PASSWORD */}
            <div className={styles.passwordWrapper}>

              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Yeni şifre"
                value={password}
                maxLength={17}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {
                  showPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                }
              </button>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className={styles.passwordWrapper}>

              <input
                className={styles.input}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Yeni şifre tekrar"
                value={confirmPassword}
                maxLength={17}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {
                  showConfirmPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                }
              </button>

            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={loading}
            >
              {
                loading
                  ? "Güncelleniyor..."
                  : "Şifreyi Güncelle"
              }
            </button>

          </form>

        </div>
      </div>

    </Layout>
  );
}

export default ResetPassword;