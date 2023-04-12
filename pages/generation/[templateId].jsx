/* eslint-disable react-hooks/exhaustive-deps */
import {
  Row,
  Col,
  Input,
  Typography,
  Button,
  Space,
  Skeleton,
  Switch,
  InputNumber,
  Tabs,
  message,
  notification,
  CheckableTag,
  Select,
  Modal,
  Empty,
  Result,
  Tooltip,
  Divider,
} from 'antd';
import React, { useEffect } from 'react';
import { TemplateFormStyled, GenerationStyles } from '../../styles/pageStyled/generationStyled';
import GenerationList from '../../components/generationList';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { isCancel, AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenerationData, generationAPI, TemplateRating } from '../../features/generation/generationSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../../firebase';
import { fetchTemplateOutputs, readOutputs } from '../../features/output/outputSlice';
import { BoltIcon } from '@heroicons/react/24/outline';
import {
  ACTIVE_TEAM_STATUS,
  DEMO,
  DISLIKE,
  HISTORY_OUTPUTS,
  INPUT_REMOVE_LIST,
  LIKE,
  MODAL_TYPE_OWNER,
  MODAL_TYPE_PLAN,
  MODAL_TYPE_WORDS,
  NEW_OUTPUTS,
  STATUS_ACTIVE,
  YEAR,
  MONTH,
} from '../../utils/constants';
import { readTemplates } from '../../features/newTemplates/newTemplatesSlice';
import { getTemplateIcon } from '../../utils/genericFunctions';
import Image from 'next/image';
import { InfoCircleOutlined } from '@ant-design/icons';
import GenerationModal from '../../components/generationIdmodal';
import { fetchTemplateHistory } from '../../features/output/outputAPI';
import {
  HOLD_PLAN_TITLE,
  HOLD_TEAM_MEMBER_DESCRIPTION,
  HOLD_TEAM_STATUS_DESCRIPTION,
  UPGRADE_PLAN,
  UPGRADE_PLAN_DESCRIPTION,
  WORD_LIMIT,
  WORD_LIMIT_DESCRIPTION,
  WORD_LIMIT_FOR_MONTH_DESCRIPTION,
} from '../../utils/content';
import { usageCalculation } from '../../utils/generateUtils';
import moment from 'moment/moment';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const Generations = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [generateOutputs, setGenerateOutputs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usageLimit, setUsageLimits] = useState();
  const [showModal, setShowModal] = useState();
  const [historyOutputs, setHistoryOutputs] = useState([]);
  const [selectedDisplay, setSelectedDisplay] = useState(NEW_OUTPUTS);
  const [numberOutput, setNumberOutput] = useState(2);
  const [allToolsLoading, setAllToolsLoading] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [user] = useAuthState(firebaseAuth);
  const [toolCharacterInput, setToolCharacterInput] = useState();
  const { selectedProject } = useSelector((state) => state.projects);
  const { teamData, planDetails, teamStatus } = useSelector((state) => state.team);
  const {
    currentPlanWordCount,
    planIntervalYearly,
    yearIntervalWord,
    periodStart,
    lastOutputDate,
    yearIntervalIndex,
    resetPlanWords,
  } = useSelector((state) => state.generation);
  const { templateList } = useSelector((state) => state.template);
  const { uid } = user || { uid: null };
  const { teamId, email, plan, currentSubscriptionDetails } = userData;
  const { userPlanDetail } = useSelector((state) => state.product);

  const { status } = currentSubscriptionDetails || { status: null };

  const [messageApi, contextHolder] = message.useMessage();

  const { templateId } = router.query;
  const { projectId } = selectedProject || { projectId: null };

  const { generationData, generationLoading } = useSelector((state) => state.generation);
  const { outputHistoryData } = useSelector((state) => state.outputs);

  let getTemplateDetails = {};

  if (templateId) {
    getTemplateDetails = templateList && templateList.find(({ id }) => id === templateId);
  }
  const [templateBody, setTemplateBody] = useState({
    templateId,
  });

  useEffect(() => {
    templateId && projectId && dispatch(fetchTemplateOutputs({ uid, templateId, projectId }));
  }, [templateId, projectId]);

  useEffect(() => {
    if (generationData) {
      const { outputId, result } = generationData;
      const newGeneratedOutputs =
        result && Array.isArray(result)
          ? result.map((data) => {
              return {
                ...data,
                outputId,
              };
            })
          : [];
      setGenerateOutputs([...newGeneratedOutputs, ...generateOutputs]);
    }
  }, [generationData]);

  // store data in history
  useEffect(() => {
    const tempHistory = [];
    Array.isArray(outputHistoryData) &&
      outputHistoryData.forEach(
        ({ outputId, time, inputs, outputs: { result }, dislikeRating, likeRating, favourites }) => {
          result &&
            Array.isArray(result) &&
            result.forEach((res) => {
              tempHistory.push({
                ...res,
                inputs,
                time,
                outputId,
                dislikeRating,
                likeRating,
                favourites,
              });
            });
        },
      );

    const tempHistorySorted = tempHistory.sort((a, b) => b.time - a.time);
    setHistoryOutputs(tempHistorySorted);
  }, [outputHistoryData]);

  const { title, description, fields, groupId, image, commonIcon, templateaccessplan } = getTemplateDetails || {
    title: '',
    description: '',
    fields: [],
  };

  useEffect(() => {
    const stateFields = {};
    const countStateFields = {};

    if (fields) {
      fields.length > 0 &&
        fields.forEach((field) => {
          if (field.optional !== true) {
            stateFields[field.key] = '';
            countStateFields[field.key] = 0;
          }
        });
      setTemplateBody({
        ...templateBody,
        ...stateFields,
      });
      setToolCharacterInput({
        ...countStateFields,
      });
    }
  }, []);

  useEffect(() => {
    setGenerateOutputs([]);

    setTemplateBody({});
  }, [templateId]);

  const historyInputs = historyOutputs[0]?.inputs.rawInputs;
  useEffect(() => {
    if (templateList && templateList.length > 0 && fields && fields.length > 0) {
      const stateFields = {};

      const countStateFields = {};

      fields.forEach((field) => {
        if (field.optional !== true) {
          stateFields[field.key] = '';
          countStateFields[field.key] = 0;
        }
      });
      setTemplateBody({
        templateId: templateId,
        ...stateFields,
        ...historyInputs,
      });
      setToolCharacterInput({
        ...countStateFields,
      });
    }
  }, [fields, templateId, templateList, historyInputs]);

  const maxLimitExceed = () => {
    let limitCheck = { check: false, inputId: '' };
    fields &&
      fields.length > 0 &&
      toolCharacterInput &&
      fields.forEach((field) => {
        const inputFieldId = field['key'];
        const toolLimit = field['characterLimit'];
        const userTypeCount = toolCharacterInput[inputFieldId];
        if (userTypeCount > toolLimit) {
          limitCheck = { ...limitCheck, check: true, [inputFieldId]: inputFieldId };
        }
      });
    return limitCheck; // return fieldsCharacterCount - totalCharacters;
  };

  const isFormValid = () => {
    return Object.keys(templateBody).every((_key) => {
      const v = templateBody[_key];
      const field = fields && fields.find((f) => f.key === _key);
      const isOptional = field && field?.optional === true;
      return isOptional || (Array.isArray(v) ? true : isNaN(v) ? v.trim().length > 0 : 0);
    });
  };

  useEffect(() => {
    teamData.filter((data) => {
      if (data.email === email) {
        setUsageLimits(data.usage);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlanWordCount]);

  let yearIntervalMillisecond = [];
  let currentIntervalIndex = 0;
  if (periodStart && planIntervalYearly === YEAR) {
    const nextDate = moment(periodStart, 'YYYY-MM-DD');
    const currentDate = moment().format('YYYY-MM-DD');
    const currentDateInMilliSeconds = new Date(currentDate).getTime();
    for (let i = 0; i <= 12; i++) {
      const d = nextDate.clone().add(i, 'month').format('YYYY-MM-DD');
      const milliSecond = new Date(d).getTime();
      yearIntervalMillisecond.push(milliSecond);
    }
    currentIntervalIndex = yearIntervalMillisecond.findIndex((ms) => {
      return ms > currentDateInMilliSeconds;
    });
  }
  const templateAccessPlan = templateaccessplan && templateaccessplan.includes(plan);

  const checkPlan = () => {
    const maxLimit = usageCalculation({ teamMemberEmail: email, teamData, words: planDetails.words });
    let accessGenerate = false;
    let displayModal = null;
    const teamOwnerInfo = teamId === undefined && MODAL_TYPE_OWNER;

    if (templateAccessPlan) {
      if (userData.teamId || userData.teamOwner) {
        if (status == STATUS_ACTIVE || status == null) {
          //this condition is for team owner and team members
          if (planIntervalYearly === MONTH || planIntervalYearly === undefined) {
            if (teamStatus === ACTIVE_TEAM_STATUS) {
              // only team status
              if (usageLimit) {
                if (currentPlanWordCount <= usageLimit || currentPlanWordCount === undefined) {
                  accessGenerate = true;
                } else {
                  setShowModal({
                    modalTitle: WORD_LIMIT,
                    modalDescription: WORD_LIMIT_DESCRIPTION,
                    modalType: teamOwnerInfo,
                  });
                }
              } else {
                if (currentPlanWordCount <= maxLimit || currentPlanWordCount === undefined) {
                  accessGenerate = true;
                } else {
                  setShowModal({
                    modalTitle: WORD_LIMIT,
                    modalDescription: WORD_LIMIT_DESCRIPTION,
                    modalType: teamOwnerInfo,
                  });
                }
              }
            } else {
              setShowModal({
                modalTitle: HOLD_PLAN_TITLE,
                modalDescription: HOLD_TEAM_MEMBER_DESCRIPTION,
                modalType: teamOwnerInfo,
              });
            }
          } else {
            if (yearIntervalWord <= planDetails.words || yearIntervalWord === undefined || resetPlanWords) {
              // resetPlanWords true when we change subscription plan
              accessGenerate = true;
            } else if (yearIntervalIndex !== currentIntervalIndex) {
              accessGenerate = true;
            } else {
              setShowModal({
                modalTitle: WORD_LIMIT,
                modalDescription: WORD_LIMIT_FOR_MONTH_DESCRIPTION,
                modalType: teamOwnerInfo,
              });
            }
          }
        } else {
          setShowModal({
            modalTitle: UPGRADE_PLAN,
            modalDescription: UPGRADE_PLAN_DESCRIPTION,
            modalType: teamOwnerInfo,
          });
        }
      } else {
        if (plan === DEMO) {
          if (currentPlanWordCount === undefined || currentPlanWordCount <= planDetails.words) {
            accessGenerate = true;
          } else {
            setShowModal({
              modalTitle: WORD_LIMIT,
              modalDescription: WORD_LIMIT_DESCRIPTION,
              modalType: MODAL_TYPE_PLAN,
            });
          }
        } else {
          if (status === STATUS_ACTIVE) {
            if (planIntervalYearly === MONTH) {
              if (currentPlanWordCount <= planDetails.words || currentPlanWordCount === undefined || resetPlanWords) {
                accessGenerate = true;
              } else {
                setShowModal({
                  modalTitle: WORD_LIMIT,
                  modalDescription: WORD_LIMIT_DESCRIPTION,
                  modalType: MODAL_TYPE_PLAN,
                });
              }
            } else {
              if (yearIntervalWord <= planDetails.words || yearIntervalWord === undefined || resetPlanWords) {
                accessGenerate = true;
              } else if (yearIntervalIndex !== currentIntervalIndex) {
                accessGenerate = true;
              } else {
                setShowModal({
                  modalTitle: WORD_LIMIT,
                  modalDescription: WORD_LIMIT_FOR_MONTH_DESCRIPTION,
                  modalType: MODAL_TYPE_PLAN,
                });
              }
            }
          } else {
            setShowModal({
              modalTitle: UPGRADE_PLAN,
              modalDescription: UPGRADE_PLAN_DESCRIPTION,
              modalType: MODAL_TYPE_PLAN,
            });
          }
        }
      }
    } else {
      setShowModal({
        modalTitle: HOLD_PLAN_TITLE,
        modalDescription: HOLD_TEAM_MEMBER_DESCRIPTION,
        modalType: MODAL_TYPE_PLAN,
      });
    }

    return accessGenerate;
  };

  const generator = () => {
    setIsModalOpen(true);
    if (!isFormValid()) {
      messageApi.open({
        type: 'warning',
        content: 'All required fields are needed',
      });
    } else {
      if (checkPlan()) {
        setShowModal(false);
        dispatch(
          generationAPI({
            templateBody,
            numOfOutputs: numberOutput,
            projectId: projectId, //selectedProjectId,
          }),
        );
      }
    }
  };

  const onChangeText = (e) => {
    const value = e.target.value;
    let typeCharacters = value.length;
    if (isNaN(value)) {
      typeCharacters = (value || '').trim().length;
    } else {
      typeCharacters = value.length;
    }
    setToolCharacterInput({
      ...toolCharacterInput,
      [e.target.name]: typeCharacters,
    });
    setTemplateBody({
      ...templateBody,
      [e.target.name]: e.target.value,
    });
    maxLimitExceed();
  };

  const onNumberOutputChange = (value) => {
    setNumberOutput(value);
  };

  const onClearInput = () => {
    setTemplateBody({
      templateId: templateId,
    });
  };
  const onOutputClear = () => {
    setGenerateOutputs([]);
  };

  return (
    <>
      {contextHolder}
      {getTemplateDetails !== undefined && (
        <GenerationStyles>
          <Row>
            <Col xs={24} lg={12} className="template-form">
              <TemplateFormStyled>
                <div className="header-container">
                  <Row>
                    <Col xs={10} sm={5} md={4} lg={5}>
                      <div className="image-template">
                        <Image
                          alt={templateId}
                          src={getTemplateIcon(commonIcon || templateId)}
                          height={70}
                          width={70}
                        />
                      </div>
                    </Col>
                    <Col xs={14} sm={19} md={20} lg={19}>
                      <Col>
                        <Text className="template-title">{title}</Text>
                      </Col>
                      <Col xs={0} sm={24}>
                        <div className="detail-wrapper">
                          <Paragraph className="template-description">{description} </Paragraph>
                        </div>
                      </Col>
                    </Col>
                    <Col xs={24} sm={0}>
                      <div className="detail-wrapper">
                        <Paragraph className="template-description">{description} </Paragraph>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="form">
                  <Skeleton loading={allToolsLoading} active title paragraph={{ rows: 6 }}>
                    {fields &&
                      fields.map((field, index) => {
                        return (
                          <div className="field-input" key={`${field.key}-${index}`}>
                            <div className="product-headings">
                              <Text className="field-title">{field.name}</Text>
                              <Text>
                                <span className="optional-staric">{!field.optional && '*'} </span>
                                <span className="optional-text">{field.optional && '(optional)'} </span>
                                {field.toolTipText && (
                                  <Tooltip placement="top" title={field.toolTipText}>
                                    <InfoCircleOutlined
                                      style={{ fontSize: '13px', color: 'gray', cursor: 'pointer' }}
                                    />
                                  </Tooltip>
                                )}
                              </Text>
                              <Text
                                className="field-count"
                                type={
                                  maxLimitExceed().check && maxLimitExceed()[field.key] === field.key
                                    ? 'danger'
                                    : 'secondary'
                                }
                              >
                                {`${toolCharacterInput ? toolCharacterInput[field.key] || 0 : 0}`}/
                                {field.characterLimit}
                              </Text>
                            </div>
                            {field.subtitle && (
                              <div style={{ marginBottom: '1rem' }}>
                                <Text style={{ fontSize: '12px' }}>{field.subtitle}</Text>{' '}
                              </div>
                            )}
                            {field.type === 'input' && (
                              <Input
                                name={field.key}
                                value={templateBody[field.key]}
                                onChange={onChangeText}
                                placeholder={field.placeholder}
                                onPaste={onChangeText}
                              />
                            )}
                            {field.type === 'textarea' && (
                              <TextArea
                                name={field.key}
                                value={templateBody[field.key]}
                                placeholder={(field.placeholder || '').replaceAll('\\n', '\n')}
                                rows={4}
                                onChange={onChangeText}
                                onPaste={onChangeText}
                              />
                            )}
                          </div>
                        );
                      })}
                  </Skeleton>
                </div>

                <div className="number-output">
                  <Row justify="space-between" align="middle" gutter={[16, 16]} className="generate-wrapper">
                    <Col xs={0} sm={12} md={24} lg={12}>
                      <Button className="clear-input" onClick={onClearInput}>
                        Clear Inputs
                      </Button>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12}>
                      <Space className="generate-box">
                        <InputNumber onChange={onNumberOutputChange} min={1} max={10} defaultValue={2} size="large" />
                        <Button
                          disabled={!isFormValid() || maxLimitExceed().check}
                          size="large"
                          loading={generationLoading}
                          type="primary"
                          onClick={generator}
                        >
                          Generate
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </div>
                <Divider />
              </TemplateFormStyled>
            </Col>
            <Col xs={24} lg={12}>
              <div className="genration-box">
                <div className="generation-history">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={18} md={24} lg={18}>
                      <Space>
                        <Button
                          type={selectedDisplay === NEW_OUTPUTS ? 'primary' : 'default'}
                          onClick={() => setSelectedDisplay(NEW_OUTPUTS)}
                        >
                          New Outputs
                        </Button>
                        <Button
                          type={selectedDisplay === HISTORY_OUTPUTS ? 'primary' : 'default'}
                          onClick={() => setSelectedDisplay(HISTORY_OUTPUTS)}
                        >
                          History
                        </Button>
                      </Space>
                    </Col>
                    <Col xs={0} sm={6} md={24} lg={6}>
                      <div className="clear-button">
                        <Button className="generation-clear-button" onClick={onOutputClear}>
                          Clear
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                {selectedDisplay === NEW_OUTPUTS && (
                  <div>
                    {generateOutputs && Array.isArray(generateOutputs) && generateOutputs.length > 0 && (
                      <div className="output-display">
                        {generateOutputs.map(({ outputId, content, time, words, contentId }, index) => {
                          return (
                            <GenerationList
                              newOutput={true}
                              key={index}
                              content={content}
                              words={words}
                              time={time}
                              outputId={outputId}
                              contentId={contentId}
                              templateId={templateId}
                            />
                          );
                        })}
                      </div>
                    )}
                    {generateOutputs && generateOutputs.length === 0 && (
                      <div className="generation-note">
                        <div className="generation-no-box">
                          <div className="no-content-icon">
                            <BoltIcon className="bolt-icon" />
                          </div>
                          <div className="no-content-text">
                            <Text className="text-generation">Answer the prompts</Text>
                            <br></br>
                            <Text className="empty-output-description">
                              Get the best results by trying multiple inputs and of varying lengths.
                            </Text>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {selectedDisplay === HISTORY_OUTPUTS && (
                  <div className="output-display">
                    {historyOutputs.map(
                      ({ content, time, words, contentId, outputId, likeRating, dislikeRating, favourites }, index) => {
                        return (
                          <GenerationList
                            key={index}
                            content={content}
                            words={words}
                            outputId={outputId}
                            time={time}
                            contentId={contentId}
                            favourites={favourites}
                            likeRating={likeRating}
                            dislikeRating={dislikeRating}
                          />
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </Col>
            {/* </HistoryStyles> */}
          </Row>
          {showModal && (
            <GenerationModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              templateAccessPlan={templateAccessPlan}
              status={status}
              modalTitle={showModal.modalTitle}
              modalDescription={showModal.modalDescription}
              modalType={showModal.modalType}
            />
          )}
        </GenerationStyles>
      )}
      {getTemplateDetails === undefined && (
        <Result
          status="404"
          title="Template Not Found"
          subTitle="Sorry, the template you visited does not exist."
          extra={
            <Button type="primary" onClick={() => router.push('../templates')}>
              Back To Template
            </Button>
          }
        />
      )}
    </>
  );
};

export default Generations;
