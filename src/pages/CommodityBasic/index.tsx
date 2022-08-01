import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Card, Descriptions, Divider } from 'antd';
import { FC, useEffect, useState } from 'react';
import React from 'react';
import { useLocation, useParams, useRequest } from 'umi';
import type { BasicGood, BasicProgress } from './data.d';
import { queryBasicProfile } from './service';
import styles from './style.less';

const CommodityBasic: FC = () => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});
  
  useEffect(() => {
    queryBasicProfile(params.id).then((d) => {
      console.log(d);
      setData(d.data);
      console.log(data);
    })
  }, []);


  const cardList = data && (
    <Descriptions title="退款申请" style={{ marginBottom: 32 }}>
      <Descriptions.Item label="取货单号">{data?.id}</Descriptions.Item>
    </Descriptions>
  );

  const userList = data?.creator && (
    <Descriptions title="用户信息" style={{ marginBottom: 32 }}>
      <Descriptions.Item label="用户姓名">{data?.creator?.nickname}</Descriptions.Item>
    </Descriptions>
  )
  
  const contentList = data?.content && (
    <div dangerouslySetInnerHTML={createMarkup()} />
  )
  function createMarkup() {
    return {__html: data.content};
  }
  return (
    <PageContainer>
      <Card bordered={false}>
        {cardList}
        <Divider style={{ marginBottom: 32 }} />
        {userList}
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>退货商品</div>
        {contentList}
      </Card>
    </PageContainer>
  );
};

export default CommodityBasic;
