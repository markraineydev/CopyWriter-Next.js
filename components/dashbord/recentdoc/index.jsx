import React from 'react';
import { RecentDocStyled } from './styled';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name ',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Created By',
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    responsive: ['md', 'sm', 'xs'],
  },
  {
    title: 'Modified',
    dataIndex: 'Modified',
    key: 'Modified',
    responsive: ['lg', 'sm', 'xs'],
  },
];
const data = [
  {
    key: '1',
    name: ' Untitled',
    CreatedBy: 'me',
    Modified: 'Oct 18, 2022',
  },
  {
    key: '2',
    name: ' Document name',
    CreatedBy: 'John Snow',
    Modified: 'Oct 18, 2022',
  },
  {
    key: '3',
    name: ' JohnSmokers document long name',
    CreatedBy: 'me',
    Modified: 'Oct 18, 2022',
  },
];

const RecentDoc = () => {
  return (
    <RecentDocStyled>
      <div className="recent-box">
        <div className="project-info">Recent documents</div>
        <div className="tables">
          <Table columns={columns} dataSource={data} scroll={{ x: 200 }} pagination={false} />
        </div>
      </div>
    </RecentDocStyled>
  );
};

export default RecentDoc;
