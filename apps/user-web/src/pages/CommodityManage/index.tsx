import { message, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { rule, createCommodity, updateCommodity, removeCommodity, uploadFile } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();

  const handleRemove = async (id: string) => {
    const hide = message.loading('正在刪除');
    try {
      await removeCommodity(id);
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

  const handleUpdate = async (id: string, values: any) => {
    const hide = message.loading('正在更新');
    try {
      await updateCommodity(id, values);
      hide();
      message.success('更新成功');
      handleUpdateModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('更新失敗，請重試');
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
      title: '標題',
      dataIndex: 'title',
    },
    {
      title: '類型',
      dataIndex: 'type',
      valueEnum: {
        ITEM: { text: '道具', status: 'Item' },
        CURRENCY: { text: '貨幣', status: 'Currency' },
        ACCOUNT: { text: '帳號', status: 'Account' },
      },
    },
    {
      title: '價格',
      dataIndex: 'basicPrice',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      valueEnum: {
        ACTIVE: { text: '上架', status: 'Success' },
        INACTIVE: { text: '下架', status: 'Default' },
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
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          編輯
        </a>,
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
        headerTitle="商品管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="create" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 建立商品
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
      <ModalForm
        title="建立商品"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values) => {
          try {
            await createCommodity(values);
            message.success('建立成功');
            handleModalVisible(false);
            actionRef.current?.reload();
            return true;
          } catch (error) {
            message.error('建立失敗');
            return false;
          }
        }}
      >
        <ProFormText name="title" label="標題" placeholder="請輸入標題" rules={[{ required: true }]} />
        <ProFormSelect name="type" label="類型" placeholder="請選擇類型" rules={[{ required: true }]}
          valueEnum={{
            ITEM: '道具',
            CURRENCY: '貨幣',
            ACCOUNT: '帳號',
          }}
        />
        <ProFormTextArea name="content" label="描述" placeholder="請輸入描述" />
        <ProFormDigit name="basicPrice" label="價格" placeholder="請輸入價格" rules={[{ required: true }]} />
      </ModalForm>
      <ModalForm
        title="編輯商品"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        initialValues={currentRow}
        onFinish={async (values) => {
          if (currentRow?.id) {
            await handleUpdate(currentRow.id, values);
          }
          return true;
        }}
      >
        <ProFormText name="title" label="標題" placeholder="請輸入標題" rules={[{ required: true }]} />
        <ProFormSelect name="type" label="類型" placeholder="請選擇類型" rules={[{ required: true }]}
          valueEnum={{
            ITEM: '道具',
            CURRENCY: '貨幣',
            ACCOUNT: '帳號',
          }}
        />
        <ProFormTextArea name="content" label="描述" placeholder="請輸入描述" />
        <ProFormDigit name="basicPrice" label="價格" placeholder="請輸入價格" rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
