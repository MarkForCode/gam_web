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
import type { CurrentUser } from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<CurrentUser>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
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
        name="password"
        label="规则名称"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入规则名称！',
          },
        ]}
      />
      <ProFormText
        name="password2"
        label="规则名称"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入规则名称！',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
