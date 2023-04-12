import React from 'react';
import { UserTableStyled } from './styled';
import { Typography } from 'antd';
import editImage from '../../assets/edit.png';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { capitalizeFirstLetter, currencyFormat, numberFormat } from '../../utils/generateUtils';
const { Text } = Typography;

const UserManagmentTable = ({ userData }) => {
  const router = useRouter();
  const editButton = (record) => {
    const { uid } = record;
    router.push(`/user-details/${uid}`);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      // fixed: 'left',
      render: (text, record) => (
        <div className="name-column">
          <div className="user-email-box">
            <Text className="user-email">{capitalizeFirstLetter(record.displayName)}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => <Text className="user-name-title">{record.email}</Text>,
      width: 260,
    },
    {
      title: 'Status',
      dataIndex: 'planStatus',
      key: 'planeStatus',
      // width: 80,
      render: (text, record) => {
        return (
          <div>
            {record.currentSubscriptionDetails?.planInterval ? (
              <Text>
                {`${capitalizeFirstLetter(record.currentSubscriptionDetails?.status)}/
                  ${capitalizeFirstLetter(record.currentSubscriptionDetails?.planInterval)}`}
              </Text>
            ) : (
              <Text>{capitalizeFirstLetter(record.planStatus)}</Text>
            )}
          </div>
        );
      },
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      ellipsis: true,
      render: (text, record) => {
        return (
          <div>
            {record.currentSubscriptionDetails?.planInterval ? (
              <Text>{`${capitalizeFirstLetter(record.currentSubscriptionDetails?.productName)}`}</Text>
            ) : (
              <Text>{capitalizeFirstLetter(record.plan)}</Text>
            )}
          </div>
        );
      },
    },

    {
      title: 'Access',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      width: 120,
      render: (text, record) => <Text>{capitalizeFirstLetter(record.status)}</Text>,
    },
    {
      title: 'Authority',
      dataIndex: 'authority',
      key: 'authority',
      render: (text, record) => <Text>{capitalizeFirstLetter(record.authority)}</Text>,
    },
    {
      title: 'Credits',
      dataIndex: 'userTotalWords',
      key: 'userTotalWords',
      ellipsis: true,
      render: (text, record) => <Text>{numberFormat(record.userTotalWords)}</Text>,
    },
    {
      title: 'Cost',
      dataIndex: 'userCost',
      key: 'userCost',
      ellipsis: true,
      render: (text, record) => <Text>{currencyFormat(record.userCost)}</Text>,
    },
    {
      title: 'Token',
      dataIndex: 'userTotalTokens',
      key: 'userTotalTokens',
      ellipsis: true,
      render: (text, record) => <Text>{numberFormat(record.userTotalTokens)}</Text>,
    },
    {
      title: 'Join',
      dataIndex: 'date',
      key: 'date',
      ellipsis: true,
      render: (text, record) => {
        const date = record?.date;
        var myDate = new Date(date?.seconds * 1000 + date?.nanoseconds / 1000000).toLocaleString();
        // var formatedTime = myDate.toJSON();
        const dateData = myDate.split(',');
        return (
          <div>
            <Text className="user-name-title">{myDate !== 'Invalid Date' ? dateData[0] : 'N/A'}</Text>
          </div>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      fixed: 'right',
      render: (text, record) => (
        <Image
          alt="edit-image"
          className="edit-user"
          height={20}
          width={20}
          src={editImage}
          onClick={() => editButton(record)}
        />
      ),
    },
  ];

  return (
    <UserTableStyled
      columns={columns}
      dataSource={userData}
      pagination={false}
      scroll={{
        x: 1500,
      }}
    />
  );
};

export default UserManagmentTable;
