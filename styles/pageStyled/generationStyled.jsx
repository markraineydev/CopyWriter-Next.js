import styled from 'styled-components';

const GenerationStyles = styled.div`
  height: 100vh;
  .template-form {
    background: #f9fafb;
    border-right: 1px solid #e5e7eb;
  }

  .genration-box {
    background: white;
    height: 100vh;

    .generation-history {
      width: 100%;
      padding: 16px;
      font-family: 'OpenSans-SemiBold';
      border-bottom: 1px solid #e5e7eb;
      @media (max-width: 426px) {
        display: flex;
        place-content: center;
      }
    }
    .generation-note {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84vh;
      .generation-no-box {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        .no-content-icon {
          border-radius: 7px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          background-color: rgb(241 245 249);
          align-items: center;
          display: flex;
          height: 68px;
          padding: 10px;
          .bolt-icon {
            width: 20px;
            height: 20px;
            color: '#9CA3AF';
          }
        }
        .no-content-text {
          padding: 0.75rem;

          .text-generation {
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-family: 'OpenSans-SemiBold';
            color: rgb(100 116 139);
          }
          .empty-output-description {
            font-family: 'OpenSans-Regular';
            color: #6b7280;
            font-size: 14px;
          }
        }
      }
    }
  }

  .clear-button {
    /* text-align: right; */
    display: flex;
    cursor: pointer;
    justify-content: end;
    @media (max-width: 998px) and (min-width: 769px) {
      justify-content: start;
      padding: 8px;
    }
    .generation-clear-button {
      font-size: 14px;
      font-family: 'OpenSans-Regular';
      color: #6b7280;
    }
  }
  .clear-input {
    cursor: pointer;
  }
  .output-display {
    max-height: calc(100vh - 4rem);
    overflow: auto;
    .ant-card:not(.ant-card-bordered) {
      box-shadow: none;
    }
  }
`;

const TemplateFormStyled = styled.div`
  .header-container {
    padding: 24px;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #e5e7eb;
    background: #ffffff;
    display: flex;
    @media (max-width: 426px) {
      padding: 10px;
    }
    .image-template {
      min-width: 70px !important;
    }
    .template-title {
      font-family: 'OpenSans-SemiBold';
      font-size: 18px;
      color: #111827;
      padding-left: 10px;
      @media (max-width: 426px) {
        padding-left: 0px;
      }
    }
    .detail-wrapper {
      padding-left: 10px;
      .template-description {
        margin-top: 8px;
        font-family: 'OpenSans-Regular';
        font-size: 16px;
        color: #6b7280; /* gray/500 */
        @media (max-width: 426px) {
          font-size: 14px;
        }
      }
    }
  }
  .form {
    /* min-height: calc(100vh - 14rem); */
    height: 60vh;
    overflow: auto;
    .field-input {
      padding: 1px 24px;

      .product-headings {
        margin-top: 24px;
        .field-title {
          font-family: 'OpenSans-SemiBold';
          font-size: 14px;
        }
        .optional-staric {
          padding: 0px 0px 0px 5px;
        }
        .optional-text {
          color: #a5a5a5;
          font-size: 10px;
          margin-left: 3px;
          font-weight: 500;
          font-family: 'OpenSans-SemiBold';
        }
        .field-count {
          font-size: 12px;
          line-height: 15px;
          float: right;
        }
      }

      .company {
        font-size: 14px;
      }
      .product-description {
        .description-box {
          font-size: 16px;
        }
      }
      .tone {
        font-size: 14px;
      }
      .ant-input {
        color: rgb(107, 114, 128);
        font-family: 'OpenSans-Regular';
        padding: 9px 13px;
        margin-top: 5px;
        min-width: 100%;
      }
      .ant-btn {
        font-size: 14px;
        font-family: 'OpenSans-SemiBold';
      }
      @media (max-width: 425px) {
        padding: 0px 5px;
      }
    }
  }

  .number-output {
    padding: 16px 1rem;
    background: #fff;
    display: flex;
    bottom: 0;
    position: absolute;
    width: 100%;

    @media (max-width: 768px) {
      position: relative;
    }
    .generate-wrapper {
      width: 100%;
      .generate-box {
        display: flex;
        justify-content: end;
        display: flex;
        place-content: center;
        @media (max-width: 998px) and (min-width: 769px) {
          justify-content: start;
        }
      }
    }
  }
`;

export { GenerationStyles, TemplateFormStyled };
