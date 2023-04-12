import styled from 'styled-components';

const PageHeaderStyled = styled.div`
  background: #ffffff;
  padding: 24px 29px;
  .title {
    font-family: 'OpenSans-Bold';
    font-size: 24px;
  }
  @media (max-width: 992px) {
    width: 100%;
    padding: 13px 0px;
  }
`;
const RightPanelStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 13px;
  cursor: pointer;
  .icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: #ffffff;
    border-radius: 6px;
  }
  .icon_store {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #f3f4f6;
    border-radius: 6px;
    padding: 8px;
  }
`;
const Icon = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { PageHeaderStyled, RightPanelStyled, Icon };
