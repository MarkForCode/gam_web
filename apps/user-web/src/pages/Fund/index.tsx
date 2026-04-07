import { message, Modal, Statistic } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { rule, updateStatus, removeRecord, getFundState } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [fundState, setFundState] = useState<{ balance?: number }>({});

  React.useEffect(() => {
    getFundState().then((res) => {
      setFundState(res as { balance?: number });
    });
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    const hide = message.loading('正在處理');
    try {
      await updateStatus(id, { status });
      hide();
      message.success('處理成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('處理失敗，請重試');
      return false;
    }
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
          <>
            <a
              key="approve"
              onClick={async () => {
                Modal.confirm({
                  title: '確認通過？',
                  onOk: async () => {
                    await handleUpdateStatus(record.id, 'APPROVED');
                  },
                });
              }}
            >
              通過
            </a>,
            <a
              key="reject"
              onClick={async () => {
                Modal.confirm({
                  title: '確認拒絕？',
                  onOk: async () => {
                    await handleUpdateStatus(record.id, 'REJECTED');
                  },
                });
              }}
            >
              拒絕
            </a>,
          </>
        ),
        <a
          key="delete"
          onClick={async () => {
            Modal.confirm({
              title: '確認刪除？',
              onOk: async () => {
                await removeRecord(record.id);
                actionRef.current?.reload();
              },
            });
          }}
        >
          刪除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div style={{ marginBottom: 16 }}>
        <Statistic title="餘額" value={fundState.balance || 0} prefix="$" />
      </div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="資金審核"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
