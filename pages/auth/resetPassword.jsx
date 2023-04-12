import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, handleResetPassword } from '../../features/auth/authSlice';
import { AuthStyled } from '../../styles/pageStyled/authStyled';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ResetPasswordForm from '../../components/signIn-signUp/resetPassword';
import { PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESSFULLY } from '../../utils/constants';

export default function Login() {
  const { resetMessage, authLoginwithEmailLoading, oobCode } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (resetMessage === PASSWORD_RESET_SUCCESSFULLY) {
      router.push('../login');
    } else if (resetMessage === PASSWORD_RESET_FAILED) {
      router.push('../forget-password');
    }
  }, [resetMessage]);

  const dispatch = useDispatch();

  const isShowSignIn = () => {
    router.push('../login');
  };
  return (
    <AuthStyled>
      <div className="auth-logo">
        <Image src={logoImage} alt="logo" priority />
      </div>

      <ResetPasswordForm
        onFormClick={isShowSignIn}
        authLoginwithEmailLoading={authLoginwithEmailLoading}
        oobCode={oobCode}
      />

      <br />
      <div className="forgetpassword">Reset Password</div>
    </AuthStyled>
  );
}
