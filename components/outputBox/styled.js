import styled from 'styled-components';

const OutputBoxStyled = styled.div`
  background: #ffffff;
  padding: 24px 24px 0px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  height: 21rem;
  .output_type {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
      .output-action-icons {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
  .ant-space-item {
    cursor: pointer;
  }
  .content {
    padding: 16px 0;
    cursor: pointer;
  }
  .content_text {
    color: #111827;
    font-size: 16px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .box_text {
    font-family: 'OpenSans-Regular';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9ca3af;
  }
  .output_time {
    display: flex;
    justify-content: space-between;
  }
`;

export { OutputBoxStyled };
