/* eslint-disable react-hooks/exhaustive-deps */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Form, Input, Modal, notification, Radio, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import IconTemplate from '../../assets/iconTemplate';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReadExistingProject,
  selectExistingProject,
  projectActionCUD,
  readProject,
} from '../../features/projects/projectsSlice';
import { ProjectModalStyled, ProjectsStyled } from '../../styles/pageStyled/projectsStyled';
import editImage from '../../assets/edit.png';
import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { projectIdByChar } from '../../utils/generateUtils';
import { CREATE_NEW_PROJECT, DELETE_PROJECT, EDIT_PROJECT, STARTER } from '../../utils/constants';
import ProjectPopover from '../../components/personalProject';
import { NEW_PROJECT_LIMIT } from '../../utils/content';

const { Text } = Typography;
const { TextArea } = Input;

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { authProfile, userData } = useSelector((state) => state.auth);
  const { projectData, selectedProject } = useSelector((state) => state.projects);
  const [projectDetails, setProjectDetails] = useState({ name: null, description: null });
  const [selectedProjectId, setSelectedProjectId] = useState();
  const { planDetails } = useSelector((state) => state.team);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { uid } = authProfile || {};

  useEffect(() => {
    const { projectId } = selectedProject || { projectId: null };
    projectId && setSelectedProjectId(projectId);
  }, [selectedProject]);

  // useEffect(() => {
  //   uid && dispatch(readProject({ uid }));
  //   const projectId = projectIdByChar(5);
  // }, [uid]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    const { name, description } = values;
    const { type, projectId, order } = projectDetails;
    if (type == CREATE_NEW_PROJECT) {
      const projectUniqueId = projectIdByChar(5);
      const newProjectData = { name, description, projectId: projectUniqueId, order: projectData.length + 1 };
      const selectedProjectData = { name, description, projectId: projectUniqueId };
      const updateProject = [...projectData, newProjectData];
      if (projectData.length < planDetails.projects) {
        dispatch(
          projectActionCUD({
            uid,
            updateProject,
            actionType: CREATE_NEW_PROJECT,
            selectedProject: selectedProjectData,
          }),
        );
      } else {
        notification.warning({
          description: NEW_PROJECT_LIMIT,
        });
      }
    } else if (type == EDIT_PROJECT) {
      const editProjectData = { name, description, type, projectId, order };
      const remainingProjects = projectData.filter((data) => data.projectId !== projectId);
      const updateProject = [...remainingProjects, editProjectData];
      dispatch(projectActionCUD({ uid, updateProject, actionType: EDIT_PROJECT }));
    }

    setProjectDetails({ name: null, description: null });
    setIsModalOpen(false);
  };
  const deleteData = ({ projectId }) => {
    const deleteProject = projectData.filter((data) => data.projectId !== projectId);
    dispatch(projectActionCUD({ uid, updateProject: deleteProject, actionType: DELETE_PROJECT }));
  };
  // for search bar use on change function
  const onChangeSearch = (e) => {
    setInputValue(e.target.value);
  };
  const selectedProjectButton = ({ name, description, projectId }) => {
    dispatch(selectExistingProject({ selectedProject: { name, description, projectId } }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const displayNewModals = () => {
    setProjectDetails({ name: '', description: '', type: CREATE_NEW_PROJECT });
  };
  const displayIconModal = ({ name, description, projectId, order }) => {
    setProjectDetails({ name, description, projectId, order, type: EDIT_PROJECT });
  };
  useEffect(() => {
    const { name, description, type } = projectDetails;
    if ((name || description || type === CREATE_NEW_PROJECT) && !isModalOpen) {
      showModal();
      form.setFieldsValue({ name, description });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDetails]);

  const onChangeProject = (e) => {
    setSelectedProjectId(e.target.value);
  };
  return (
    <ProjectsStyled>
      <div>
        <Row wrap>
          <Col xs={24} sm={24} lg={8}>
            <Text className="title"> Projects </Text>
          </Col>
          <Col xs={24} sm={24} lg={16}>
            <div className="project-action-buttons">
              <Space wrap>
                <Input
                  size="medium"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={onChangeSearch}
                  allowClear
                />
                <Button className="header-button">Add collaborators</Button>
                <Button className="header-button" type="primary" onClick={() => displayNewModals()}>
                  New project
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {projectData && Array.isArray(projectData) && projectData.length > 0 ? (
        <Row gutter={[16, 8]}>
          <Radio.Group name="radiogroup" className="radiogroup" onChange={onChangeProject} value={selectedProjectId}>
            {projectData
              // filter the project that name enter in search bar
              .filter((project) => project.name.toLowerCase().includes(inputValue.toLowerCase()))
              .map(({ name, description, projectId, order }) => {
                return (
                  <Col xs={24} sm={24} md={24} lg={10} xl={8} key={projectId}>
                    <div className="new-project-box" key={projectId}>
                      <Row style={{ width: '100%' }}>
                        <Col xs={22} sm={23} md={22}>
                          <Radio
                            value={projectId}
                            onClick={() => selectedProjectButton({ name, description, projectId })}
                          >
                            <div>
                              <Text className="new-project-title">{name}</Text>
                              <br />
                              <Text className="new-project-description">{description}</Text>
                            </div>
                          </Radio>
                        </Col>
                        <Col xs={2} sm={1} md={2}>
                          <div className="project-icons">
                            <Image
                              alt="edit-image"
                              src={editImage}
                              onClick={() => displayIconModal({ name, description, projectId, order })}
                            />
                            {projectData.length !== 1 && selectedProjectId !== projectId && (
                              <TrashIcon
                                onClick={() => deleteData({ projectId })}
                                style={{ color: '#9CA3AF', cursor: 'pointer' }}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                );
              })}
          </Radio.Group>
        </Row>
      ) : (
        <div className="empty">
          <Empty />
        </div>
      )}

      <ProjectModalStyled
        title={projectDetails.type === CREATE_NEW_PROJECT ? 'Create Project' : 'Edit Project'}
        open={isModalOpen}
        closable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel{' '}
          </Button>,
          <Button
            key="Save Project"
            type="primary"
            loading={loading}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleOk(values);
                  form.resetFields();
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            {projectDetails.type === CREATE_NEW_PROJECT ? 'Save' : 'Update'}
          </Button>,
        ]}
      >
        <Text className="description">Projects help you organize your work</Text>
        <Form
          form={form}
          layout="vertical"
          // initialValues={{ name: projectDetails.name, description: projectDetails.description }}
          name="userForm"
        >
          <Form.Item
            className="label"
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'please enter your Project Name',
              },
            ]}
          >
            <Input className="project-name-input" placeholder="Enter a Name" />
          </Form.Item>
          <Form.Item
            className="label"
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'please enter your Project description',
              },
            ]}
          >
            <TextArea size="large" rows={6} placeholder="Add a description" />
          </Form.Item>
        </Form>
      </ProjectModalStyled>
    </ProjectsStyled>
  );
};

export default Projects;
