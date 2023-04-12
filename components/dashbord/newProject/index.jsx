import React, { useState, useEffect } from 'react';
import { NewProjectStyled } from './styled';
import { Col, Empty, Row, Typography } from 'antd';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { countBy, getTemplateIcon } from '../../../utils/genericFunctions';
import { useRouter } from 'next/router';
import { MOST_USED_TEMPLATES } from '../../../utils/constants';

const { Text } = Typography;

const MostUsedTemplates = ({ totalTemplatesGenerate }) => {
  const router = useRouter();
  const { templateList } = useSelector((state) => state.template);
  const [topTemplates, setTopTemplates] = useState([]);

  useEffect(() => {
    const countObject = countBy(totalTemplatesGenerate, 'templateId');
    const sortTemplates = Object.keys(countObject).sort(function (a, b) {
      return countObject[b] - countObject[a];
    });
    const topMostTemplates = sortTemplates.splice(0, 3).map((templateId) => {
      return templateList.find(({ id }) => templateId === id);
    });
    setTopTemplates(topMostTemplates);
  }, [templateList, totalTemplatesGenerate]);

  const onTemplateClick = ({ generationId }) => {
    router.push(`/generation/${generationId}`);
  };

  return (
    <NewProjectStyled>
      <div className="project-box">
        <div className="project-title">
          <div className="project-info">{MOST_USED_TEMPLATES}</div>
          <div className="description">Select one of your most used templates below!</div>
        </div>
        <div>
          {topTemplates.length == 0 && <Empty />}

          {topTemplates.map(({ id, title, description, commonIcon }, index) => {
            return (
              <div
                className="project-detail-box"
                key={`template-${index}`}
                onClick={() => onTemplateClick({ generationId: id })}
              >
                <Row>
                  <Col xs={24} md={2}>
                    <Image alt="project" src={getTemplateIcon(commonIcon || id)} height={50} width={50} />
                  </Col>
                  <Col xs={24} md={22}>
                    <div className={!commonIcon ? 'project-detail' : 'project-commom-icon'}>
                      <div>
                        <Text className="project-title-name">{title}</Text>
                        <br />
                        <Text className="project-description">{description}</Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    </NewProjectStyled>
  );
};

export default MostUsedTemplates;
