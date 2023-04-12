/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row, Typography, Form, Input, Select } from 'antd';
import React from 'react';
import { GeneratlSettingsStyled } from '../../styles/pageStyled/generalsettingStyled';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'boring-avatars';
import { editCompanyInfo, fetchCompanyInfo } from '../../features/generalSetting/generalSettingSliceFile';
import { firebaseAuth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

const GeneralSettings = () => {
  const { authProfile, userData } = useSelector((state) => state.auth);
  const { displayName } = authProfile || {};
  const [user] = useAuthState(firebaseAuth);
  const { uid } = user || { uid: null };
  const [form] = Form.useForm();
  const { companyName, websiteDomain } = userData || {
    billingemail: null,
    companyName: null,
    websiteDomain: null,
  };
  useEffect(() => {
    form.setFieldsValue({ companyName, websiteDomain });
  }, [userData]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log('Success:', values);
    const { websiteDomain, companyName } = values;
    dispatch(editCompanyInfo({ uid, websiteDomain, companyName }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <GeneratlSettingsStyled>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="generalsettings-box">
          <div className="general-settings-title">General Settings</div>
          <div className="company-details">
            <div className="company-info">Company Information</div>
            <div className="company-description"> Tell us about your business</div>
          </div>

          <Row>
            <Col xs={24} sm={24} md={8} lg={3}>
              <div className="profile">
                <Avatar
                  shape="circle"
                  name={displayName || ''}
                  variant="beam"
                  size={50}
                  colors={['#186ebe', '#C20D90', '#F0AB3D', '#C271B4', '#0C8F8F']}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <div className="text-box">
                    <Form.Item
                      className="input-text"
                      name="companyName"
                      label="Company name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your companyname!',
                        },
                      ]}
                    >
                      <Input className="text-input" placeholder="Enter your Comapny  Name" />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <div className="text-box">
                    <Form.Item
                      className="input-text"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your WebsiteDomain!',
                        },
                      ]}
                      name="websiteDomain"
                      label="Primary website domain"
                    >
                      <Input addonBefore="http://" className="text-inputs" placeholder="Enter your website domain" />
                    </Form.Item>
                  </div>
                </Col>
              </Row>

              <Form.Item>
                <div className="save-button">
                  <Button type="primary" size="large" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </GeneratlSettingsStyled>
  );
};

export default GeneralSettings;
