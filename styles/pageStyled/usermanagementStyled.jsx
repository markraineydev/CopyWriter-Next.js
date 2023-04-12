import styled from 'styled-components';

const UserManagementStyled = styled.div`
  flex: 1;
  padding: 20px;
  .usermanagment-box {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    .usermanagment-title {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
      margin-bottom: 1rem !important;
    }
  }
  .edit-user {
    cursor: pointer;
  }
`;

export { UserManagementStyled };
