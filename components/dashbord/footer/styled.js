import styled from 'styled-components';

const FooteStyled = styled.div`
  background: #ffffff;
  display: flex;
  margin-top: 40px;

  .footer-box {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    min-width: 200px;
    margin-bottom: 48px;
    .footer-data {
      text-align: center;
    }
    .text-data {
      display: inline-block;
      padding: 24px;
      /* size: 16px; */
      font-size: 16px;
      font-family: 'OpenSans-Regular';
      color: #6b7280;
      /*  */
    }
    .copy-right-text {
      text-align: center;
      font-size: 16px;
      font-family: 'OpenSans-Regular';
      color: #6b7280;
    }
    .icon-box {
      text-align: center;
      .icon {
        size: 12px;
        display: inline-block;
        color: #6b7280;
        padding: 34px;
      }
    }
  }
`;

export default FooteStyled;
