import { Button, Card, Form, Input, Select, Tabs, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../components/pageHeader';
import TemplatesInputsAndOutputs from '../../components/templatesInputs-Outputs';
import { editUserProfile, readUserData, readUserOutputs } from '../../features/usersManagement/usersManagementSlice';
import { UserDetailStyled } from '../../styles/pageStyled/userdetailStyled';

const EditUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const { userOutputs, userUidData } = useSelector((state) => state.userManagement);

  const { userUIDData } = userUidData;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const router = useRouter();
  // console.log('userUIDData', userUIDData);

  useEffect(() => {
    dispatch(readUserData({ uid }));
  }, []);
  const { uid } = router.query;
  const { planStatus, email } = userInfo;

  useEffect(() => {
    userUIDData &&
      userUIDData.map(({ displayName, email, status, planStatus, authority, companyName, websiteDomain }) => {
        setUserInfo({ displayName, email, status, planStatus, authority, companyName, websiteDomain });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userOutputs]);

  useEffect(() => {
    const { displayName, status, authority, companyName, websiteDomain } = userInfo;
    form.setFieldsValue({ displayName, status, authority, companyName, websiteDomain });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // console.log('userInfo', userInfo);
  const onChange = (key) => {
    console.log(key);
  };

  // read outputs from the craft of the templates
  useEffect(() => {
    uid && dispatch(readUserOutputs({ uid }));
  }, [uid]);

  // for storing name and status from form
  const onFinish = (values) => {
    console.log('values', values);
    const { displayName, status, authority, companyName, websiteDomain } = values;
    if (companyName == undefined && websiteDomain == undefined) {
      (companyName = null), (websiteDomain = null);
      uid && dispatch(editUserProfile({ uid, displayName, status, authority, companyName, websiteDomain }));
    } else {
      uid && dispatch(editUserProfile({ uid, displayName, status, authority, companyName, websiteDomain }));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const userManagementButton = () => {
    router.push('/user-management');
  };
  // console.log('backgroudColor', backgroudColor);

  // extract input data

  return (
    <UserDetailStyled>
      <PageHeader title="User Details" />
      <div className="usercardtab">
        <Button onClick={userManagementButton}>Back</Button>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          className="usertab"
          items={[
            {
              label: `Edit Profile`,
              key: '1',
              children: (
                <div className="site-card-border-less-wrapper">
                  <Card
                    title="Profile Information"
                    bordered={false}
                    style={{
                      width: 600,
                    }}
                  >
                    <div>
                      <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        // initialValues={{
                        //   ...userInfo,
                        // }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="Name"
                          name="displayName"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ]}
                        >
                          <Input placeholder="Enter your Name" allowClear />
                        </Form.Item>

                        <Form.Item label="E-mail" name="email" disabled={true}>
                          <Typography>
                            <pre>{email}</pre>
                          </Typography>
                        </Form.Item>
                        <Form.Item label="Plan Status" name="planStatus">
                          <Typography>
                            <pre>{planStatus}</pre>
                          </Typography>
                        </Form.Item>
                        <Form.Item
                          label="Status"
                          name="status"
                          rules={[
                            {
                              required: true,
                              message: 'Please select your Status!',
                            },
                          ]}
                        >
                          <Select>
                            <Select.Option value="active">active</Select.Option>
                            <Select.Option value="deactivate">deactivate</Select.Option>
                          </Select>
                        </Form.Item>

                        {/* <Form.Item label="Company Name" name="companyName">
                          <Input placeholder="enter your name of the Company" allowClear />
                        </Form.Item>

                        <Form.Item label="Website Domain" name="websiteDomain">
                          <Input placeholder="enter your name of the websiteDomain" allowClear />
                        </Form.Item> */}
                        <Form.Item
                          label="Authority"
                          name="authority"
                          rules={[
                            {
                              type: 'authority',
                              required: true,
                              message: 'Please Enter the authority!',
                            },
                          ]}
                        >
                          <Select>
                            <Select.Option value="admin">admin</Select.Option>
                            <Select.Option value="user">user</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              label: `Template Outputs`,
              key: '2',
              children: (
                <div className="templates-details">
                  <TemplatesInputsAndOutputs />,
                </div>
              ),
            },
          ]}
        />
      </div>
    </UserDetailStyled>
  );
};

export default EditUser;
