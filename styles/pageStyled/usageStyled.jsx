import styled from 'styled-components';

const UsageStyled = styled.div`
  margin: auto;
  max-width: 800px;
  padding-bottom: 28px;
  .usage-title {
    background: #ffffff;
    padding: 24px 0px;
    .title {
      font-family: 'OpenSans-Bold';
      font-size: 24px;
    }
    @media (max-width: 992px) {
      width: 100%;
      padding: 13px 0px;
    }
  }
  .usage-head {
    font-family: 'OpenSans-Bold';
    font-size: 24px;
  }
  @media (max-width: 1000px) {
    width: 100%;
    margin: 10px;
  }
`;

export { UsageStyled };
