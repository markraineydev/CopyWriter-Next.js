import { Col, Empty, Modal, Row, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OutputStyled } from '../../styles/pageStyled/outputsStyled';
import { ALL, INPUT_REMOVE_LIST } from '../../utils/constants';
import { breakLineIfRequired, getTemplateNameById } from '../../utils/generateUtils';
import OutputBox from '../outputBox';
import OutputdropDown from '../outputdropdown';
import OutputModal from '../outputModal';
import { PageHeader } from '../pageHeader';

function DeletedOutputsPage({ projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalOutputData, setModalOutputData] = useState();
  const [outputDeletedArray, setOutputDeletedArray] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const { outputsDeletdData } = useSelector((state) => state.outputs);
  const { templateList } = useSelector((state) => state.template);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const displayOutput = (output) => {
    setModalOutputData(output);
    showModal();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [keyword, setKeyword] = useState('');

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    const temp = [];
    Array.isArray(outputsDeletdData) &&
      outputsDeletdData.forEach(
        ({ favourites, outputId, inputs, projectId, time, templateId, outputs: { result, price } }) => {
          result &&
            Array.isArray(result) &&
            result.forEach(({ content, contentId }) => {
              const inputArray = Object.keys(inputs);
              INPUT_REMOVE_LIST.forEach((objectKey) => {
                const index = inputArray.indexOf(objectKey);
                inputArray.splice(index, 1);
              });
              const inputsField = inputArray.map((inputText) => {
                return inputs[inputText];
              });
              temp.push({
                inputs,
                inputArray,
                outputId,
                favourites,
                result,
                projectId,
                time,
                templateId,
                price,
                totalInputs: inputsField,
                content,
                contentId,
              });
            });
        },
      );
    const tempSorted = temp.sort((a, b) => b.time - a.time);
    setOutputDeletedArray(tempSorted);
  }, [outputsDeletdData]);
  return (
    <>
      <PageHeader title="Deleted outputs" handleChange={handleChange} keyword={keyword} show={true} />
      <OutputdropDown outputsData={outputDeletedArray} selectedTemplateId={setSelectedTemplateId} />
      <OutputStyled>
        <Row gutter={[16, 16]}>
          {outputDeletedArray &&
            outputDeletedArray
              .filter(({ templateId }) =>
                selectedTemplateId === ALL ? true : templateId.toUpperCase().includes(selectedTemplateId.toUpperCase()),
              )
              .filter(
                (card) => card.content.toLowerCase().includes(keyword.toLowerCase()),
                // card.totalInputs?.toLowerCase().includes(keyword.toLowerCase()),
              )
              .map(
                (
                  { templateId, inputArray, inputs, content, time, contentId, outputId, favourites, totalInputs },
                  index,
                ) => {
                  const templateName = getTemplateNameById({ templateId, templateList });
                  const { formatContent } = breakLineIfRequired(content);

                  return (
                    <Col xs={24} sm={24} md={10} lg={8} key={index}>
                      <OutputBox
                        key={index}
                        templateName={templateName}
                        content={content}
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
                        time={time}
                        contentId={contentId}
                        outputId={outputId}
                        favourites={favourites}
                      />
                    </Col>
                  );
                },
              )}
        </Row>

        {outputDeletedArray && outputDeletedArray.length === 0 && <Empty />}
        <Modal
          title=""
          width={700}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          footer={null}
        >
          {modalOutputData && (
            <OutputModal
              hideActions={true}
              inputs={modalOutputData.inputs}
              inputArray={modalOutputData.inputArray}
              content={modalOutputData.content}
              title={modalOutputData.title}
              contentId={modalOutputData.contentId}
              favourites={modalOutputData.favourites}
              outputId={modalOutputData.outputId}
              toolName={modalOutputData.toolName}
              time={modalOutputData.time}
              uid={modalOutputData.uid}
              projectId={modalOutputData.projectId}
              outputs={modalOutputData.outputs}
              price={modalOutputData.price}
              totalWords={modalOutputData.totalWords}
              totalTokens={modalOutputData.totalTokens}
              templateName={modalOutputData.templateName}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </Modal>
      </OutputStyled>
    </>
  );
}

export default DeletedOutputsPage;
