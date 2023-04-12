import styled from 'styled-components';

const TemplatesDetailsStyled = styled.div`
  /* .output-template {
    display: flex;
    padding: 24px; */
  /* justify-content: space-evenly; */
  .output-status {
    padding: 1rem 0rem;
    overflow-x: auto;
    height: 780px;
    .text {
      padding-top: 16px;
      font-family: 'OpenSans-SemiBold';
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .status-text {
        font-family: 'OpenSans-SemiBold';
        font-size: 14px;
        color: #4b5563;
        text-transform: uppercase;
      }
      .status-desc {
        font-family: 'OpenSans-light';
        background: #f9fafb;
        border-radius: 10px;
        /* padding: 2px 10px; */
      }
    }

    /* @media (max-width: 576px) {
      display: -webkit-box;
    } */
  }
  .template-data {
    padding: 1rem 0rem;
    overflow-x: auto;
    height: 780px;
    @media (max-width: 576px) {
      height: 780px;
    }
  }
`;

export { TemplatesDetailsStyled };
