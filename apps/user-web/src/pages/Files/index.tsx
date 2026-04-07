import { message, Modal } from 'antd';
import { PlusOutlined, FileOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { rule, uploadFile, removeFile } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleRemove = async (id: string) => {
    const hide = message.loading('正在刪除');
    try {
      await removeFile(id);
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '檔案名稱',
      dataIndex: 'fileName',
      render: (_, record) => (
        <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
          <FileOutlined /> {record.fileName}
        </a>
      ),
    },
    {
      title: '檔案類型',
      dataIndex: 'fileType',
    },
    {
      title: '上傳時間',
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
              title: '確認刪除？',
              onOk: async () => {
                await handleRemove(record.id);
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
      <ProTable<TableListItem, TableListPagination>
        headerTitle="檔案列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="upload">
            <PlusOutlined /> 上傳檔案
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
