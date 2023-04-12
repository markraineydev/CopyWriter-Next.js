import React from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import UserManagmentTable from '../../components/userManagementTAble';
import { readUserManagementData } from '../../features/usersManagement/usersManagementSlice';
import { firebaseAuth } from '../../firebase';
import { UserManagementStyled } from '../../styles/pageStyled/usermanagementStyled';

const UserManagment = () => {
  const { userManagementData } = useSelector((state) => state.userManagement);
  const [user] = useAuthState(firebaseAuth);
  const { uid } = user || { uid: null };
  const { userData } = userManagementData;
  const dispatch = useDispatch();

  useEffect(() => {
    uid && dispatch(readUserManagementData({ uid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return (
    <UserManagementStyled>
      <div className="usermanagment-box">
        <div className="usermanagment-title">User Management Table</div>
      </div>
      <UserManagmentTable userData={userData} />
    </UserManagementStyled>
  );
};

export default UserManagment;
