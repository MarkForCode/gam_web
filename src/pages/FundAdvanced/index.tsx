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

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">主操作</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);


const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="error" text="驳回" />;
    },
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

type FundAdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};

const FundAdvanced: FC = () => {
  const [tabStatus, seTabStatus] = useState<FundAdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const { data = {}, loading } = useRequest<{ data: AdvancedProfileData }>(queryAdvancedProfile);
  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />
    ),
    tab2: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={columns}
      />
    ),
    tab3: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={columns}
      />
    ),
  };
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      title="单号：234231029431"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      tabList={[
        {
          key: 'detail',
          tab: '详情',
        },
      ]}
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

export default FundAdvanced;
