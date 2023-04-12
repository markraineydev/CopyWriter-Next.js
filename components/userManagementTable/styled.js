import { Table } from 'antd';
import styled from 'styled-components';

const UserTableStyled = styled(Table)`
  .name-column {
    display: flex;
    /* justify-content: space-between; */
    gap: 16px;
    .user-email-box {
      display: grid;
      .user-name-title {
        font-family: 'OpenSans-SemiBold';
        font-size: 14px;
      }
      .user-email {
        font-family: 'OpenSans-SemiBold';
        color: #6b7280;
        font-size: 14px;
      }
    }
  }
`;

export { UserTableStyled };
