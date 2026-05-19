import React, { useState } from 'react';

import {
  Eye,
  EyeOff
} from 'lucide-react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import { toast }
  from 'react-toastify';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  resetPassword,
  resetResetPasswordState
} from '../redux/slices/resetPasswordSlice';

import styles
  from '../css/ResetPasswordCard.module.css';

const ResetPasswordCard = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.resetPassword
  );

  const [password, setPassword] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState('');

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const validatePassword = (
    password
  ) => {

    if (!password)
      return 'Şifre boş bırakılamaz.';

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

  const handleResetPassword =
    async (e) => {

      e.preventDefault();

      const error =
        validatePassword(password);

      if (error) {

        toast.error(error);

        return;
      }

      if (
        password !== confirmPassword
      ) {

        toast.error(
          'Şifreler uyuşmuyor.'
        );

        return;
      }

      const result = await dispatch(
        resetPassword({
          token,
          password,
          confirmPassword,
        })
      );

      if (
        resetPassword.fulfilled.match(result)
      ) {

        toast.success(
          result.payload.message
        );

        dispatch(
          resetResetPasswordState()
        );

        setTimeout(() => {

          navigate('/login', {
            replace: true,
          });

        }, 1200);

      } else {

        toast.error(
          result.payload ||
          'Bir hata oluştu.'
        );
      }
    };

  return (
    <div className={styles.page}>

      <div className={styles.card}>

        <h2 className={styles.title}>
          Yeni Şifre Oluştur
        </h2>

        <form
          className={styles.form}
          onSubmit={
            handleResetPassword
          }
        >

          <div
            className={
              styles.passwordWrapper
            }
          >

            <input
              className={styles.input}
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Yeni şifre"
              value={password}
              maxLength={17}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className={
                styles.eyeButton
              }
              onClick={() =>
                setShowPassword(
                  prev => !prev
                )
              }
            >

              {
                showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
              }

            </button>

          </div>

          <div
            className={
              styles.passwordWrapper
            }
          >

            <input
              className={styles.input}
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Yeni şifre tekrar"
              value={confirmPassword}
              maxLength={17}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className={
                styles.eyeButton
              }
              onClick={() =>
                setShowConfirmPassword(
                  prev => !prev
                )
              }
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
                ? 'Güncelleniyor...'
                : 'Şifreyi Güncelle'
            }

          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPasswordCard;