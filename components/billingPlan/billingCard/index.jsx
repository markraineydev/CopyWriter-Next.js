import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import { ArrowLongRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BillingSubscriptionStyled } from '../styled';
import { capitalizeFirstLetter, numberFormat } from '../../../utils/generateUtils';
import { subscriptionTrials, viewBillingHistoryPlan } from '../../../features/billing/billingSlice';
import { firebaseAuth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  ACTIVE_BILLING_STATUS,
  ACTIVE_Billing_STATUS,
  CANCELED_BILLING_STATUS,
  GET_STARTED_BILLING_PLAN,
  UPGRADE_BILLING_PLAN,
  YEAR,
} from '../../../utils/constants';
const { Text } = Typography;

const SubscriptionCard = ({
  plan,
  price,
  totalWords,

  interval,
  planDetails,
  priceId,
  currentSubscriptionDetails,
}) => {
  const [user] = useAuthState(firebaseAuth);
  const { billingLoading, billingHistoryLoading } = useSelector((state) => state.product);
  const { uid } = user || { uid: null };

  const dispatch = useDispatch();
  const subscriptionPlan = (priceId) => {
    dispatch(subscriptionTrials({ uid, priceId }));
  };
  const upgradePlan = () => {
    dispatch(viewBillingHistoryPlan());
  };

  const { productName, planInterval, priceAmount, currcentPricingPlanId, status } = currentSubscriptionDetails || {
    productName: null,
    planInterval: null,
    priceAmount: null,
    currcentPricingPlanId: null,
    status: null,
  };
  const { yearlyWords, words } = totalWords || { yearlyWords: null, words: null };

  return (
    <BillingSubscriptionStyled>
      <Card
        style={{
          // width: 300,
          height: 740,
          boxShadow: `${'5px 8px 24px 5px rgba(208, 216, 243, 0.6)'}`,
          border: `${
            capitalizeFirstLetter(plan) !== productName ||
            priceAmount !== price * 100 ||
            status !== ACTIVE_BILLING_STATUS
              ? ''
              : '3px solid #186ebe'
          }`,
        }}
      >
        <Row wrap gutter={[24, 24]} className="plan-status-row">
          <Col>
            <Text
              className={
                capitalizeFirstLetter(plan) !== productName ||
                priceAmount !== price * 100 ||
                status !== ACTIVE_BILLING_STATUS
                  ? 'plan-status'
                  : 'subscribe-plan-status'
              }
            >
              {capitalizeFirstLetter(planDetails.planTitle)}
            </Text>
          </Col>
          <Col>
            <Text className="plan-detail">{planDetails.planDesc}</Text>
          </Col>
        </Row>
        <div className="annually-billing">
          <Text className="billing-price">${interval === YEAR ? price / 12 : price}</Text>
          <Text className="billing-status">{'/month'}</Text>
          <div className="billed-annually">{interval === YEAR && `(Billed Annually)`}</div>
        </div>
        <div className="generated-word">
          {planDetails.planTitle === 'Unlimited' ? 'Unlimited words*' : ` ${numberFormat(words)} words per month`}
        </div>

        <Divider />
        <div className="plan-list">
          {planDetails.planList &&
            planDetails.planList.map((data, index) => {
              return (
                <div className="package-status" key={index}>
                  <CheckIcon style={{ width: 20, height: 20, color: `${'green'}` }} />
                  <Text className="inpackage"> {data}</Text>
                </div>
              );
            })}
          {planDetails.notInPlan &&
            planDetails.notInPlan.map((data, index) => {
              return (
                <div className="not-in-used" key={`not-in-used-${index}`}>
                  <XMarkIcon style={{ width: 20, height: 20, color: `${'#6B7280'}` }} />
                  <Text className="not-in-used">{data}</Text>
                </div>
              );
            })}
        </div>
        {currcentPricingPlanId === priceId && status == ACTIVE_BILLING_STATUS && (
          <div className="card-plan-button">
            <div className="current-plan">Current Plan</div>
          </div>
        )}
        {(capitalizeFirstLetter(plan) !== productName || priceAmount !== price * 100 || status === 'canceled') && (
          <div className="card-plan-button">
            <Button
              className="get-started"
              size="large"
              onClick={status === ACTIVE_BILLING_STATUS ? () => upgradePlan() : () => subscriptionPlan(priceId)}
              loading={status === ACTIVE_BILLING_STATUS ? billingHistoryLoading : billingLoading}
            >
              {status === ACTIVE_BILLING_STATUS ? UPGRADE_BILLING_PLAN : GET_STARTED_BILLING_PLAN}
              <ArrowLongRightIcon
                style={{
                  width: 20,
                  height: 20,
                  color: `${
                    capitalizeFirstLetter(plan) !== productName || status === CANCELED_BILLING_STATUS
                      ? '#6B7280'
                      : 'white'
                  }`,
                }}
              />
            </Button>
          </div>
        )}
      </Card>
    </BillingSubscriptionStyled>
  );
};

export default SubscriptionCard;
