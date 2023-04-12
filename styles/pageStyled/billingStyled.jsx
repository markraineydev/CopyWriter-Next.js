import styled from 'styled-components';
const BillingPageStyled = styled.div`
  margin: 20px;
`;

const BillingStyled = styled.div`
  padding: 0px 24px;

  .available-credits {
    font-family: 'OpenSans-Bold';
    color: #186ebe;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .credits-title {
    font-size: 16px;
    font-family: 'OpenSans-Bold';
  }
  .credits-desc {
    font-size: 15px;
    font-family: 'OpenSans-Semibold';
    color: #6b7280;
  }
  .credit {
    padding: 0px 0px 20px;
  }
  .credits-account {
    padding: 0px 0px 8px;
  }
  @media (max-width: 490px) {
    width: 100%;
    padding: 0px;
  }
`;

export { BillingStyled, BillingPageStyled };
