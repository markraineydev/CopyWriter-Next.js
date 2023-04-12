import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../features/auth/authSlice';
import { AuthStyled } from '../../styles/pageStyled/authStyled';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';
import SignInForm from '../../components/signin-signup/signin';
import SignUpForm from '../../components/signin-signup/signup';
import ForgetPasswordForm from '../../components/signin-signup/forgetpassword';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onLogin = () => {
    setLoading(true);
    dispatch(authLogin());
  };

  const isShowSignIn = () => {
    router.push('../login');
  };
  return (
    <AuthStyled>
      <div className="auth-logo">
        <Image src={logoImage} alt="logo" priority />
      </div>

      <SignUpForm onLogin={onLogin} />

      <br />

      <div className="account-info">
        <span className="auth-account">{'Already have an Account?'} </span>
        <a className="signup-button" onClick={isShowSignIn}>
          SignIn
        </a>
      </div>
    </AuthStyled>
  );
}
