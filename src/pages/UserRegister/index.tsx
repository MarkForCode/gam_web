import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import type { Store } from 'antd/es/form/interface';
import { Link, useRequest, history, connect } from 'umi';
import type { StateType } from './service';
import { fakeRegister } from './service';

import styles from './style.less';
import { fetchPlatformList } from '@/components/Authorized/GuildSelectInput';
import { RegisterParamsType } from '@/services/register';
import { ConnectState } from '@/models/connect';
import type { Dispatch } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};


export type RegisterProps = {
  dispatch: Dispatch;
  submitting?: boolean;
};
const UserRegister: FC<RegisterProps> = (props) => {
  const { submitting } = props;
  const [count, setCount]: [number, any] = useState(0);
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  const [platformInput, setPlatformInput] = useState<string>('');
  const [platformFetching, setPlatformFetching] = useState(false);
  const [platformOptions, setPlatformOptions] = useState<any[]>([]);

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  useEffect(() => {
    fetchPlatformList().then((newOptions) => {
      console.log(newOptions);
      setPlatformOptions(newOptions);
      setPlatformFetching(false);
    })
  }, [])

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const handleSubmit = (values: RegisterParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'register/trial',
      payload: { ...values },
    });
  };

  const onFinish = (values: any) => {
    handleSubmit(values as RegisterParamsType);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const onChangePlatformInput = (platform: string) => {
    setPlatformInput(platform);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>

        <FormItem
          name="platform"
          rules={[
            {
              required: true,
              message: '請輸入平台!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a platform"
            onChange={onChangePlatformInput}
            options={platformOptions}
            value={platformInput}
          >
          </Select>
        </FormItem>

        <FormItem
          name="guild"
          rules={[
            {
              required: true,
              message: '請輸入公會名稱!',
            },
          ]}
        >
          <Input size="large" placeholder="公會" />
        </FormItem>

        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: '请输入英文帳號!',
            },
            {
              type: 'string',
              pattern: /^[a-z]+$/,
              transform(value) {
                return value.trim();
              },
              message: '帳號格式錯誤!',
            },
          ]}
        >
          <Input size="large" placeholder="帳號" />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: '确认密码',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        <FormItem
          name="mail"
          rules={[
            {
              required: true,
              message: '请输入邮箱地址!',
            },
            {
              type: 'email',
              message: '邮箱地址格式错误!',
            },
          ]}
        >
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        {/*TODO: <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            >
              <Input size="large" placeholder="验证码" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row> */}
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <span>注册</span>
          </Button>
          <Link className={styles.login} to="/user/login">
            <span>使用已有账户登录</span>
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};


export default connect(({ login, loading }: ConnectState) => ({
  submitting: loading.effects['register/trial'],
}))(UserRegister);