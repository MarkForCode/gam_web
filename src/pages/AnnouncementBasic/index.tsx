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
import ButtonGroup from 'antd/lib/button/button-group';

const AnnouncementBasic: FC<Record<string, any>> = (props) => {

  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    console.log(params.id)
    queryBasicProfile(params.id).then((d) => {
      console.log(d);
      setData(d);
      console.log(data);
    })
  }, []);

  const cardList = data && (
    <>
      <Row justify="space-around">
        <Col span={16}>
          <Descriptions title="商品資訊" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商品名稱">{data?.title}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );

  const contentList = data?.content && (
    <div dangerouslySetInnerHTML={createMarkup()} />
  )
  function createMarkup() {
    return { __html: data.content };
  }

  return (
    <PageContainer
    >
      <Card bordered={false}>
        {cardList}
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>公告內容</div>
        {contentList}
      </Card>
    </PageContainer >

  );
};

export default AnnouncementBasic
