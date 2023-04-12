import styled from 'styled-components';

const UpdateTemplatesWrapper = styled.div`
  .ant-form-item-label > label {
    font-family: 'OpenSans-Bold';
  }
  /* padding: 20px; */
  @media (max-width: 767px) {
    width: fit-content;
  }
`;
const TemplateListBox = styled.div`
  .templates-list-card {
    margin-top: 1rem;
    .ant-card-body {
      padding: 0px !important;
    }
    .list {
      font-size: 14;
      font-family: 'OpenSans-SemiBold';
      padding: 12px;
      cursor: pointer;
      .active {
        font-size: 16px;
        font-family: 'OpenSans-Bold';
        color: #186ebe;
      }
    }
  }
`;

const Main = styled.div`
  padding: 20px;
`;
export { UpdateTemplatesWrapper, TemplateListBox, Main };
