import React from 'react';
import { Card, Col, Row, Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { PlanDetailsStyled } from '../../styles/pageStyled/plandetailsStyled';
import { useDispatch, useSelector } from 'react-redux';
import { editPlanDetails, readPlanDetails } from '../../features/usersManagement/usersManagementSlice';
import { useEffect } from 'react';
import { DEMO, PRO, UNLIMITED, STARTER } from '../../utils/constants';
import { PageHeader } from '../../components/pageHeader';
import { useState } from 'react';
import { capitalizeFirstLetter } from '../../utils/generateUtils';
const PlanDetails = () => {
  const { userPlan } = useSelector((state) => state.userManagement);
  const [form0] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log('values', values);
    const { name, words, team, projects, yearlyWords } = values;
    yearlyWords = words * 12;
    dispatch(editPlanDetails({ name, words, team, projects, yearlyWords }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    dispatch(readPlanDetails({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userPlan &&
      userPlan.map(({ name, words, team, projects, yearlyWords }) => {
        if (name === DEMO) {
          form0.setFieldsValue({ words, team, projects });
        } else if (name === STARTER) {
          form1.setFieldsValue({ words, team, projects, yearlyWords });
        } else if (name === PRO) {
          form2.setFieldsValue({ words, team, projects, yearlyWords });
        } else if (name === UNLIMITED) {
          form3.setFieldsValue({ words, team, projects, yearlyWords });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlan]);

  return (
    <PlanDetailsStyled>
      <PageHeader title="Plan Details" show={false} />
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card title="Demo">
              <Form
                form={form0}
                name="demo"
                // labelCol={{
                //   span: 6,
                // }}
                initialValues={{
                  remember: true,
                  name: capitalizeFirstLetter(DEMO),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Name" name="name">
                  <Input disabled={true} />
                </Form.Item>

                <Form.Item
                  label="Words"
                  name="words"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your words!',
                    },
                  ]}
                >
                  <InputNumber placeholder="100,000" />
                </Form.Item>

                <Form.Item
                  label="Teams"
                  name="team"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your team!',
                    },
                  ]}
                >
                  <InputNumber placeholder="0" />
                </Form.Item>

                <Form.Item
                  label="Project"
                  name="projects"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your projects!',
                    },
                  ]}
                >
                  <InputNumber placeholder="0" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Starter">
              <Form
                name="starter"
                form={form1}
                // labelCol={{
                //   span: 6,
                // }}
                initialValues={{
                  name: capitalizeFirstLetter(STARTER),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Name" name="name">
                  <Input disabled={true} />
                </Form.Item>

                <Form.Item
                  label="Words"
                  name="words"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your words!',
                    },
                  ]}
                >
                  <InputNumber placeholder="300,000" />
                </Form.Item>
                <Form.Item
                  label="Teams"
                  name="team"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your team!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  label="Project"
                  name="projects"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your projects!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>
                <Form.Item
                  label="yearly"
                  name="yearlyWords"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your plan!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Pro">
              <Form
                form={form2}
                name="pro"
                // labelCol={{
                //   span: 6,
                // }}
                initialValues={{
                  remember: true,
                  name: capitalizeFirstLetter(PRO),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Name" name="name">
                  <Input disabled={true} />
                </Form.Item>

                <Form.Item
                  label="Words"
                  name="words"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your words!',
                    },
                  ]}
                >
                  <InputNumber placeholder="100,000" />
                </Form.Item>

                <Form.Item
                  label="Teams"
                  name="team"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your team!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  label="Project"
                  name="projects"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your projects!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>
                <Form.Item
                  label="yearly"
                  name="yearlyWords"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your plan!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Unlimited">
              <Form
                form={form3}
                name="unlimited"
                // labelCol={{
                //   span: 6,
                // }}
                initialValues={{
                  remember: true,
                  name: capitalizeFirstLetter(UNLIMITED),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Name" name="name">
                  <Input disabled={true} />
                </Form.Item>

                <Form.Item
                  label="Words"
                  name="words"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <InputNumber placeholder="300,000" />
                </Form.Item>
                <Form.Item
                  label="Teams"
                  name="team"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your team!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  label="Project"
                  name="projects"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your projects!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>
                <Form.Item
                  label="yearly"
                  name="yearlyWords"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your plan!',
                    },
                  ]}
                >
                  <InputNumber placeholder="4" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PlanDetailsStyled>
  );
};

export default PlanDetails;
