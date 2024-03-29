import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest, history } from 'umi';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule, auditRule } from './service';
import type { TableListItem, TableListPagination } from './data';
/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hiderule = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
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
const handleRemove = async (selectedRows: TableListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      commodityId: selectedRows.commodityId,
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
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  // const [cursor, setCursor] = useState<string>('');

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
      copyable: true,
      ellipsis: true,
    },
    {
      title: '價格',
      dataIndex: 'basicPrice',
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
        // record.status == '' && <a
        //   key="config"
        //   onClick={() => {
        //     setCurrentRow(record);
        //   }}
        // >
        //   修改
        // </a>,
        record.status == 'SHELF' && <a
          key="config"
          onClick={async () => {
            setCurrentRow(record);
            if (confirm('確認下架？')) {
              await handleRemove(record);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }
          }}
        >
          下架
        </a>,
        record.status == 'PENDING' && <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          審核
        </a>,
        (record.status == 'PROCESSING' || record.status == 'BUYER CONFIRM') && <a
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
        rowKey="commodityId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/commodity/form');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, option) => {
          const rr = await rule({
            ...params,
            // cursor
          }, option)
          // if (rr.current && rr.current > 2) {
          //   setCursor(rr.data[rr.data.length - 1].commodityId);
          // } else {
          //   setCursor('');
          // }

          return rr;
        }}
        columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
      // }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
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
