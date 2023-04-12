import styled from 'styled-components';

const TemplateCategoriesStyled = styled.div`
  background: #ffffff;
  display: flex;
  padding: 13px 22px;
  gap: 8px;
  .btn {
    margin: 10px 1px;
    text-transform: capitalize;
    padding: 4px 14px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 15px;
    font-family: 'OpenSans-SemiBold2';
    font-size: 14px;
    color: #374151;
    cursor: pointer;
  }
  .isSelected {
    background: #186ebe;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #186ebe;
    color: #ffffff;
    &:hover {
      color: #ffffff;
    }
  }
  @media (max-width: 992px) {
    width: 100%;
    padding: 13px 0px;
  }
`;
export { TemplateCategoriesStyled };
