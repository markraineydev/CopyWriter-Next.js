import styled from 'styled-components';

const GeneratlSettingsStyled = styled.div`
  flex: 1;
  margin: auto;
  width: 800px;
  .generalsettings-box {
    margin: 1rem;
    .general-settings-title {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
      margin-bottom: 1.5rem !important;
    }
    .company-details {
      margin-bottom: 24px;
      border-width: 0px 0px 1px 0px;
      border-style: solid;
      border-color: #e5e7eb;
      padding-bottom: 24px;
      .company-info {
        font-family: 'OpenSans-SemiBold';
        font-size: 18px;
      }
      .company-description {
        font-family: 'OpenSans-SemiBold';
        font-size: 14px;
        color: #6b7280;
      }
    }
    .text-box {
      margin-bottom: 1.5rem;
      margin-right: 2rem;
      .text-input {
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 1.375rem 0.75rem;
        border-radius: 3px;
      }
      .website {
        display: flex;
        .ant-input-group-addon {
          padding: 9px 11px;
          font-family: 'OpenSans-Regular';
          background-color: rgba(0, 0, 0, 0.02);
          border: 1px solid #d9d9d9;
          border-radius: 3px;
          padding-top: 11px;
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
          border-right: 0px;
        }
        .text-inputs {
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }
      }
    }
    .ant-form-item-label {
      font-size: 14px;
      font-family: 'OpenSans-SemiBold';
      color: #374151;
      padding-bottom: 4px;
    }
    .ant-input {
      padding: 9px 13px;
      font-size: 14px;
      font-family: 'OpenSans-Regular';
    }
    .profile {
      margin-right: 11px;
      /* margin-top: 9px; */
    }
    @media (max-width: 992px) {
      margin: 0rem;
  }
  }
  @media (max-width: 1000px) {
    width: 100%;
    /* padding: 1rem !important; */
  }
`;

export { GeneratlSettingsStyled };
