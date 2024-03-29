import React, { FC } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { connect, useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';
import { ConnectState } from '@/models/connect';
import { ModifyParamsType } from '@/services/user';




const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能


const BaseView: FC<Record<string, any>> = (props) => {
  const [avatar, setAvatar] = React.useState<string>('')
  const [avatarFile, setAvatarFile] = React.useState<File | undefined>(undefined)
  const { data: currentUser, loading } = useRequest(async () => {
    const current = await queryCurrent();
    let url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    if (current && current.data && current.data.avatar) {
      url = current.data.avatar;
    }
    setAvatar(url);
    return current;
  });


  const uploadProps = {
    maxCount: 1,
    listType: "picture",
    beforeUpload(file: any) {
      console.log(file)
      const url = URL.createObjectURL(file);
      setAvatar(url);
      setAvatarFile(file);
    },
    onChange(info: any) {
      console.log(info.fileList);
    },
    accept: ".jpg, .png",
    showUploadList: false,
  };

  const handleFinish = async (values: ModifyParamsType) => {
    console.log(values);
    const { dispatch } = props;
    dispatch({
      type: 'user/modifyProfile',
      payload: {
        ...values,
        avatar: avatarFile
      },
    });
  };

  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload {...uploadProps}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更換頭像
          </Button>
        </div>
      </Upload>
    </>
  );
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone,
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
              />
              <ProFormTextArea
                name="signature"
                label="个人简介"
                placeholder="个人简介"
              />
              {/* <ProFormText
                width="md"
                name="phone"
                label="联系电话"
              /> */}
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={avatar} />
          </div>
        </>
      )}
    </div>
  );
};

// export default BaseView;
export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['user/modifyProfile'],
}))(BaseView);
