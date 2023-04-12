import React from 'react';
import { RecentDocStyled } from './styled';
import { Col, Empty, Modal, Row } from 'antd';
import OutputBox from '../../outputBox';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { breakLineIfRequired, getTemplateNameById } from '../../../utils/generateUtils';
import OutputModal from '../../outputModal';
import { RECENTLY_GENERATED } from '../../../utils/constants';

const RecentGenerationCard = ({ dashboardOutput }) => {
  const { templateList } = useSelector((state) => state.template);
  const [recentGeneratedModal, setRecentGeneratedModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const displayOutput = (selectedOutput) => {
    setRecentGeneratedModal(selectedOutput);
    showModal();
  };

  return (
    <RecentDocStyled>
      <div className="recent-box">
        <div className="generation-card">{RECENTLY_GENERATED}</div>
        <div className="Card-data">
          {dashboardOutput && dashboardOutput.length === 0 && <Empty />}
          <Row gutter={[8, 6]}>
            {dashboardOutput &&
              Array.isArray(dashboardOutput) &&
              dashboardOutput
                .slice(0, 4)
                .map(
                  (
                    { templateId, inputArray, inputs, content, time, contentId, outputId, favourites, totalInputs },
                    index,
                  ) => {
                    const templateName = getTemplateNameById({ templateList, templateId });
                    const { formatContent } = breakLineIfRequired(content);
                    return (
                      <Col xs={24} sm={24} md={12} key={`generatedCard-${index}`}>
                        <OutputBox
                          templateName={templateName}
                          inputs={inputs}
                          content={content}
                          time={time}
                          onClickModal={() =>
                            displayOutput({
                              content: content,
                              templateId,
                              time,
                              contentId,
                              outputId,
                              favourites,
                              totalInputs,
                              templateName,
                              inputs,
                              inputArray,
                            })
                          }
                          contentId={contentId}
                          outputId={outputId}
                          favourites={favourites}
                        />
                      </Col>
                    );
                  },
                )}
          </Row>
        </div>
      </div>

      <Modal
        title=""
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
      >
        {recentGeneratedModal && (
          <OutputModal
            content={recentGeneratedModal.content}
            templateId={recentGeneratedModal.templateId}
            contentId={recentGeneratedModal.contentId}
            outputId={recentGeneratedModal.outputId}
            favourites={recentGeneratedModal.favourites}
            inputArray={recentGeneratedModal.inputArray}
            inputs={recentGeneratedModal.inputs}
            templateName={recentGeneratedModal.templateName}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </RecentDocStyled>
  );
};

export default RecentGenerationCard;
