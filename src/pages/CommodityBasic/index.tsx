import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Image, Button, Card, Col, Descriptions, Divider, Form, Row, message } from 'antd';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import React from 'react';
import { connect, useLocation, useParams, useRequest } from 'umi';
import type { BasicGood, BasicProgress } from './data.d';
import { queryBasicProfile } from './service';
import styles from './style.less';
import StandardFormRow from '../ListCommodity/components/StandardFormRow';
import { ConnectState } from '@/models/connect';
import ConfirmBuyForm from './components/ConfirmBuyForm';
import ButtonGroup from 'antd/lib/button/button-group';



const CommodityBasic: FC<Record<string, any>> = (props) => {
  const [ConfirmBuyModalVisible, handleConfirmBuyModalVisible] = useState<boolean>(false);

  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    queryBasicProfile(params.id).then((d) => {
      console.log(d);
      setData(d);
      console.log(data);
    })
  }, []);

  const handleSubmit = (commodityId: string, bid: number) => {
    const { dispatch } = props;
    dispatch({
      type: 'deal/apply',
      payload: {
        commodityId,
        bid
      },
    });
  };

  const cardList = data && (
    <>
      <Row justify="space-around">
        <Col span={7}>
          <Image src={data?.avatar}></Image>
        </Col>
        <Col span={16}>
          <Descriptions title="商品資訊" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商品名稱">{data?.title}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商品價格">{data?.basicPrice}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );

  const userList = data?.members && data.members && (
    <Descriptions title="賣家資訊" style={{ marginBottom: 32 }}>
      <Descriptions.Item label="用户姓名">{data?.members[0]?.name}</Descriptions.Item>
    </Descriptions>
  )

  const contentList = data?.content && (
    <div dangerouslySetInnerHTML={createMarkup()} />
  )
  function createMarkup() {
    return { __html: data.content };
  }

  const action = (
    <Fragment>
      <Form
        layout="inline"
        onFinish={(values) => {
          console.log(data, values);
          handleConfirmBuyModalVisible(true);
          return Promise.resolve();
        }}
      >
        <ButtonGroup>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">購買</Button>
          </Form.Item>
        </ButtonGroup>
      </Form>
    </Fragment>
  );
  return (
    <PageContainer
      extra={action}
    >
      <Card bordered={false}>
        {cardList}
        <Divider style={{ marginBottom: 32 }} />
        {userList}
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>商品內容</div>
        {contentList}
        {//TODO:
        /* <div className={styles.title}>評價</div>
        <ProTable
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          search={false}
          options={false}
          toolBarRender={false}
          dataSource={basicProgress}
          columns={progressColumns}
        /> */}
      </Card>

      <ConfirmBuyForm
        basicPrice={data.basicPrice}
        onSubmit={async (value) => {
          console.log(value);
          handleSubmit(data.id, value.bid);
          handleConfirmBuyModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleConfirmBuyModalVisible(false);
        }}
        updateModalVisible={ConfirmBuyModalVisible}
      />
    </PageContainer >

  );
};

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['deal/apply'],
}))(CommodityBasic);
