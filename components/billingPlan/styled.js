import styled from 'styled-components';

const BillingDropDownStyled = styled.div`
  display: inline-grid;
  padding: 24px 0px;
  /* text-align: center; */
  width: 103%;
  justify-content: center;
  .subscription-status {
    font-size: 16px;
    font-family: 'OpenSans-SemiBold';
    color: #6b7280;
    .save_annually {
      color: #34d399;
    }
  }
`;
const BillingSubscriptionStyled = styled.div`
  /* padding: 20px 24px; */
  .plan-status {
    border: 1px solid #e5e7eb;
    border-radius: 24px;
    width: 6rem;
    display: flex;
    justify-content: center;
    background: #e5e7eb;
    font-size: 15px;
    font-family: 'OpenSans-Bold';
    color: #186ebe;
  }
  .subscribe-plan-status {
    border: 1px solid #186ebe;
    border-radius: 24px;
    width: 6rem;
    display: flex;
    justify-content: center;
    background: #186ebe;
    font-size: 15px;
    font-family: 'OpenSans-Bold';
    color: white;
  }
  .card-plan-button {
    position: absolute;
    /* display: flex; */
    bottom: 25px;
    width: 85%;
    .current-plan {
      font-size: 17px;
      font-family: 'OpenSans-Regular';
      border: 1px solid #186ebe;
      display: flex;
      justify-content: center;
      border-radius: 6px;
      padding: 6px;
      background: #186ebe;
      color: white;
    }
  }
  .plan-status-row {
    display: flex;
    align-items: center;
  }
  .plan-detail {
    border: dashed #e5e7eb;
    border-width: 0px 0px 2px 0px;
    font-size: 14px;
    font-family: 'OpenSans-SemiBold';
    color: #6b7280;
  }
  .annually-billing {
    padding: 20px 0px;
  }
  .billing-price {
    font-size: 80px;
    font-family: 'OpenSans-Bold';
  }
  .billing-status {
    font-size: 20px;
    font-family: 'OpenSans-SemiBold';
    color: #6b7280;
    display: inline-block;
  }
  .billed-annually {
    font-size: 15px;
    font-family: 'OpenSans-SemiBold';
    color: #6b7280;
    padding-left: 12px;
    display: inline-block;
  }
  .generated-word {
    padding: 9px;
    display: flex;
    justify-content: center;
    border: 1px solid #e5e7eb;
    background: #e5e7eb;
    font-size: 16px;
    font-family: 'OpenSans-Bold';
    margin-top: 20px;
    border-radius: 8px;
  }
  .get-started {
    display: flex;
    gap: 5px;
    justify-content: center;
    width: 100%;
    /* margin-top: 20%; */
  }
  .plan-list {
    display: inline-grid;
  }
  .not-in-used {
    display: flex;
    color: #6b7280;
    gap: 6%;
    padding-bottom: 6px;
  }
  .package-status {
    display: flex;
    gap: 6%;
    padding-bottom: 6px;

    .inpackage {
      border: dashed #e5e7eb;
      border-width: 0px 0px 2px 0px;
    }
  }
  .ant-card .ant-card-body {
    display: grid;
  }
`;

const CardStyled = styled.div`
  padding: 42px 20px;
  @media (max-width: 767px) {
    width: 100%;
    padding: 0px;
  }
`;

export { BillingDropDownStyled, BillingSubscriptionStyled, CardStyled };
