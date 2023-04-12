import styled from 'styled-components';

const IntegrationStyled = styled.div`
  /* flex: 1; */
  margin: auto;
  width: 800px;
  padding-top: 24px;
  .integration-box {
    padding-bottom: 24px;
    .integration-text {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
      margin-bottom: 1.5rem !important;
    }
    .integration-detail {
      .integration-title {
        font-family: 'OpenSans-SemiBold';
        font-size: 14px;
        color: #111827;
        margin-top: 0px;
      }
      .integration-description {
        font-family: 'OpenSans-SemiBold';
        font-size: 14px;
        color: #6b7280;
      }
    }
    .title-box{
      padding-bottom: 24px;
    }
    .switch-button {
      align-self: center;
    }
  }
  @media (max-width: 992px) {
    width: 100%;
    padding: 0px;
  }
`;

export { IntegrationStyled };
