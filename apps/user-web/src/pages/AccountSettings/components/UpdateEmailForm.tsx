import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
  ModalForm,
} from '@ant-design/pro-form';
import type { CurrentUser, PasswordType } from '../data';


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: PasswordType) => void;
  onSubmit: (values: PasswordType) => Promise<void>;
  updateModalVisible: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      width={640}
      title="规则配置"
      visible={props.updateModalVisible}
      // footer={submitter}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.onCancel()
        }
      }}
    >
      <ProFormText
        name="email"
        label="Email"
        width="md"
        rules={[
          {
            required: true,
            message: '請輸入Email！',
          },
        ]}
      />
      <ProFormText
        name="code"
        label="驗證碼"
        width="md"
        rules={[
          {
            required: true,
            message: '請輸入驗證碼！',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
