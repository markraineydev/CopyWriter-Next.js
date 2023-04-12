import React from 'react';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';
import { Button, Col, Result, Row } from 'antd';
import { UserDeactivateStyled } from '../../styles/pageStyled/userdeactivateStyled';
import { Logout } from '../../components/logout/logout';

const UserDeactivate = () => {
  return (
    <UserDeactivateStyled>
      <div>
        <Row>
          <Col sm={12} lg={12}>
            <Image
              width={143}
              height={32}
              src={logoImage}
              alt="logo"
              priority // lazy ,eager
            />
          </Col>
        </Row>
      </div>
      <div className="deactivate-warning">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary">
              <Logout showIcon={false} />
            </Button>
          }
        />
      </div>
    </UserDeactivateStyled>
  );
};

export default UserDeactivate;
