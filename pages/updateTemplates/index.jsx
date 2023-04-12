import { TemplateListBox, Main, UpdateTemplatesWrapper } from '../../styles/pageStyled/updatetemplatesStyled';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, InputNumber, Form, Input, Button, Modal, Space, Switch, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/pageHeader';
import { deleteTemplateData, newTemplateData, readTemplates } from '../../features/newTemplates/newTemplatesSlice';
import { DEMO, PRO, UNLIMITED, STARTER } from '../../utils/constants';
import { categories } from '../../utils/TemplateData';
import { DELETED_TEMPLATE_TITLE, TEMPLATE_DELETE_DESCRIPTION } from '../../utils/content';

const { Search, TextArea } = Input;
const { Text } = Typography;
const { confirm } = Modal;

const UpdateTemplates = () => {
  // const { allTools } = useSelector((store) => store.adminFeatures);
  const { templateList } = useSelector((state) => state.template);
  const [selectedTool, setSelectedTool] = useState();
  const [displayToolList, setDisplayToolList] = useState([]);
  const [displayTemplateData, setDisplayTemplateData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [allToolGroups, setAllToolGroups] = useState([]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values', values);
    const toolFields = { ...displayTemplateData, ...values };
    const { id } = toolFields;
    dispatch(newTemplateData({ id, toolFields }));
  };

  useEffect(() => {
    if (searchValue !== '') {
      const searchedList =
        templateList &&
        templateList.filter(({ title }) => title && title.toLowerCase().includes(searchValue.toLowerCase()));
      setDisplayToolList(searchedList);
    } else {
      templateList && setDisplayToolList([...templateList]);
    }
  }, [searchValue, templateList]);

  const handleChange = (e, data) => {
    setSelectedTool(data.id);
    setDisplayTemplateData(data);
    e.preventDefault();
  };
  const tagsColor = ['success', 'primary', 'info', 'warning', 'danger'];

  const onSearch = (value) => {
    setSearchValue(value);
  };
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      commonIcon: null,
    });
    Object.keys(displayTemplateData).forEach((data) => {
      form.setFieldsValue({
        [data]: displayTemplateData[data],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTemplateData]);

  const showDeleteConfirm = () => {
    confirm({
      title: DELETED_TEMPLATE_TITLE({ templateName: displayTemplateData.title }),
      icon: <ExclamationCircleOutlined />,
      content: TEMPLATE_DELETE_DESCRIPTION,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteTemplateData({ id: displayTemplateData.id }));
        setDisplayTemplateData([]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const options = [
    { label: 'Demo', value: DEMO },
    { label: 'Starter', value: STARTER },
    { label: 'Pro', value: PRO },
    { label: 'Unlimited', value: UNLIMITED },
  ];
  return (
    <UpdateTemplatesWrapper>
      <PageHeader title="Update Templates" />
      <Main>
        <Row gutter={16}>
          <Col sm={24} md={24} lg={9} xl={6}>
            <Search
              allowClear
              onChange={onSearchChange}
              placeholder="Search Tool"
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
            <TemplateListBox>
              <Card className="templates-list-card">
                <ul>
                  {displayToolList && displayToolList.length ? (
                    displayToolList.map((data, index) => {
                      const { id, title } = data;
                      return (
                        <li key={index} className="list">
                          <div
                            className={`${selectedTool === id && 'active'}  ${tagsColor[index]}`}
                            onClick={(e) => {
                              handleChange(e, data);
                            }}
                            to="#"
                          >
                            {title}
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <Col md={24}>
                      <Text>Data Not Found!</Text>
                    </Col>
                  )}
                </ul>
              </Card>
            </TemplateListBox>
          </Col>

          <Col sm={24} md={24} lg={15} xl={18}>
            <div style={{ float: 'right' }}>
              <Space>
                <Button
                  disabled={!displayTemplateData.id}
                  loading={loading}
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
                <Button disabled={!displayTemplateData.id} onClick={showDeleteConfirm}>
                  Delete Tool{' '}
                </Button>
              </Space>
            </div>
            <br />
            <br />
            <Form
              className={'add-new-form'}
              layout="vertical"
              form={form}
              name="add-new-tool"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item name="id" label="Template ID" rules={[{ required: true, message: 'Template ID is required' }]}>
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="title"
                label="Template Name"
                rules={[{ required: true, message: 'Template Name is required' }]}
              >
                <Input disabled={!displayTemplateData.id} />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Tool Description is required' }]}
              >
                <Input.TextArea disabled={!displayTemplateData.id} />
              </Form.Item>

              <Form.Item name="maxToken" label="Max Token" rules={[{ required: false }]}>
                <InputNumber disabled={!displayTemplateData.id} style={{ width: '100%' }} />
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

              <Form.Item name="commonIcon" label="Common Icon" rules={[{ required: false }]}>
                <Input />
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

              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="isVisible"
                    label="Visible to Public"
                    valuePropName={form.getFieldValue('isVisible') ? 'checked' : 'unchecked' || 'unchecked'}
                  >
                    <Switch disabled={!displayTemplateData.id} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.List name="fields">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => {
                      return (
                        <Card
                          key={field.key}
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
                              <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              label="Information Text"
                              name={[field.name, 'toolTipText']}
                              fieldKey={[field.fieldKey, 'toolTipText']}
                            >
                              <Input />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              label="Subtitle"
                              name={[field.name, 'subtitle']}
                              fieldKey={[field.fieldKey, 'subtitle']}
                            >
                              <TextArea rows={3} />
                            </Form.Item>

                            <Form.Item
                              label="Type"
                              name={[field.name, 'type']}
                              fieldKey={[field.fieldKey, 'type']}
                              rules={[{ required: true, message: 'Type is required' }]}
                            >
                              <Select style={{ width: '400px' }}>
                                <Select.Option value="textarea">Textarea</Select.Option>
                                <Select.Option value="input">Input</Select.Option>
                                <Select.Option value="slider">Slider</Select.Option>
                                <Select.Option value="radio">Toggle</Select.Option>

                                {/* {allToolGroups &&
                                  allToolGroups.length > 0 &&
                                  allToolGroups
                                    .filter(({ type }) => type === 'tool-group-fields')
                                    .map(({ groupName }) => {
                                      return (
                                        <Select.Option value={`generic-options@${groupName}`}>
                                          {groupName}
                                        </Select.Option>
                                      );
                                    })} */}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              label="Field Optional"
                              name={[field.name, 'optional']}
                              fieldKey={[field.fieldKey, 'optional']}
                              valuePropName={
                                form.getFieldValue(fields[index].optional) ? 'checked' : 'unchecked' || 'unchecked'
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </Space>
                        </Card>
                      );
                    })}
                    <Form.Item>
                      <Button
                        disabled={!displayTemplateData.id}
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
                <Button disabled={!displayTemplateData.id} loading={loading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Main>
    </UpdateTemplatesWrapper>
  );
};

export default UpdateTemplates;
