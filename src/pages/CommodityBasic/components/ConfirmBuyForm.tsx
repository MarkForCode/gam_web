import React from 'react';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
  ModalForm,
  ProFormDigit,
} from '@ant-design/pro-form';
import type { BidType } from '../data';


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: BidType) => void;
  onSubmit: (values: BidType) => Promise<void>;
  updateModalVisible: boolean;
  basicPrice: number;
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
      <ProFormDigit
        name="bid"
        label="出價"
        width="md"
        initialValue={props.basicPrice}
        rules={[
          {
            required: true,
            message: '請輸入價格！',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
