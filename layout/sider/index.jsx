import React, { useEffect, useState } from 'react';
import { Grid, Col, Divider, Layout, Menu, Row, Typography, Popover } from 'antd';
import Image from 'next/image';
import Avatar from 'boring-avatars';
import { CircleStackIcon, LifebuoyIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

import { siderData } from './siderData';
import { PopoverContentDesign, PopoverTitleDesign, SiderStyled } from './styled';
import logoImage from '../../assets/logo.png';
import logoSmallImage from '../../assets/logoSmall.png';
import feedbackImage from '../../assets/feedback.png';

import { useSelector } from 'react-redux';
import { Cog8ToothIcon, ChevronUpDownIcon, ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { Logout } from '../../components/logout/logout';

import ProjectPopover from '../../components/personalProject';
import { ADMIN, SIDER_MAIN, SIDER_SETTING } from '../../utils/constants';
import { capitalizeFirstLetter } from '../../utils/generateUtils';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const AppSider = () => {
  const { userData } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const { selectedProject } = useSelector((state) => state.projects);
  const [siderType, setSiderType] = useState(SIDER_MAIN);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleProjectChange = (newOpen) => {
    setOpenProject(newOpen);
  };
  const { displayName, authority } = userData;
  const router = useRouter();
  const screens = useBreakpoint();

  const onProjectClick = () => {
    router.push('../projects');
  };
  const feedback = () => {
    // router.push('../feedBack');
    window.open('https://CopyWriter.canny.io/', '_blank');
  };
  const inteCom = () => {
    window.Intercom('show');
  };
  const onSettingClick = () => {
    setSiderType(SIDER_SETTING);
  };
  const onBackClick = () => {
    router.push('../dashboard');
    setSiderType(SIDER_MAIN);
  };
  // useEffect(() => {
  //   const { projectId } = selectedProject || { projectId: null };
  //   projectId && setSelectedProjectId(projectId);
  // }, [selectedProject]);
  const { name } = selectedProject || { selectedProject: null };

  const popOverPosition = (screens.xs === true || screens.sm === true) && screens.md === false ? 'topLeft' : 'top';
  // for user authority
  const sideDataAuthority = siderData.filter(
    (sider) => sider.authority[0] === authority && sider.type.toLowerCase().includes(siderType.toLowerCase()),
  );
  //for admin authority
  const filterSideData = siderData.filter((sider) => sider.type.toLowerCase().includes(siderType.toLowerCase()));
  const title = () => {
    return (
      <PopoverTitleDesign>
        <Avatar
          shape="circle"
          name={displayName}
          variant="beam"
          size={40}
          colors={['#186ebe', '#C20D90', '#F0AB3D', '#C271B4', '#0C8F8F']}
        />
        <Text className="user-name"> {capitalizeFirstLetter(displayName)}</Text>
      </PopoverTitleDesign>
    );
  };
  const content = (
    <PopoverContentDesign>
      <div className="actions" onClick={hide}>
        <Logout showIcon={true} />
      </div>
    </PopoverContentDesign>
  );
  const projectInfo = <ProjectPopover onProjectClick={onProjectClick} selectedProject={selectedProject} />;

  return (
    <SiderStyled theme="light" width={256} breakpoint="md" collapsedWidth="70" onBreakpoint={(broken) => {}}>
      <div className="logo">
        <Row gutter={16}>
          <Col xs={24} md={0}>
            <Image
              width={50}
              height={30}
              src={logoSmallImage}
              alt="logo"
              priority // lazy ,eager
            />
          </Col>
          <Col xs={0} sm={0} md={24}>
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
      {siderType === SIDER_SETTING ? (
        <>
          <div className="sider-goback-button" onClick={onBackClick}>
            <ArrowLongLeftIcon style={{ width: 20, height: 20, color: '#111827' }} />
            Go Back
          </div>
        </>
      ) : (
        ''
      )}
      <Menu
        theme="light"
        mode="inline"
        on
        items={authority === ADMIN ? filterSideData : sideDataAuthority}
        defaultOpenKeys={['settings']}
      />

      {siderType === SIDER_MAIN && (
        <div className="sider-bottom">
          <div className="feedback">
            <Row gutter={16} align="middle">
              <Col xs={24} md={0}>
                <div className="mobile-icon" onClick={() => inteCom()}>
                  <LifebuoyIcon style={{ width: 20, height: 20, color: 'gray', cursor: 'pointer' }} />
                </div>
              </Col>
              <Col xs={0} sm={0} md={24}>
                <div className="feedback-iconText" onClick={() => inteCom()}>
                  <LifebuoyIcon style={{ width: 20, height: 20, color: 'gray', cursor: 'pointer' }} />
                  <Text className="feedback-text"> Help</Text>
                </div>
              </Col>
            </Row>
          </div>
          <div className="feedback">
            <Row gutter={16} align="middle">
              <Col xs={24} md={0}>
                <div className="mobile-icon" onClick={() => feedback()}>
                  <Image
                    src={feedbackImage}
                    alt="feedback"
                    priority // lazy ,eager
                  />
                </div>
              </Col>
              <Col xs={0} sm={0} md={24}>
                <div className="feedback-iconText" onClick={() => feedback()}>
                  <Image
                    src={feedbackImage}
                    alt="feedback"
                    priority // lazy ,eager
                  />
                  <Text className="feedback-text"> Feedback</Text>
                </div>
              </Col>
            </Row>
          </div>

          <Row gutter={16}>
            <Col sm={24} md={0}>
              <div className="mobile-icon" onClick={onProjectClick}>
                <CircleStackIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />
              </div>
              <div className="mobile-icon" onClick={onSettingClick}>
                <Cog8ToothIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />
              </div>
            </Col>
            <Col xs={0} sm={0} md={24}>
              <Popover
                overlayClassName="popover-design"
                placement={popOverPosition}
                // title={() => title(displayName)}
                content={projectInfo}
                trigger="click"
                open={openProject}
                onOpenChange={handleProjectChange}
              >
                <div className="project-display">
                  <div className="project-type">
                    <Text className="title">PROJECTS</Text>
                    <br />
                    <Text className="type">{name}</Text>
                  </div>
                  <div className="feedback-icon">
                    <ChevronUpDownIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />
                  </div>
                </div>
              </Popover>
            </Col>
          </Row>

          <Divider className="divider" />
          <div className="user-details">
            <Popover
              overlayClassName="popover-design"
              placement={popOverPosition}
              title={() => title(capitalizeFirstLetter(displayName))}
              content={content}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div className="sidebar-avatar">
                <Avatar
                  shape="circle"
                  name={capitalizeFirstLetter(displayName) || ''}
                  variant="beam"
                  size={50}
                  colors={['#186ebe', '#C20D90', '#F0AB3D', '#C271B4', '#0C8F8F']}
                />
                <Text className="user-name"> {capitalizeFirstLetter(displayName) || ' '}</Text>
              </div>
            </Popover>
            <div className="setting-icon" onClick={onSettingClick}>
              <Cog8ToothIcon style={{ width: 20, height: 20, color: '#9CA3AF' }} />
            </div>
          </div>
        </div>
      )}
    </SiderStyled>
  );
};
export default AppSider;
