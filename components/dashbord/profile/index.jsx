import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { ProfileStyled } from './styled';
import Avatar from 'boring-avatars';
import { capitalizeFirstLetter } from '../../../utils/generateUtils';
import { DEMO } from '../../../utils/constants';
const { Text } = Typography;

const Profile = () => {
  const { userData } = useSelector((state) => state.auth);
  const { userPlanDetail } = useSelector((state) => state.product);
  // const { photoURL, displayName } = authProfile || {};
  const { displayName, currentSubscriptionDetails, plan } = userData;

  const { productName } = currentSubscriptionDetails || { productName: null };
  return (
    <ProfileStyled>
      <Row>
        <Col xs={24} sm={18} md={14} lg={18} xl={18}>
          <div className="Profile-details">
            <div className="profile">
              <Avatar
                className="Avatar"
                shape="circle"
                name={displayName}
                variant="beam"
                size={70}
                colors={['#186ebe', '#C20D90', '#F0AB3D', '#C271B4', '#0C8F8F']}
              />
            </div>
            <div className="welcome-text">
              Welcome Back
              <Text className="user-name"> {capitalizeFirstLetter(displayName)}</Text>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={6} md={10} lg={6} xl={6}>
          <div className="standard-plan">
            <Text className="plan-name">
              {productName === null ? capitalizeFirstLetter(plan) : capitalizeFirstLetter(productName)} Plan
            </Text>
          </div>
        </Col>
      </Row>
    </ProfileStyled>
  );
};

export default Profile;
