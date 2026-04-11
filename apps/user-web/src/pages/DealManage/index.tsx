import { message, Modal, Form, InputNumber } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchDeals, approveDeal, buyerConfirmDeal, sellerConfirmDeal } from './service';
import type { DealItem, DealParams } from './data';

const statusMap = {
  PENDING: { text: '待審核', status: 'Processing' },
  CONFIRMING: { text: '確認中', status: 'Warning' },
  COMPLETED: { text: '已完成', status: 'Success' },
  CANCELLED: { text: '已取消', status: 'Error' },
};

const DealManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [approving, setApproving] = useState<any>(null);
  const [confirming, setConfirming] = useState<any>(null);
  const [taxForm] = Form.useForm();

  const handleApprove = async (values: any) => {
    try {
      await approveDeal({
        commodityId: approving.commodityId,
        buyerId: approving.buyerId,
        quantity: values.quantity,
      });
      message.success('已選擇買家');
      setApproving(null);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error(error?.message || '操作失敗');
      return false;
    }
  };

  const handleBuyerConfirm = async (deal: any) => {
    try {
      await buyerConfirmDeal({ id: deal.id });
      message.success('已確認，請通知賣家進行遊戲內交易');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error(error?.message || '確認失敗');
      return false;
    }
  };

  const handleSellerConfirm = async (values: any) => {
    try {
      await sellerConfirmDeal({
        id: confirming.id,
        tax: values.tax,
      });
      message.success('交易完成，已分潤');
      setConfirming(null);
      taxForm.resetFields();
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error(error?.message || '操作失敗');
      return false;
    }
  };

  const columns: ProColumns<DealItem>[] = [
    {
      title: '商品',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '售價',
      dataIndex: 'basicPrice',
      hideInSearch: true,
    },
    {
      title: '庫存',
      dataIndex: 'quantity',
      hideInSearch: true,
      render: (_, record) => `${record.sellQuantity || 0}/${record.quantity}`,
    },
    {
      title: '申請人',
      dataIndex: 'applies',
      hideInSearch: true,
      render: (_, record) => (
        <div>
          {record.commodity_deal_apply?.map((apply: any) => (
            <div key={apply.buyerId} style={{ marginBottom: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
              <div>
                <strong>{apply.buyer.nickname}</strong> ({apply.buyer.username})
              </div>
              <div>出價: {apply.bid} × {apply.quantity}</div>
              <div style={{ marginTop: 4 }}>
                <a
                  onClick={() => {
                    setApproving({
                      commodityId: apply.commodityId,
                      buyerId: apply.buyerId,
                      buyerName: apply.buyer.nickname,
                      bid: apply.bid,
                    });
                  }}
                >
                  選擇此人
                </a>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: '交易狀態',
      dataIndex: 'dealStatus',
      hideInSearch: true,
      render: (_, record) => {
        const deal = record.commodity_deal?.[0];
        if (!deal) return '-';
        return (
          <div>
            <div>買家: {deal.buyer.nickname}</div>
            <div>金額: {deal.bid} × {deal.quantity}</div>
            <div>狀態: {statusMap[deal.status as keyof typeof statusMap]?.text || deal.status}</div>
            <div>
              買家確認: {deal.buyerConfirmTime ? '✓' : '✗'}
              <br />
              賣家確認: {deal.sellerConfirmTime ? '✓' : '✗'}
            </div>
            <div style={{ marginTop: 8 }}>
              {!deal.buyerConfirmTime && deal.status === 'CONFIRMING' && (
                <a onClick={() => handleBuyerConfirm(deal)}>
                  <CheckOutlined /> 我已收到物品
                </a>
              )}
              {deal.buyerConfirmTime && !deal.sellerConfirmTime && deal.status === 'CONFIRMING' && (
                <a
                  onClick={() => {
                    setConfirming(deal);
                  }}
                >
                  <CheckOutlined /> 確認並分潤
                </a>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<DealItem, DealParams>
        headerTitle="交易管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={fetchDeals}
        columns={columns}
      />

      <Modal
        title="選擇買家"
        open={!!approving}
        onCancel={() => setApproving(null)}
        onOk={() => {
          taxForm.validateFields().then(handleApprove);
        }}
      >
        <Form form={taxForm} layout="vertical">
          <div style={{ marginBottom: 16 }}>
            選擇 <strong>{approving?.buyerName}</strong> 作為買家
          </div>
          <div style={{ marginBottom: 16 }}>
            出價: <strong>{approving?.bid}</strong>
          </div>
          <Form.Item
            name="quantity"
            label="允許數量"
            initialValue={1}
            rules={[{ required: true, message: '請輸入數量' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="確認交易並分潤"
        open={!!confirming}
        onCancel={() => {
          setConfirming(null);
          taxForm.resetFields();
        }}
        onOk={() => {
          taxForm.validateFields().then(handleSellerConfirm);
        }}
      >
        <Form form={taxForm} layout="vertical">
          <div style={{ marginBottom: 16 }}>
            買家已確認收到物品，請輸入交易稅率並確認完成交易
          </div>
          <Form.Item
            name="tax"
            label="交易稅率 (%)"
            initialValue={5}
            rules={[{ required: true, message: '請輸入稅率' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default DealManage;