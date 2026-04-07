import { message } from 'antd';
import { PlusOutlined, LinkOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { rule, createInvite } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '邀請郵箱',
      dataIndex: 'inviteeEmail',
    },
    {
      title: '邀請訊息',
      dataIndex: 'message',
      ellipsis: true,
    },
    {
      title: '邀請碼',
      dataIndex: 'inviteCode',
      render: (_, record) => (
        <a
          onClick={() => {
            navigator.clipboard.writeText(record.inviteCode);
            message.success('已複製邀請碼');
          }}
        >
          <LinkOutlined /> {record.inviteCode}
        </a>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      valueEnum: {
        PENDING: { text: '待使用', status: 'Processing' },
        ACCEPTED: { text: '已使用', status: 'Success' },
        EXPIRED: { text: '已過期', status: 'Error' },
      },
    },
    {
      title: '過期時間',
      dataIndex: 'expiresAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="邀請管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="create" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 發送邀請
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
      <ModalForm
        title="發送邀請"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values) => {
          try {
            await createInvite(values);
            message.success('邀請已發送');
            handleModalVisible(false);
            actionRef.current?.reload();
            return true;
          } catch (error) {
            message.error('發送失敗');
            return false;
          }
        }}
      >
        <ProFormText name="inviteeEmail" label="郵箱" placeholder="請輸入郵箱" rules={[{ required: true, type: 'email' }]} />
        <ProFormTextArea name="message" label="訊息" placeholder="請輸入訊息（可選）" />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
