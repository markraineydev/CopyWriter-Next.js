import styled from 'styled-components';

const ProfileStyled = styled.div`
  /* display: flex; */
  margin-top: 16px;
  padding: 24px 0px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #e5e7eb;
  background: #ffffff;
  /* max-width: 56rem; */
  .Profile-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    .welcome-text {
      size: 14px;
      align-self: center;
      margin-left: 20px;
      font-family: 'OpenSans-SemiBold';
      width: 100%;
      color: #4b5563;
    }
    .profile {
      /* display: flex; */
    }
    .user-name {
      font-size: 24px;
      display: flex;
      font-family: 'OpenSans-Bold';
      justify-content: space-between;
      align-items: center;
    }
  }
  .standard-plan {
    display: flex;
    justify-content: end;
    height: 100%;
    align-items: center;
    .plan-name {
      padding: 7px 37px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-family: 'OpenSans-SemiBold';
    }
  }
`;

export { ProfileStyled };
