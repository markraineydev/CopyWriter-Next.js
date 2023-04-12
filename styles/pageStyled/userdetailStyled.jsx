import styled from 'styled-components';

const UserDetailStyled = styled.div`
  /* padding: 20px; */
  .ant-typography pre {
    margin: 0px;
  }
  .template-data {
    margin: 24px;
    overflow-x: auto;
    height: 780px;
    @media (max-width: 576px) {
      height: 780px;
    }
  }
  .ant-input-affix-wrapper {
    padding: 7px 11px;
  }
  .usercardtab{
    padding: 0px 20px ;
    .templates-details{
      padding: 0px;
    }
  }
`;

export { UserDetailStyled };
