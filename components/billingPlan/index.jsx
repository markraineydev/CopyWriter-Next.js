import { Col, Row, Select, Typography } from 'antd';
import React from 'react';
import { BillingDropDownStyled, CardStyled } from './styled';
import SubscriptionCard from './billingCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { MONTH, YEAR } from '../../utils/constants';
import { SAVE_ANNUAL_BILLING } from '../../utils/content';

const { Text } = Typography;

const BillingPlan = ({ currentSubscriptionDetails }) => {
  const [subscriptionPlanInterval, setSubscriptionPlanInterval] = useState(MONTH);
  const { productInfo, subscriptionPlanData, userPlanDetail } = useSelector((state) => state.product);
  const { userPlan } = useSelector((state) => state.userManagement);

  const SubscriptionDetails = [
    {
      ID: 'starter',
      planTitle: 'Starter',
      planDesc: 'For Getting Started',
      desc: 'Access to all base template. write short-term content like product description ,single pragraphs and much more',
      key: 1,
      planList: ['50+ AI Templates', 'Supporting for over 20 language', 'up to 10 users', 'support chat'],
      notInPlan: ['Compose & Command feature', 'google support style editor'],
    },
    {
      ID: 'pro',
      planTitle: 'Pro',
      planDesc: 'Most Popular Plan',
      desc: 'Access to all base template. write short-term content like product description ,single pragraphs and much more',
      key: 2,
      planList: ['50+ AI Templates', 'Supporting for over 20 language', 'up to 10 users', 'support chat'],
      notInPlan: ['Compose & Command feature', 'google support style editor'],
    },
    {
      ID: 'unlimited',
      planTitle: 'Unlimited',
      planDesc: 'For Power Users',
      desc: 'Access to all base template. write short-term content like product description ,single pragraphs and much more',
      key: 3,
      planList: ['50+ AI Templates', 'Supporting for over 20 language', 'up to 10 USers', 'support chat'],
    },
  ];

  const selectedList = [
    {
      value: 'month',
      label: 'Monthly',
    },
    {
      value: 'year',
      label: 'Annually',
    },
  ];

  const productDescription = (planId) => {
    return SubscriptionDetails.find(({ ID, planTitle, planList, desc, planDesc }) => {
      if (ID === planId) return { planList, desc, planDesc, planTitle };
    });
  };

  const getPlanWords = (planId) => {
    return (
      userPlan &&
      userPlan.find(({ id }) => {
        return id === planId;
      })
    );
  };

  return (
    <>
      <BillingDropDownStyled>
        <Text className="subscription-status">
          Billing :{' '}
          <Text className="save_annually" strong>
            {SAVE_ANNUAL_BILLING}
          </Text>{' '}
          with annual
        </Text>
        <Select
          value={subscriptionPlanInterval}
          defaultValue={MONTH}
          onChange={setSubscriptionPlanInterval}
          options={selectedList}
        />
      </BillingDropDownStyled>
      <CardStyled>
        <Row gutter={[16, 16]}>
          {productInfo &&
            Array.isArray(productInfo) &&
            productInfo
              .filter(({ interval }) => interval.toUpperCase().includes(subscriptionPlanInterval.toUpperCase()))
              .map(({ description, unit_amount, interval, priceId }, index) => {
                return (
                  <Col sm={24} md={24} lg={24} xl={8} xxl={8} key={index}>
                    <SubscriptionCard
                      plan={description}
                      interval={interval}
                      price={unit_amount / 100}
                      totalWords={getPlanWords(description)}
                      index={index}
                      priceId={priceId}
                      planDetails={productDescription(description)}
                      subscriptionPlanData={subscriptionPlanData}
                      currentSubscriptionDetails={currentSubscriptionDetails}
                    />
                  </Col>
                );
              })}
        </Row>
      </CardStyled>
    </>
  );
};

export default BillingPlan;
