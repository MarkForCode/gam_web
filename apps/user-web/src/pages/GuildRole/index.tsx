import { message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import { rule, createRole, updateRole, removeRole, setDefaultRole } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();

  const handleRemove = async (id: string) => {
    const hide = message.loading('正在刪除');
    try {
      await removeRole(id);
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

  const handleSetDefault = async (id: string) => {
    const hide = message.loading('正在設定');
    try {
      await setDefaultRole(id);
      hide();
      message.success('設定成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('設定失敗，請重試');
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
      title: '角色名稱',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '權限',
      dataIndex: 'permissions',
      render: (_, record) => record.permissions?.join(', '),
    },
    {
      title: '預設',
      dataIndex: 'isDefault',
      render: (_, record) => record.isDefault ? '是' : '否',
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
        !record.isDefault && (
          <a
            key="default"
            onClick={async () => {
              Modal.confirm({
                title: '確認設為預設？',
                onOk: async () => {
                  await handleSetDefault(record.id);
                },
              });
            }}
          >
            設為預設
          </a>
        ),
        !record.isDefault && (
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
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <a key="create" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 建立角色
          </a>,
        ]}
        request={rule}
        columns={columns}
      />
      <ModalForm
        title="建立角色"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values) => {
          try {
            await createRole(values);
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
        <ProFormText name="name" label="角色名稱" placeholder="請輸入角色名稱" rules={[{ required: true }]} />
        <ProFormTextArea name="description" label="描述" placeholder="請輸入描述" />
        <ProFormSelect name="permissions" label="權限" mode="multiple" placeholder="請選擇權限"
          valueEnum={{
            commodity_create: '建立商品',
            commodity_edit: '編輯商品',
            commodity_delete: '刪除商品',
            deal_approve: '審核交易',
            fund_approve: '審核資金',
            member_manage: '管理成員',
            announcement_manage: '管理公告',
            role_manage: '管理角色',
          }}
        />
        <ProFormSwitch name="isDefault" label="設為預設" />
      </ModalForm>
      <ModalForm
        title="編輯角色"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        initialValues={currentRow}
        onFinish={async (values) => {
          if (currentRow?.id) {
            try {
              await updateRole(currentRow.id, values);
              message.success('更新成功');
              handleUpdateModalVisible(false);
              actionRef.current?.reload();
              return true;
            } catch (error) {
              message.error('更新失敗');
              return false;
            }
          }
          return true;
        }}
      >
        <ProFormText name="name" label="角色名稱" placeholder="請輸入角色名稱" rules={[{ required: true }]} />
        <ProFormTextArea name="description" label="描述" placeholder="請輸入描述" />
        <ProFormSelect name="permissions" label="權限" mode="multiple" placeholder="請選擇權限"
          valueEnum={{
            commodity_create: '建立商品',
            commodity_edit: '編輯商品',
            commodity_delete: '刪除商品',
            deal_approve: '審核交易',
            fund_approve: '審核資金',
            member_manage: '管理成員',
            announcement_manage: '管理公告',
            role_manage: '管理角色',
          }}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
