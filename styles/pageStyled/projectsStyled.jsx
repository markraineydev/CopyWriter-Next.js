import { Modal } from 'antd';
import styled from 'styled-components';

const ProjectsStyled = styled.div`
  background: #ffffff;
  padding: 24px;
  width: 100%;
  height: 100vh;
  /* margin-top: 24px; */
  .title {
    font-family: 'OpenSans-Bold';
    font-size: 24px;
  }
  .search-bar {
    margin-bottom: 10px;
  }
  .project-action-buttons {
    display: flex;
    justify-content: end;
  }

  .right-side-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    padding: 0px;
    gap: 10px;
    margin-bottom: 10px;
  }
  .radiogroup {
    width: 100%;
    display: contents;
  }

  .new-project-box {
    display: inline-flex;
    /* width: 100%; */
    margin-top: 24px;
    border: 1px solid #e5e7eb;
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    width: 100%;

    .new-project-title {
      font-family: 'OpenSans-SemiBold';
      font-style: normal;
      font-size: 18px;
      color: #111827;
      margin-top: 0px;
    }
    .new-project-description {
      font-family: 'OpenSans-Regular';
      font-style: normal;
      font-size: 16px;
      color: #6b7280;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .project-icons {
    cursor: pointer;
    text-align: end;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 18px;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  .empty {
    margin-top: 17rem;
  }
  @media (max-width: 992px) {
    padding: 0px;
  }
`;

const ProjectModalStyled = styled(Modal)`
  .ant-modal-header {
    margin-bottom: 0px;

    .ant-modal-title {
      font-size: 24px;
      font-family: 'OpenSans-Bold';
      color: #111827;
    }
  }

  .description {
    font-size: 16px;
    font-family: 'OpenSans-SemiBold';
    color: #6b7280;
  }
  .name-box {
    margin-top: 24px;
    .description-text {
      margin-top: 24px;
      margin-bottom: 24px;
    }
  }
  .project-name-input {
    border: 1px solid #d1d5db;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding: 9px 13px;
    font-size: 14px;
  }
  .label {
    color: #374151;
    font-size: 14px;
    font-family: 'OpenSans-SemiBold';
    margin-bottom: 4px;
    padding: 8px 0px;
  }
  .ant-input-lg {
    border-radius: 6px;
    font-size: 16px;
    font-family: 'OpenSans-Regular';
    color: #6b7280;
    padding: 9px 13px;
  }
`;

export { ProjectsStyled, ProjectModalStyled };
