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
import type { TableListItem } from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      width={640}
      title="審核"
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
        name="name"
        label="规则名称"
        width="md"
        initialValue={props.values.name}
        disabled
        rules={[
          {
            required: true,
            message: '请输入规则名称！',
          },
        ]}
      />
      <ProFormSelect
        name="buyerId"
        width="md"
        label="监控对象"
        options={
          props.values.buyers?.map((b) => {
            return {
              label: b.username + '(' + props.values.bid + ')',
              value: b.id,
            }
          })
        }
        rules={[
          {
            required: true,
            message: '請確認購買者！'
          }
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
