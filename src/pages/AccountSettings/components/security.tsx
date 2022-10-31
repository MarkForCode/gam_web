import React, { useRef, useState } from 'react';
import { List, message } from 'antd';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import { ActionType } from '@ant-design/pro-table';
import { CurrentUser, useRequest } from 'umi';
import { modifyPassword, queryCurrent } from '../service';
import { PasswordType } from '../data';

type Unpacked<T> = T extends (infer U)[] ? U : T;


/**
 * 删除节点
 *
 * @param selectedRows
 */
 const handleModifyPassword = async (selectedRows: PasswordType) => {
  const hide = message.loading('正在修改');
  if (!selectedRows) return true;

  try {
    await modifyPassword({
      password: selectedRows.password,
    });
    hide();
    message.success('修改成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

const SecurityView: React.FC = () => {
  const [updatePasswordModalVisible, handleUpdatePasswordModalVisible] = useState<boolean>(false);
  const [updateEmailModalVisible, handleUpdateEmailModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });
  const getData = () => [
    {
      title: '账户密码',
      // description: (
      //   <>
      //     当前密码强度：
      //     {passwordStrength.strong}
      //   </>
      // ),
      actions: [<a key="Modify" onClick={() => {
        handleUpdatePasswordModalVisible(true);
      }} > 修改</a >
      ],
    },
    // {
    //   title: '密保手机',
    //   description: `已绑定手机：138****8293`,
    //   actions: [<a key="Modify" onClick={() => {
    //     handleUpdateModalVisible(true);
    //   }}>修改</a>],
    // },
    // {
    //   title: '邮箱',
    //   description: `已绑定邮箱：${currentUser?.email || ''}`,
    //   actions: [<a key="Modify" onClick={() => {
    //     handleUpdateEmailModalVisible(true);
    //   }}>修改</a>],
    // },
    // {
    //   title: 'MFA 设备',
    //   description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    //   actions: [<a key="bind">绑定</a>],
    // },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />

      <UpdatePasswordForm
        onSubmit={async (value) => {
          console.log(value);
          handleModifyPassword(value);
          handleUpdatePasswordModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleUpdatePasswordModalVisible(false);
        }}
        updateModalVisible={updatePasswordModalVisible}
      />

      <UpdateEmailForm
        onSubmit={async (value) => {
          console.log(value);
          handleModifyPassword(value);
          handleUpdateEmailModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleUpdateEmailModalVisible(false);
        }}
        updateModalVisible={updateEmailModalVisible}
      />
    </>
  );
};

export default SecurityView;
