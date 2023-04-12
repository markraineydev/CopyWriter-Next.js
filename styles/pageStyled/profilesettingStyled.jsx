import styled from 'styled-components';

const ProfileSettingsStyled = styled.div`
  flex: 1;
  margin: auto;
  width: 800px;
  .profilesetting-box {
    margin: 1.5rem;
    .profile-settings-title {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
      margin-bottom: 1rem !important;
    }
    .text-box {
      margin-right: 2rem;
    }
    @media (max-width: 992px) {
      margin: 0rem;
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
  .ant-modal {
    width: 40rem;
  }
  @media (max-width: 1200px) {
    width: 100%;
    /* padding: 1rem !important; */
  }
`;
export { ProfileSettingsStyled };
