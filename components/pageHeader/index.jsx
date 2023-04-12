import { Input, Col, Row, Typography } from 'antd';
import { SearchOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { PageHeaderStyled, RightPanelStyled } from './styled';
import IconTemplate from '../../assets/iconTemplate';
import IconMenu from '../../assets/iconMenu';
import { GRID_VIEW, LIST_VIEW } from '../../utils/constants';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

const { Text } = Typography;

export const PageHeader = ({ type, onViewClick, page, title, handleChange, keyword, show }) => {
  return (
    <>
      <PageHeaderStyled>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 15 }} md={{ span: 10 }}>
            <Text className="title"> {title}</Text>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 14 }} lg={{ span: 9 }}>
            <RightPanelStyled>
              {page == 'template' ? (
                <>
                  <div className={type === LIST_VIEW ? 'icon_store' : 'icon'} onClick={() => onViewClick(LIST_VIEW)}>
                    <IconMenu />
                  </div>
                  <div className={type === GRID_VIEW ? 'icon_store' : 'icon'} onClick={() => onViewClick(GRID_VIEW)}>
                    <Squares2X2Icon style={{ width: 20, height: 20, color: '#6B7280' }} />
                  </div>
                </>
              ) : (
                ''
              )}
              {show && (
                <Input
                  size="large"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  value={keyword}
                  onChange={handleChange}
                  allowClear
                />
              )}
            </RightPanelStyled>
          </Col>
        </Row>
      </PageHeaderStyled>
    </>
  );
};
