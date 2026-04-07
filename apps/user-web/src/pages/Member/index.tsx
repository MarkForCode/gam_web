import { message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { rule, removeMember } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleRemove = async (username: string) => {
    const hide = message.loading('正在註銷');
    try {
      await removeMember(username);
      hide();
      message.success('註銷成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('註銷失敗，請重試');
      return false;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用戶名',
      dataIndex: 'username',
      render: (_: any, record: TableListItem) => record.username,
    },
    {
      title: '暱稱',
      dataIndex: 'nickname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        ADMIN: { text: '管理員', status: 'Admin' },
        MEMBER: { text: '成員', status: 'Member' },
      },
    },
    {
      title: '狀態',
      dataIndex: 'status',
      valueEnum: {
        ACTIVE: { text: '正常', status: 'Success' },
        PENDING: { text: '待驗證', status: 'Processing' },
        DISABLED: { text: '停用', status: 'Error' },
      },
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="delete"
          onClick={async () => {
            Modal.confirm({
              title: '確認註銷此成員？',
              onOk: async () => {
                await handleRemove(record.username);
              },
            });
          }}
        >
          註銷
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="會員列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="add">
            <PlusOutlined /> 新增成員
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
