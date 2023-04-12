import styled from 'styled-components';

const TemplateStyled = styled.div`
  padding: 7px 0px;
  background: #ffffff;
  .row {
    padding: 7px 13px;
    display: flex;
    margin: 0 !important;
    @media (max-width: 992px) {
      padding-left: 0rem;
    }
  }
  .rowList {
    padding: 7px 13px;
    display: flex;
    margin: 0 !important;
    row-gap: 0 !important;
  }
  .colum {
    width: 249.25px;
    box-sizing: border-box;
    padding: 24px !important;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 8px;
    margin: 5px;
  }
  .column {
    width: 249.25px;
    box-sizing: border-box;
    padding: 24px !important;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin: 5px 8px;
  }
  .columList {
    width: 251.25px;
    box-sizing: border-box;
    padding: 24px !important;
    background: #fffbeb;

    border-width: 1px 0px;
    border-style: solid;
    border-color: #fde68a;
  }
  .columnList {
    width: 251.25px;
    box-sizing: border-box;
    padding: 24px !important;
    background: #ffffff;
    border-width: 1px 0px;
    border-style: solid;
    border-color: #e5e7eb;
    @media (max-width: 567px) {
      padding: 10px !important;
    }
  }
`;
export { TemplateStyled };
