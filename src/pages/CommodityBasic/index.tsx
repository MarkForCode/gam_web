import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Button, Card, Col, Descriptions, Divider, Form, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import React from 'react';
import { connect, useLocation, useParams, useRequest } from 'umi';
import type { BasicGood, BasicProgress } from './data.d';
import { queryBasicProfile } from './service';
import styles from './style.less';
import StandardFormRow from '../ListCommodity/components/StandardFormRow';
import { ConnectState } from '@/models/connect';

const CommodityBasic: FC<Record<string, any>> = (props) => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    queryBasicProfile(params.id).then((d) => {
      console.log(d);
      setData(d);
      console.log(data);
    })
  }, []);

  const handleSubmit = (commodityId: string) => {
    const { dispatch } = props;
    dispatch({
      type: 'deal/apply',
      payload: {
        commodityId
      },
    });
  };

  const cardList = data && (
    <Descriptions title="商品資訊" style={{ marginBottom: 32 }}>
      <Descriptions.Item label="取货单号">{data?.id}</Descriptions.Item>
    </Descriptions>
  );

  const userList = data?.members && data.members && (
    <Descriptions title="用户信息" style={{ marginBottom: 32 }}>
      <Descriptions.Item label="用户姓名">{data?.members[0]?.name}</Descriptions.Item>
    </Descriptions>
  )

  const contentList = data?.content && (
    <div dangerouslySetInnerHTML={createMarkup()} />
  )
  function createMarkup() {
    return { __html: data.content };
  }
  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          layout="inline"
          onFinish={(values) => {
            console.log(data);
            handleSubmit(data.id);
            return Promise.resolve();
          }}
        >
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
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
    </PageContainer >
  );
};

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['deal/apply'],
}))(CommodityBasic);
