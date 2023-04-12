/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Pagination } from 'antd';
import OutputBox from '../../components/outputBox';
import { PageHeader } from '../../components/pageHeader';
import { OutputStyled } from '../../styles/pageStyled/outputsStyled';
import OutputModal from '../../components/outputModal';
import { useDispatch, useSelector } from 'react-redux';
import { readDeletedOutputs, readOutputs } from '../../features/output/outputSlice';
import { firebaseAuth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import OutputdropDown from '../../components/outputdropdown';
import { ALL, INPUT_REMOVE_LIST } from '../../utils/constants';
import { breakLineIfRequired, getTemplateNameById } from '../../utils/generateUtils';

const Output = () => {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOutputData, setModalOutputData] = useState();
  const [outputList, setOutputList] = useState([]);
  const [inputsData, setInputsData] = useState();
  const [selectedTemplateId, setSelectedTemplateId] = useState(ALL);
  const { templateList } = useSelector((state) => state.template);

  const [user, loading, error] = useAuthState(firebaseAuth);
  const { outputGenerateData } = useSelector((state) => state.outputs);
  const { selectedProject } = useSelector((state) => state.projects);

  const pageSize = 6;

  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePage = (e) => {
    const selectedPage = e;
    setOffset(selectedPage + 1);
  };
  const [keyword, setKeyword] = useState('');

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    const { projectId } = selectedProject;
    projectId && dispatch(readDeletedOutputs({ uid, projectId }));
  }, [selectedProject, uid]);

  const displayOutput = (selectedOutput) => {
    setModalOutputData(selectedOutput);
    showModal();
  };

  const { uid } = user || { uid: null };

  useEffect(() => {
    const { projectId } = selectedProject;
    projectId && dispatch(readOutputs({ uid, projectId }));
  }, [selectedProject, uid]);

  useEffect(() => {
    const temp = [];
    Array.isArray(outputGenerateData) &&
      outputGenerateData.forEach(
        ({ favourites, outputId, inputs, projectId, time, templateId, outputs: { result, price } }) => {
          result &&
            Array.isArray(result) &&
            result.forEach(({ content, contentId }) => {
              const inputArray = Object.keys(inputs);
              INPUT_REMOVE_LIST.forEach((objectKey) => {
                const index = inputArray.indexOf(objectKey);
                inputArray.splice(index, 1);
              });
              inputArray.map((inputText) => {
                setInputsData(inputs[inputText]);
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
                totalInputs: inputsData,
                content,
                contentId,
              });
            });
        },
      );
    const tempSorted = temp.sort((a, b) => b.time - a.time);
    setOutputList(tempSorted);
  }, [outputGenerateData]);

  return (
    <>
      <PageHeader title="All Outputs" handleChange={handleChange} keyword={keyword} show={true} />
      <OutputdropDown outputsData={outputGenerateData} selectedTemplateId={setSelectedTemplateId} />
      <OutputStyled>
        <Row gutter={[16, 16]}>
          {outputList &&
            Array.isArray(outputList) &&
            outputList
              .filter(({ templateId }) =>
                selectedTemplateId === ALL ? true : templateId.toUpperCase().includes(selectedTemplateId.toUpperCase()),
              )
              .filter(
                (card) =>
                  card.content.toLowerCase().includes(keyword.toLowerCase()) ||
                  card.totalInputs?.toLowerCase().includes(keyword.toLowerCase()),
              )
              .map(
                (
                  { templateId, inputArray, inputs, content, time, contentId, outputId, favourites, totalInputs },
                  index,
                ) => {
                  const templateName = getTemplateNameById({ templateId: templateId, templateList });
                  const { formatContent } = breakLineIfRequired(content);

                  {
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
                  }
                },
              )}
        </Row>
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
              content={modalOutputData.content}
              templateId={modalOutputData.templateId}
              contentId={modalOutputData.contentId}
              outputId={modalOutputData.outputId}
              favourites={modalOutputData.favourites}
              inputArray={modalOutputData.inputArray}
              inputs={modalOutputData.inputs}
              templateName={modalOutputData.templateName}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </Modal>
      </OutputStyled>
    </>
  );
};

export default Output;
