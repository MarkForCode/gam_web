import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { Fragment, useState } from 'react';

import classNames from 'classnames';
import { useRequest } from 'umi';
import type { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';
import styles from './style.less';

const ButtonGroup = Button.Group;

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>轉帳</Button>
      {/* <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown> */}
    </ButtonGroup>
    <Button type="primary">提款</Button>
  </Fragment>
);


const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志',
  },
];

const columns = [
  {
    title: '操作動作',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

type AccountAdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};

const AccountAdvanced: FC = () => {
  const [tabStatus, seTabStatus] = useState<AccountAdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const { data = {}, loading } = useRequest<{ data: AdvancedProfileData }>(queryAdvancedProfile);
  const { state, log } = data;
  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={log}
        columns={columns}
      />
    ),
  };

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="暱稱">{state?.name}</Descriptions.Item>
          <Descriptions.Item label="職位">XX 服务</Descriptions.Item>
          <Descriptions.Item label="創建時間">2017-07-07</Descriptions.Item>
          <Descriptions.Item label="公會">
            <a href="">{state?.group}</a>
          </Descriptions.Item>
          {/* <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item> */}
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  const extra = (
    <div className={styles.moreInfo}>
      {/* <Statistic title="狀態" value="待审批" /> */}
      <Statistic title="錢包" value={state?.amount} prefix="$" />
    </div>
  );

  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      // title="帳號：234231029431"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            onTabChange={onOperationTabChange}
          >
            {contentList[tabStatus.operationKey]}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default AccountAdvanced;
