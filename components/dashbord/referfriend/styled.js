import styled from 'styled-components';

const RefFriendStyled = styled.div`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  border-radius: 8px;
  margin-top: 40px;

  .ref-box {
    padding: 24px;

    .refer-title {
      font-family: 'openSans-SemiBold';
      font-size: 18px;
      margin-bottom: 8px;
      color: #111827;
    }
    .credit-points {
      font-family: 'openSans-Regular';
      font-size: 16px;
      color: #34d399;
      margin-bottom: 8px;
    }
    .description {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 16px;
      font-family: 'openSans-Regular';
    }
  }
`;

export { RefFriendStyled };
