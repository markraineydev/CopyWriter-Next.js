import styled from 'styled-components';

const DashboardStyle = styled.div`
  /* padding: 24px 144px; */
  margin: auto;
  max-width: 800px;
  padding-top: 24px;

  .dashboard-header {
    font-family: 'OpenSans-Bold';
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1100px) {
    width: 100%;
    padding-left: 1rem;
    /* padding-top: 1rem; */
  }
`;

export { DashboardStyle };
