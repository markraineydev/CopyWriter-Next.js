import { Button } from 'antd';
import { signOut } from 'firebase/auth';
import React from 'react';
import { firebaseAuth } from '../../firebase';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { LogoutStyled } from './styled';

export const Logout = ({ showIcon }) => {
  const logOut = () => {
    signOut(firebaseAuth);
    firebaseAuth.signOut();
  };

  return (
    <LogoutStyled onClick={logOut}>
      {showIcon && <ArrowRightOnRectangleIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />} Sign out
    </LogoutStyled>
  );
};
