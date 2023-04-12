import styled from 'styled-components';

const RecentDocStyled = styled.div`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  border-radius: 6px;
  margin-top: 50px;

  .recent-box {
    padding: 24px;
    width: 100%;
    .generation-card {
      font-family: 'openSans-SemiBold';
      font-size: 18px;
      margin-bottom: 16px;
    }
  }
`;

export { RecentDocStyled };
