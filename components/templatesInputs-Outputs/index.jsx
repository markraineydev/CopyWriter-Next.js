import { Card, Col, Empty, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { INPUT_REMOVE_LIST } from '../../utils/constants';
import { getTemplateNameById } from '../../utils/generateUtils';
import GenerationList from '../generationList';
import { TemplatesDetailsStyled } from './styled';

const { Text } = Typography;

const TemplatesInputsAndOutputs = () => {
  const [userOutputArray, setUserOutputArray] = useState([]);
  const [userTemplateArray, setUserTemplateArray] = useState([]);
  const [defaultTemplate, setDefaultTemplate] = useState(false);
  const [backgroudColor, setBackgroundColor] = useState('');
  const { userOutputs } = useSelector((state) => state.userManagement);
  const { templateList } = useSelector((state) => state.template);
  const { outputUserData } = userOutputs;
  useEffect(() => {
    const temp = [];
    Array.isArray(outputUserData) &&
      outputUserData.forEach((res) => {
        const {
          templateId,
          favourites,
          outputId,
          inputs,
          projectId,
          outputs: { result },
        } = res;
        result &&
          Array.isArray(result) &&
          result.forEach((res) => {
            //for adding product description inside a modal
            const inputArray = Object.keys(inputs);
            temp.push({ ...res, inputs, templateId, outputId, favourites, projectId, inputArray });
          });
      });
    const tempSorted = temp.sort((a, b) => b.time - a.time);
    setUserOutputArray(tempSorted);
  }, [outputUserData]);

  const generateButton = (outputId) => {
    setDefaultTemplate(true);
    const filterList = userOutputArray.filter((data) => {
      return data.outputId === outputId;
    });
    outputUserData.find((data) => {
      if (data.outputId === outputId) {
        setBackgroundColor(outputId);
      }
    });
    setUserTemplateArray(filterList);
  };

  return (
    <TemplatesDetailsStyled>
      {outputUserData && outputUserData.length === 0 && <Empty />}
      <Row gutter={[16, 16]}>
        {/* <div className="output-template"> */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <div className="output-status">
            {outputUserData &&
              outputUserData.map(({ inputs, outputId, outputs, templateId }, index) => {
                const inputArray = Object.keys(inputs);
                INPUT_REMOVE_LIST.forEach((objectKey) => {
                  const index = inputArray.indexOf(objectKey);
                  inputArray.splice(index, 1);
                });

                const outputDetails = [];
                outputDetails.push();
                const outputArray = Object.keys(outputs);
                const removeOutputList = ['result'];
                removeOutputList.forEach((objectKey) => {
                  const index = outputArray.indexOf(objectKey);
                  outputArray.splice(index, 1);
                });
                const templateName = getTemplateNameById({ templateId, templateList });

                return (
                  <Card
                    key={`card-${index}`}
                    style={{
                      marginBottom: '20px',
                      background: backgroudColor === outputId ? '#FAFAFA' : '',
                    }}
                    onClick={() => generateButton(outputId)}
                  >
                    <div key={`outputArray-${index}`} className="text">
                      <Text className="status-text">Template Name</Text>
                      <Text className={backgroudColor === outputId ? '' : 'status-desc'}>{templateName}</Text>
                    </div>
                    {inputArray &&
                      inputArray.map((inputText, index) => {
                        return (
                          <div key={`input-${index}`} className="text">
                            <Text className="status-text">{inputText}</Text>
                            <Text className={backgroudColor === outputId ? '' : 'status-desc'}>
                              {inputs[inputText]}
                            </Text>
                          </div>
                        );
                      })}

                    {outputArray &&
                      outputArray.map((inputText, index) => {
                        return (
                          <div key={`outputArray-${index}`} className="text">
                            <Text className="status-text">{inputText}</Text>
                            <Text className={backgroudColor === outputId ? '' : 'status-desc'}>
                              {outputs[inputText]}
                            </Text>
                          </div>
                        );
                      })}
                  </Card>
                );
              })}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={14}>
          <div className="template-data">
            {defaultTemplate
              ? userTemplateArray &&
                userTemplateArray.map((data, index) => {
                  // console.log('userTemplateArray', userTemplateArray);
                  return (
                    <GenerationList
                      adminView
                      key={`GenerationList-${index}`}
                      content={data.content}
                      words={data.words}
                      time={data.time}
                      index={data.index}
                      favourites={data.favourites}
                      contentId={data.contentId}
                    />
                  );
                })
              : userOutputArray &&
                userOutputArray.map((data, index) => {
                  return (
                    <GenerationList
                      adminView
                      key={`userOutputArray-${index}`}
                      content={data.content}
                      words={data.words}
                      time={data.time}
                      index={data.index}
                      favourites={data.favourites}
                    />
                  );
                })}
          </div>
        </Col>
        {/* </div> */}
      </Row>
    </TemplatesDetailsStyled>
  );
};

export default TemplatesInputsAndOutputs;
