import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule, auditRule } from './service';
import type { TableListItem, TableListPagination } from './data';

/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};


/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleAudit = async (selectedRows: TableListItem) => {
  const hide = message.loading('正在查收');
  if (!selectedRows) return true;

  try {
    await auditRule({
      commodityId: selectedRows.commodityId,
    });
    hide();
    message.success('查收成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('查收失败，请重试');
    return false;
  }
};


const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'commodityId',
      hideInTable: true,
    },
    {
      title: '標題',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '出價',
      dataIndex: 'bid',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        ALL: {
          text: '-',
          status: 'ALL',
        },
        SHELF: {
          text: '待交易',
          status: 'SHELF',
        },
        PENDING: {
          text: '待審核交易',
          status: 'PENDING',
        },
        CONFIRM: {
          text: '確認查收',
          status: 'CONFIRM',
        },
        PROCESSING: {
          text: '等待對方付款',
          status: 'PROCESSING',
        }
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      hideInSearch: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          查看
        </a>,
        (record.status == 'PROCESSING' || record.status == 'SELLER CONFIRM') && <a
          key="config"
          onClick={async () => {
            setCurrentRow(record);
            if (confirm('確認查收？')) {
              await handleAudit(record);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }
          }}
        >
          查收
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
