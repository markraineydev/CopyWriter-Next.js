import styled from 'styled-components';

const TeamStyled = styled.div`
  margin: auto;
  width: 1000px;

  .team-box {
    margin: 24px;
    .team-title {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
      color: #111827;
      padding-bottom: 40px;
    }
    .invite-members-box {
      border-width: 1px 0px 0px 0px;
      border-style: solid;
      border-color: #e5e7eb;
      padding-top: 24px;
      font-family: 'OpenSans-SemiBold';
      font-size: 18px;
      .invite-box {
        display: flex;
        padding-top: 24px;
        .email-box {
          width: 79%;
          @media (max-width: 1060px) {
            width: 60%;
          }
          @media (max-width: 526px) {
            padding-bottom: 10px;
          }
        }
        .email-input {
          padding: 9px;
          @media (max-width: 526px) {
            width: 200px;
          }
        }
      }
    }
    .current-member {
      margin-top: 40px;
      font-size: 18px;
      font-family: 'OpenSans-SemiBold';
      color: #111827;
      .team-members-search {
        .ant-row {
          width: 100%;
          margin-top: 40px;
          .ant-col {
            align-self: center;

            .team-members {
              font-size: 12px;
              font-family: 'OpenSans-Bold';
              color: #6b7280;
            }
          }
        }
      }
    }
    .table-box {
      margin-top: 16px;
    }
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export { TeamStyled };
