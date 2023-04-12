import styled from 'styled-components';

const TemplateCardStyle = styled.div`
  cursor: pointer;
  width: 100%;

  .templates-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
  }
  .template-title-name {
    font-family: 'OpenSans-SemiBold';
    font-style: normal;
    font-size: 18px;
    line-height: 32px;
    color: #111827;
    margin-top: 0px;
  }
  .template-description {
    font-family: 'OpenSans-Regular';
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    color: #6b7280;
  }
`;

const TemplateCardStyleList = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  .templates-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
  }
  .template-detail {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: 16px;
    .template-title-name {
      font-family: 'OpenSans-SemiBold';
      font-style: normal;
      font-size: 18px;
      line-height: 32px;
      color: #111827;
      margin-top: 0px;
    }
    .template-description {
      font-family: 'OpenSans-Regular';
      font-size: 16px;
      line-height: 24px;
      color: #6b7280;
    }
  }
`;

export { TemplateCardStyle, TemplateCardStyleList };
