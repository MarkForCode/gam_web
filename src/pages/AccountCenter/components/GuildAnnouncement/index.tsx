import React from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { useRequest } from 'umi';
import { List, Tag } from 'antd';
import ArticleListContent from '../ArticleListContent';
import type { ListItemDataType } from '../../data';
import { queryGuildAnnouncementList, querySystemAnnouncementList } from '../../service';
import styles from './index.less';

const GuildAnnouncement: React.FC = () => {
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  // 获取tab列表数据
  const { data: listData } = useRequest(() => {
    return queryGuildAnnouncementList({
      count: 30,
    });
  });
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={listData?.list || []}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            // <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            // <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            // <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={`/guild-announcement/detail/${item.id}`}>
                {item.title}
              </a>
            }
            description={
              <span>
                {/* <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag> */}
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default GuildAnnouncement;
