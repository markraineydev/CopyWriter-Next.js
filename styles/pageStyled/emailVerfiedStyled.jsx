import styled from 'styled-components';

const EmailVerifiedStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  .verification-box {
    border: 1px solid #e5e7eb;
    width: 650px;
    padding: 28px 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 2px 3px 6px #f9fafb;
  }
  .password-Success-text {
    display: flex;
    gap: 12px;
    padding: 20px 0px;
  }
  .password-box{
    padding-top: 12px
  }
  .email-invitation{
    justify-content: center;
    display: flex;
    font-family: 'OpenSans-Bold';
    font-size: 18px;

  }
  .verfication-message{
    display: flex;
    justify-content: center;
    font-family: 'OpenSans-SemiBold';
    font-size: 15px;
  }
`;

export { EmailVerifiedStyled };
