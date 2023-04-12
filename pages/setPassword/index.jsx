import { Button, Col, Form, Input, Row, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logoImage from '../../assets/logo.png';
import { deleteInviteCollection, fetchTeamOwnerId } from '../../features/auth/authSlice';
import { updatePasswordStatus, updateUserpassword } from '../../features/settings/settingSlice';
import { fetchTeamData, updateTeamMember } from '../../features/team/teamSlice';
import { EmailVerifiedStyled } from '../../styles/pageStyled/emailVerfiedStyled';

const { Text } = Typography;

const SetNewPassword = () => {
  const { userData, teamId, docId } = useSelector((state) => state.auth);
  const { updateProfileLoading } = useSelector((state) => state.settings);
  const { teamData } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log('userData', userData);
    const { email } = userData;
    console.log('email', email);
    dispatch(fetchTeamOwnerId({ email }));
  }, []);
  useEffect(() => {
    if (teamId) {
      dispatch(fetchTeamData({ uid: teamId }));
    }
  }, [teamId]);

  const setPassword = (values) => {
    const { email, displayName, uid } = userData;
    console.log('Success:', values);
    const { password } = values;
    const TeamMembers =
      teamData &&
      teamData.filter((data) => {
        return data.email !== email;
      });
    const joinedTeamMember = { email, name: displayName, joined: new Date(), uid, role: 'member' };
    const updatedTeamData = [...TeamMembers, joinedTeamMember];
    dispatch(updateUserpassword({ password }));
    const setPassword = true;
    dispatch(updatePasswordStatus({ uid, setPassword, teamId }));
    dispatch(updateTeamMember({ teamId, updatedTeamData }));
    dispatch(deleteInviteCollection({ email, docId }));
    router.push('/');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <EmailVerifiedStyled>
        <div className="auth-logo">
          <Image src={logoImage} alt="logo" priority width={153} height={35} />
        </div>
        <div className="verification-box">
          <div className="password-Success-text">
            <Text className="verfication-message">You have successfully signed up using this </Text>
            <Text strong>{userData.email}</Text>
          </div>
          <Text>Please set your new password </Text>
          <Form
            layout="vertical"
            name="password"
            onFinish={setPassword}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="password-box">
              <Row>
                <Col lg={24}>
                  <div className="text-box">
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password placeholder={'Set Enter your new Password'} />
                    </Form.Item>
                  </div>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={updateProfileLoading}>
                  {'Set Password'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </EmailVerifiedStyled>
    </>
  );
};

export default SetNewPassword;
