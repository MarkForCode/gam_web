import { Button, Card, Col, Form, Input, List, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useRequest, history } from 'umi';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType, Params } from './data.d';
import { queryFakeList } from './service';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const ListCommodity: FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItemDataType[]>([]);
  const [list, setList] = useState<ListItemDataType[]>([]);
  const [params, setParams] = useState<Params>({});
  const [cursor, setCursor] = useState<string>('');
  useEffect(() => {
    onLoadMore().then(() => {
      setInitLoading(false);
    })
  }, []);


  const onLoadMore = () => {
    console.log(params);
    setLoading(true);
    return queryFakeList({ ...params, cursor })
      .then(res => {
        console.log(res);
        let ll;
        if (cursor == '' && res.data.list.length > 8) {
          ll = res.data.list.splice(0, 8);
        } else {
          ll = res.data.list.filter((l) => l.id != cursor)
        }
        const newData = data.concat(ll);
        setData(newData);
        setList(newData);
        setCursor(newData[newData.length - 1].id);
        if (ll.length >= 8) {
          setLoading(false);
        }
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={initLoading}
      loadMore={loadMore}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          onClick={(event) => {
            history.push('/commodity/detail/' + item.id);
          }}>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                  <br></br>
                  {item.id}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt || item.createdAt).fromNow()}</span>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onFinish={(values) => {
            setLoading(true);
            setParams(values);
            queryFakeList(values)
              .then(res => {
                console.log(res);
                const newData = res.data.list;
                setData(newData);
                setList(newData);
                if (newData.length >= 8) {
                  setLoading(false);
                }
                window.dispatchEvent(new Event('resize'));
              });
          }}
        >
          {/* <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow> */}
          <StandardFormRow title="选项" grid last>
            <Row gutter={16}>
              {/* <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="作者" name="author">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">mark</Option>
                  </Select>
                </FormItem>
              </Col> */}
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="標題" name="title">
                  <Input />
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="分類" name="type">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    filterSort={(optionA, optionB) =>
                      (optionA!.children as unknown as string)
                        .toLowerCase()
                        .localeCompare((optionB!.children as unknown as string).toLowerCase())
                    }
                  >
                    <Option value="-">-</Option>
                    <Option value="ITEM">ITEM</Option>
                    <Option value="WEAPON">WEAPON</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    查詢
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default ListCommodity;
