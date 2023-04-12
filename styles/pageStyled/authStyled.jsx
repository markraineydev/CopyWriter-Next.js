import styled from 'styled-components';

const AuthStyled = styled.div`
  display: flex;
  justify-content: center;
  /* height: 100vh; */
  padding: 50px 0px;
  align-items: center;
  flex-direction: column;
  .auth-logo {
    padding: 24px 3.5rem;
    width: 350px;
    text-align: center;
  }
  .auth-account {
    font-family: 'OpenSans-SemiBold';
    font-size: 14px;
  }
  .signup-button {
    font-family: 'OpenSans-SemiBold';
    font-size: 14px;
    color: #186ebe;
    padding-left: 4px;
    cursor: pointer;
  }
  .forgetpassword {
    font-size: 16px;
    font-family: 'OpenSans-Bold';
    padding: 26px;
  }
  .account-info {
    padding: 26px;
  }
  @media (max-width: 575px) {
    height: 0%;
  }
`;

export { AuthStyled };
