import React, { useState } from 'react';
import { Row, Col, Card, InputNumber, Form, Input, Button, Space, Switch, Select } from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AddNewTemplatesWrapper, Main } from '../../styles/pageStyled/addnewtemplatesStyled';
import { useDispatch } from 'react-redux';
import { newTemplateData } from '../../features/newTemplates/newTemplatesSlice';
import { categories } from '../../utils/TemplateData';
import { PageHeader } from '../../components/pageHeader';
import { DEMO, PRO, UNLIMITED, STARTER } from '../../utils/constants';

const AddNewTool = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { id } = values;
    const toolFields = { ...values };
    dispatch(newTemplateData({ id, toolFields }));
    form.resetFields();
  };

  const options = [
    { label: 'Demo', value: DEMO },
    { label: 'Starter', value: STARTER },
    { label: 'Pro', value: PRO },
    { label: 'Unlimited', value: UNLIMITED },
  ];

  return (
    <AddNewTemplatesWrapper>
      <PageHeader title="Add New Template" show={false} />
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <Form
              className={'add-new-form'}
              layout="vertical"
              form={form}
              name="add-new-tool"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                isVisible: false,
                commonIcon: '',
                fields: [
                  {
                    characterLimit: '',
                    key: '',
                    name: '',
                    placeholder: '',
                    toolTipText: null,
                    subtitle: null,
                    optional: false,
                  },
                ],
              }}
            >
              <Form.Item
                name="title"
                label="Template Name"
                rules={[{ required: true, message: 'Template Name is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="id" label="Template ID" rules={[{ required: true, message: 'Template ID is required' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Template Description is required' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="categories"
                label="Category"
                rules={[{ required: true, message: 'Template Categorie is required' }]}
              >
                <Select
                  options={categories.map((data) => {
                    return { value: data.id, label: data.name };
                  })}
                />
              </Form.Item>
              <Form.Item
                name="maxToken"
                label="Max Token"
                rules={[{ required: true, message: 'Max Token is required' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="commonIcon" label="Common Icon" rules={[{ required: false }]}>
                <Input style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="templateaccessplan"
                label="Plan"
                rules={[{ required: false, message: 'Tool plan is required' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select plans"
                  options={options}
                />
              </Form.Item>

              <Form.Item name="isVisible" label="Visible to Public">
                <Switch defaultChecked={false} value={false} />
              </Form.Item>

              <Form.List name="fields">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Card
                        key={`row-${index}`}
                        size="small"
                        extra={
                          fields.length > 1 && (
                            <>
                              <MinusCircleOutlined
                                style={{ fontSize: '16px', color: 'red', marginRight: '0.5rem' }}
                                onClick={() => remove(field.name)}
                              />
                              Remove Field
                            </>
                          )
                        }
                      >
                        <Space key={field.key} align="baseline" size={[8, 16]} wrap>
                          <Form.Item
                            {...field}
                            label="Name"
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: 'Name is required' }]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label="Key"
                            name={[field.name, 'key']}
                            fieldKey={[field.fieldKey, 'key']}
                            rules={[{ required: true, message: 'Key is required' }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Character Limit"
                            name={[field.name, 'characterLimit']}
                            fieldKey={[field.fieldKey, 'characterLimit']}
                            rules={[{ required: true, message: 'Character Limit is required' }]}
                          >
                            <InputNumber style={{ width: '200px' }} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Placeholder"
                            name={[field.name, 'placeholder']}
                            fieldKey={[field.fieldKey, 'placeholder']}
                            rules={[{ required: true, message: 'Placeholder is required' }]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Information Text"
                            name={[field.name, 'toolTipText']}
                            fieldKey={[field.fieldKey, 'toolTipText']}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Subtitle"
                            name={[field.name, 'subtitle']}
                            fieldKey={[field.fieldKey, 'subtitle']}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Type"
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[{ required: true, message: 'Type is required' }]}
                          >
                            <Select style={{ width: '200px' }}>
                              <Select.Option value="textarea">Textarea</Select.Option>
                              <Select.Option value="input">Input</Select.Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            label="Field Optional"
                            name={[field.name, 'optional']}
                            fieldKey={[field.fieldKey, 'optional']}
                          >
                            <Switch />
                          </Form.Item>
                        </Space>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({
                            optional: false,
                            toolTipText: null,
                            subtitle: null,
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Fields
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Main>
    </AddNewTemplatesWrapper>
  );
};

export default AddNewTool;
