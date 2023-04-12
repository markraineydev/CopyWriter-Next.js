import { Layout } from 'antd';
import styled from 'styled-components';

const { Sider } = Layout;

const SiderStyled = styled(Sider)`
  overflow: auto;
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed !important;

  .logo {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    @media (min-width: 767px) {
      padding: 0 2.5rem;
    }
  }

  .ant-layout-sider-children {
    border-right: 1px solid #e5e7eb;
  }

  .ant-menu-root {
    margin-top: 1rem;

    .ant-menu-item .ant-menu-item-icon + span {
      margin-inline-start: 0px;
    }

    .ant-menu-submenu-title .ant-menu-item-icon + span {
      margin-left: 0px;
    }

    .ant-menu-title-content {
      font-size: 14px;
      font-family: 'OpenSans-SemiBold';
      padding-left: 25px;
      color: #4b5563;
    }
    .ant-menu-sub.ant-menu-inline {
      background: #fff;
    }
    .ant-menu-item {
      padding-left: 24px !important;
    }
    .ant-menu-item-selected {
      background: #ffffff;
      .ant-menu-title-content {
        color: #186ebe !important;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
    }
  }
  .sider-goback-button {
    font-family: 'OpenSans-SemiBold';
    cursor: pointer;
    margin-left: 30px;
    align-items: center;
    display: flex;
    gap: 10%;
    padding-top: 18px;
    color: #333333;
    font-size: 14px;
    @media (max-width: 767px) {
      /* width: 80px; */
      font-size: 0%;
    }
  }
  .sider-bottom {
    bottom: 0px;
    position: fixed;
    margin-bottom: 1rem;
    @media (max-width: 767px) {
      width: 80px;
    }
    @media (min-width: 767px) {
      width: 256px;
    }
    .feedback {
      margin-left: 24px;
      align-items: center;
      display: flex;
      .feedback-iconText {
        align-items: center;
        display: flex;
        cursor: pointer;
        padding-top: 11px;
        .feedback-text {
          padding-left: 1rem;
          color: #4b5563; /* gray/600 */
          font-size: 14px;
          font-family: 'OpenSans-SemiBold';
        }
      }

      @media (max-width: 767px) {
        margin-left: 0px;
      }
    }
    .mobile-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      margin: 1rem 0px;
      cursor: pointer;
    }
    .project-display {
      border: 1px solid #d1d5db;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      width: 240px;
      margin-top: 22px;
      margin-bottom: 1rem;
      padding: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 8px;
      cursor: pointer;

      .project-type {
        .title {
          /* gray/400 */
          color: #9ca3af;
          font-family: 'OpenSans-Regular';
          font-size: 12px;
        }
        .type {
          color: #111827;
          font-size: 14px;
          font-family: 'OpenSans-Regular';
          font-weight: 400;
        }
      }
      .feedback-icon {
        cursor: pointer;
        display: flex;
      }
    }
    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 10px 0px;
    }
    .user-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 0 1rem 0 1.5rem;
      .sidebar-avatar {
        display: flex;
      }

      .user-name {
        font-size: 14px;
        margin-left: 1rem;
        font-family: 'OpenSans-SemiBold';
        place-self: center;
        white-space: nowrap;
        width: 8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: 767px) {
          display: none;
        }
      }
      .setting-icon {
        cursor: pointer;
      }
      @media (max-width: 767px) {
        .setting-icon {
          display: none;
        }
        justify-content: center;
      }
    }
  }
`;

const PopoverTitleDesign = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10%;
`;
const PopoverContentDesign = styled.div`
  padding: 10px;

  .actions {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'OpenSans-Regular';
  }
`;

export { SiderStyled, PopoverTitleDesign, PopoverContentDesign };
