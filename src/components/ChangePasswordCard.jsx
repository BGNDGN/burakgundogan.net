import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector} from 'react-redux';
import { changePassword, resetChangePasswordState} from '../redux/slices/changePasswordSlice';
import styles from '../css/ChangePasswordCard.module.css';

const ChangePasswordCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.changePassword
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const validatePassword = (password) => {
    if (!password)
      return 'Şifre boş bırakılamaz!';

    if (password.length > 17)
      return 'Şifre en fazla 17 karakter olabilir.';

    const startsWithUpper =
      /^[A-Z]/.test(password);

    const hasNumber =
      /\d/.test(password);

    if (!startsWithUpper)
      return 'Şifre büyük harf ile başlamalıdır.';

    if (!hasNumber)
      return 'Şifre en az 1 rakam içermelidir.';

    return '';
  };

  const handleChangePassword = async () => {
    if (!oldPassword) {
      toast.error('Eski şifre boş olamaz!');
      return;
    }

    const error = validatePassword(newPassword);
    if (error) {
      toast.error(error);
      return;
    }

    if (oldPassword === newPassword) {
      toast.error(
        'Yeni şifre eski şifre ile aynı olamaz!'
      );
      return;
    }

    const result = await dispatch(
      changePassword({
        oldPassword,
        newPassword
      })
    );

    if (
      changePassword.fulfilled.match(result)
    ) {
      toast.success(
        result.payload.message ||
        'Şifre başarıyla değiştirildi'
      );

      setOldPassword('');
      setNewPassword('');

      dispatch(
        resetChangePasswordState()
      );

      setTimeout(() => {
        navigate('/homepage');
      }, 800);

    } else {
      toast.error(
        result.payload ||
        'Şifre değiştirilemedi'
      );
    }
  };

  return (
    <div className={styles.page}>

      <div className={styles.card}>
        <h2 className={styles.title}>🔐 Şifre Değiştir</h2>

        <div className={styles.inputGroup}>
          <input className={styles.input} type={ showOldPassword ? 'text' : 'password'} placeholder="Eski şifre" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
          <button className={styles.eyeButton} onClick={() => setShowOldPassword(prev => !prev)} type="button"> {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>

        <div className={styles.inputGroup}>
          <input className={styles.input} type={showNewPassword ? 'text' : 'password'} placeholder="Yeni şifre" value={newPassword} maxLength={17} onChange={(e) => setNewPassword(e.target.value)}/>
          <button className={styles.eyeButton} onClick={() => setShowNewPassword(prev => !prev)}type="button">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button className={styles.primaryButton} onClick={handleChangePassword} disabled={loading}>{loading ? 'Güncelleniyor...' : 'Şifreyi Değiştir'}</button>
        <button className={styles.secondaryButton} onClick={() => navigate('/homepage')}>Geri Dön</button>
      </div>

    </div>
  );
};

export default ChangePasswordCard;