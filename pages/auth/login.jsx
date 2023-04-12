import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../features/auth/authSlice';
import { AuthStyled } from '../../styles/pageStyled/authStyled';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';
import SignInForm from '../../components/signin-signup/signin';
import { useState } from 'react';

export default function Login() {
  const [currentForm, setCurrentForm] = useState('signIn');
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onLogin = () => {
    setLoading(true);
    dispatch(authLogin());
  };
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const isShowSignUp = () => {
    router.push('../signup');
  };
  const isShowSignIn = () => {
    setIsShow(false);
  };
  return (
    <AuthStyled>
      <div className="auth-logo">
        <Image src={logoImage} alt="logo" priority />
      </div>
      <SignInForm onLogin={onLogin} onFormClick={toggleForm} loading={loading} />
      <br />
      <div className="account-info">
        <span className="auth-account">{"Don't have an Account?"} </span>
        <a className="signup-button" onClick={isShowSignUp}>
          {'SignUp'}
        </a>
      </div>
    </AuthStyled>
  );
}
