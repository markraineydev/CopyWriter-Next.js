import Link from 'next/link';
import { AUTHORITY, SIDER_MAIN, SIDER_SETTING, USER } from '../../utils/constants';
import IconDot from '../../assets/iconDot';
import {
  HomeIcon,
  Squares2X2Icon,
  DocumentIcon,
  InboxIcon,
  ArrowLongLeftIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Col, Row } from 'antd';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Logout } from '../../components/logout/logout';

export const siderData = [
  {
    key: 'User Management',
    icon: <UserCircleIcon style={{ width: 22, height: 22, color: '#9CA3AF' }} />,
    label: <Link href="/user-management">Admin</Link>,
    authority: [AUTHORITY.ADMIN],
    type: SIDER_MAIN,
    children: [
      {
        icon: <IconDot />,
        label: <Link href="/user-management">User Management</Link>,
        key: 'user-management',
      },
      {
        icon: <IconDot />,
        label: <Link href="/plan-details">Plan Details</Link>,
        key: 'plan-details',
      },
      {
        icon: <IconDot />,
        label: <Link href="/add-template">Add New Templates</Link>,
        key: 'new-templates',
      },
      {
        icon: <IconDot />,
        label: <Link href="/update-templates">Update Templates</Link>,
        key: 'update-templates',
      },
    ],
  },
  {
    key: 'dashboard',
    icon: <HomeIcon style={{ width: 20, height: 20, color: '#9CA3AF' }} />,
    label: <Link href="/dashboard">Dashboard</Link>,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
    type: SIDER_MAIN,
  },
  {
    key: 'templates',
    icon: <Squares2X2Icon style={{ width: 20, height: 20, color: '#9CA3AF' }} />,
    label: <Link href="/templates">Templates</Link>,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
    type: SIDER_MAIN,
  },
  {
    key: 'aiOutput',
    icon: <InboxIcon style={{ width: 20, height: 20, color: '#9CA3AF' }} />,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
    label: <Link href="/outputs">AI Outputs</Link>,
    type: SIDER_MAIN,
    children: [
      {
        icon: <IconDot />,
        label: <Link href="/outputs">All Outputs</Link>,
        key: 'recently-outputs',
      },
      {
        icon: <IconDot fill="#FCD34D" stroke="#FCD34D" />,
        label: <Link href="/favouriteOutputs">Favourite Outputs</Link>,
        key: 'favourite-outputs',
      },
      {
        icon: <IconDot fill="#FF0000" stroke="#FF0000" />,
        label: <Link href="/deleted-outputs">Deleted Outputs</Link>,
        key: 'delete-outputs',
      },
    ],
  },
  {
    key: 'settings',
    icon: <Cog8ToothIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
    label: <Link href="/profile-settings">Settings</Link>,
    type: SIDER_SETTING,
    children: [
      {
        icon: <IconDot />,
        label: <Link href="/profile-settings">Profile</Link>,
        key: 'profile',
      },
      // {
      //   icon: <IconDot />,
      //   label: <Link href="/intergration">Integrations</Link>,
      //   key: 'Integrations',
      // },
      // {
      //   icon: <IconDot />,
      //   label: <Link href="/general-settings">General</Link>,
      //   key: 'general',
      // },
      {
        icon: <IconDot />,
        label: <Link href="/billing">Billing</Link>,
        key: 'billing',
      },
      {
        icon: <IconDot />,
        label: <Link href="/team">Team</Link>,
        key: 'team',
      },
      {
        icon: <IconDot />,
        label: <Link href="/usage">Usage</Link>,
        key: 'usage',
      },
    ],
  },
  {
    key: 'logout',
    icon: <ArrowRightOnRectangleIcon style={{ width: 25, height: 25, color: '#9CA3AF' }} />,
    label: <Logout showIcon={false} />,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
    type: SIDER_SETTING,
  },
];
