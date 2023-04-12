import styled from 'styled-components';

const NewProjectStyled = styled.div`
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  border-radius: 6px;
  margin-top: 50px;

  .project-box {
    padding: 24px;
    width: 100%;

    .project-title {
      border-width: 0px 0px 1px 0px;
      border-style: solid;
      border-color: #e5e7eb;
      /* display: flex; */
    }

    .project-info {
      font-family: 'openSans-SemiBold';
      font-size: 18px;
      margin-bottom: 4px;
    }
    .description {
      font-family: 'openSans-Regular';
      font-size: 14px;
      padding: 0px 0px 24px 0px;
      color: #6b7280;
    }
  }
  .project-detail-box {
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #e5e7eb;
    background: #ffffff;
    padding: 16px 0px;
    /* display: flex; */
    width: 100%;
    display: flex;
    cursor: pointer;
    justify-content: flex-start;
    .logo {
      width: 64px;
      height: 64px;
      padding: 12px;
      margin-right: 24px;
      background: #f9fafb;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .project-commom-icon {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 12px;
    }
    .project-detail {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 17px;
    }

    .project-title-name {
      font-family: 'OpenSans-SemiBold';
      font-size: 14px;
      color: #111827;
    }
    .project-description {
      font-family: 'OpenSans-Regular';
      font-size: 14px;
      color: #6b7280;
    }
  }
`;

export { NewProjectStyled };
