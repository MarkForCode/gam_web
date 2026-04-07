import { message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import { rule, createWithdraw, createTransfer, removeRecord } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'withdraw' | 'transfer'>('withdraw');
  const actionRef = useRef<ActionType>();

  const handleRemove = async (id: string) => {
    const hide = message.loading('正在刪除');
    try {
      await removeRecord(id);
      hide();
      message.success('刪除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('刪除失敗，請重試');
      return false;
    }
  };

  const openWithdrawModal = () => {
    setModalType('withdraw');
    setModalVisible(true);
  };

  const openTransferModal = () => {
    setModalType('transfer');
    setModalVisible(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '金額',
      dataIndex: 'amount',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '類型',
      dataIndex: 'type',
      valueEnum: {
        WITHDRAW: { text: '提款', status: 'Warning' },
        TRANSFER: { text: '轉帳', status: 'Processing' },
      },
    },
    {
      title: '狀態',
      dataIndex: 'status',
      valueEnum: {
        PENDING: { text: '待審核', status: 'Processing' },
        APPROVED: { text: '已通過', status: 'Success' },
        REJECTED: { text: '已拒絕', status: 'Error' },
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
        record.status === 'PENDING' && (
          <a
            key="delete"
            onClick={async () => {
              Modal.confirm({
                title: '確認刪除？',
                onOk: async () => {
                  await handleRemove(record.id);
                },
              });
            }}
          >
            刪除
          </a>
        ),
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="錢包紀錄"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="withdraw" onClick={openWithdrawModal}>
            <PlusOutlined /> 申請提款
          </a>,
          <a key="transfer" onClick={openTransferModal}>
            <PlusOutlined /> 轉帳
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
      <ModalForm
        title={modalType === 'withdraw' ? '申請提款' : '轉帳'}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={async (values) => {
          try {
            if (modalType === 'withdraw') {
              await createWithdraw({
                amount: values.amount as number,
                walletPassword: values.walletPassword as string,
              });
              message.success('申請成功');
            } else {
              await createTransfer({
                amount: values.amount as number,
                targetUsername: values.targetUsername as string,
              });
              message.success('轉帳成功');
            }
            setModalVisible(false);
            actionRef.current?.reload();
            return true;
          } catch (error) {
            message.error('操作失敗');
            return false;
          }
        }}
      >
        {modalType === 'withdraw' ? (
          <>
            <ProFormDigit name="amount" label="金額" placeholder="請輸入金額" />
            <ProFormText.Password name="walletPassword" label="錢包密碼" placeholder="請輸入錢包密碼" />
          </>
        ) : (
          <>
            <ProFormText name="targetUsername" label="轉帳對象" placeholder="請輸入用戶名" />
            <ProFormDigit name="amount" label="金額" placeholder="請輸入金額" />
          </>
        )}
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
