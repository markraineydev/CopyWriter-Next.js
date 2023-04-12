import styled from 'styled-components';

const AddNewTemplatesWrapper = styled.div`
  .new-templates-header {
    font-size: 24px;
    font-family: 'OpenSans-SemiBold';
    padding: 20px;
  }
`;

const Main = styled.div`
  padding: 2rem 4rem;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;
export { AddNewTemplatesWrapper, Main };
