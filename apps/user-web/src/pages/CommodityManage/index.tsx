import { message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDigit, ProFormDigitPro } from '@ant-design/pro-form';
import { rule, createCommodity, updateCommodity, removeCommodity } from './service';
import type { TableListItem, TableListPagination } from './data';

const statusMap = {
  ACTIVE: { text: '上架中', status: 'Success' },
  PENDING: { text: '待審核', status: 'Processing' },
  SOLD_OUT: { text: '售完', status: 'Default' },
  OFF_SHELF: { text: '已下架', status: 'Default' },
  DELETED: { text: '已刪除', status: 'Error' },
};

const typeMap = {
  ITEM: '道具',
  WEAPON: '武器',
  ARMOR: '防具',
};

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
    } catch (error: any) {
      hide();
      message.error(error?.message || '刪除失敗，請重試');
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
    } catch (error: any) {
      hide();
      message.error(error?.message || '更新失敗，請重試');
      return false;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '標題',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '類型',
      dataIndex: 'type',
      valueEnum: typeMap,
    },
    {
      title: '價格',
      dataIndex: 'basicPrice',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '庫存',
      dataIndex: 'quantity',
      hideInSearch: true,
      render: (_, record) => `${record.sellQuantity || 0}/${record.quantity}`,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      valueEnum: statusMap,
    },
    {
      title: '申請數',
      dataIndex: 'applyCount',
      hideInSearch: true,
      render: (_, record) => record.commodity_deal_apply?.length || 0,
    },
    {
      title: '建立時間',
      dataIndex: 'createTime',
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
          <EditOutlined /> 編輯
        </a>,
        record.commodity_deal_apply?.length === 0 && record.commodity_deal?.length === 0 && (
          <a
            key="delete"
            onClick={() => {
              Modal.confirm({
                title: '確認刪除？',
                onOk: async () => {
                  await handleRemove(record.id);
                },
              });
            }}
            style={{ color: '#ff4d4f' }}
          >
            <DeleteOutlined /> 刪除
          </a>
        ),
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
          } catch (error: any) {
            message.error(error?.message || '建立失敗');
            return false;
          }
        }}
      >
        <ProFormText name="title" label="標題" placeholder="請輸入標題" rules={[{ required: true }]} />
        <ProFormSelect
          name="type"
          label="類型"
          placeholder="請選擇類型"
          rules={[{ required: true }]}
          valueEnum={{
            ITEM: '道具',
            WEAPON: '武器',
            ARMOR: '防具',
          }}
        />
        <ProFormTextArea name="content" label="描述" placeholder="請輸入描述" />
        <ProFormDigit name="basicPrice" label="價格" placeholder="請輸入價格" rules={[{ required: true }]} />
        <ProFormDigit name="quantity" label="數量" placeholder="請輸入數量" initialValue={1} rules={[{ required: true }]} />
        <ProFormSelect
          name="publicLevel"
          label="可見範圍"
          valueEnum={{
            GUILD: '公會',
            PUBLIC: '公開',
          }}
          initialValue="GUILD"
        />
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
        <ProFormSelect
          name="type"
          label="類型"
          placeholder="請選擇類型"
          valueEnum={{
            ITEM: '道具',
            WEAPON: '武器',
            ARMOR: '防具',
          }}
        />
        <ProFormTextArea name="content" label="描述" placeholder="請輸入描述" />
        <ProFormDigit name="basicPrice" label="價格" placeholder="請輸入價格" />
        <ProFormDigit name="quantity" label="數量" placeholder="請輸入數量" />
        <ProFormSelect
          name="status"
          label="狀態"
          valueEnum={{
            ACTIVE: '上架中',
            OFF_SHELF: '已下架',
          }}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;