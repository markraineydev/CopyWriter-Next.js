import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Result, Row, Typography } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BillingPlan from '../../components/billingPlan';
import { PageHeader } from '../../components/pageHeader';
import { viewBillingHistoryPlan } from '../../features/billing/billingSlice';
import { BillingPageStyled, BillingStyled } from '../../styles/pageStyled/billingStyled';
import {
  ACTIVE_BILLING_STATUS,
  DEMO,
  EXPIRED_NEXT_MONTH,
  MONTHLY,
  ROLE_OWNER,
  STATUS_ACTIVE,
  YEAR,
  YEARLY,
} from '../../utils/constants';
import { TEAM_MEMBER_NO_ACCESS } from '../../utils/content';
import { capitalizeFirstLetter, numberFormat } from '../../utils/generateUtils';
const { Text } = Typography;

const Billing = () => {
  const { userPlanDetail, billingHistoryLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { planDetails, teamData } = useSelector((state) => state.team);
  const { plan, currentSubscriptionDetails, teamId } = userData;
  const { currentPlanWordCount } = useSelector((state) => state.generation);

  const { productName, status, planInterval, currentPeriodWillEnds } = currentSubscriptionDetails || {
    productName: null,
    status: null,
    planInterval: null,
  };

  const billingHistory = () => {
    dispatch(viewBillingHistoryPlan());
  };
  const { words, yearlyWords } = planDetails;
  const findOwner = teamData && teamData.find((data) => data.role === ROLE_OWNER);

  const currentPlanPeriod = () => {
    let displayStatus = capitalizeFirstLetter(status);
    if (plan === DEMO) {
      displayStatus = ACTIVE_BILLING_STATUS;
    } else {
      if (currentPeriodWillEnds) {
        displayStatus = EXPIRED_NEXT_MONTH;
      }
    }
    return displayStatus;
  };

  const interval = planInterval === YEAR ? YEARLY : MONTHLY;

  return (
    <>
      <PageHeader title="Billing" />
      {teamId ? (
        <Result title={TEAM_MEMBER_NO_ACCESS({ findOwner, page: 'Billing' })} />
      ) : (
        <BillingPageStyled>
          <BillingStyled>
            <div className="credit">
              <Text className="available-credits">Available credits</Text>
            </div>
            <div className="credit">
              <Row wrap gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                  <Card>
                    <Col>
                      <Row wrap gutter={[8, 8]}>
                        <Col>
                          <Text className="credits-title">
                            Total credits : {planInterval === YEAR ? numberFormat(yearlyWords) : numberFormat(words)}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Text className="credits-desc" strong>
                        Credits used : {currentPlanWordCount ? numberFormat(currentPlanWordCount) : '0'}
                      </Text>
                    </Col>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                  <Card>
                    <Col>
                      <Row wrap gutter={[8, 8]}>
                        <Col>
                          <Text className="credits-title">
                            Plan :{' '}
                            {productName && status === STATUS_ACTIVE
                              ? `${productName} / ${capitalizeFirstLetter(interval)}`
                              : capitalizeFirstLetter(DEMO)}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Text className="credits-desc" strong>
                        {`Status : ${capitalizeFirstLetter(currentPlanPeriod())}`}
                      </Text>
                    </Col>
                  </Card>
                </Col>
              </Row>
            </div>
            {productName !== null && status === 'active' && (
              <div className="credit">
                <Card>
                  <Row>
                    <Col xs={24} sm={15} md={15} lg={20}>
                      <Col>
                        <Text className="credits-title">Billing Portal</Text>
                      </Col>
                      <Col>
                        <Text className="credits-desc">View your payment history</Text>
                      </Col>
                    </Col>
                    <Col xs={24} sm={4} md={9} lg={4}>
                      <Button loading={billingHistoryLoading} onClick={() => billingHistory()}>
                        View billing Portal
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </BillingStyled>
          <BillingPlan currentSubscriptionDetails={currentSubscriptionDetails} />
        </BillingPageStyled>
      )}
    </>
  );
};

export default Billing;
