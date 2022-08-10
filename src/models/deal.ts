import type { Reducer, Effect } from 'umi';

import { message } from 'antd';
import { fakeSubmitForm } from '@/services/deal';

export type FileModelState = {
};

export type DealModelType = {
  namespace: string;
  state: any;
  effects: {
    apply: Effect;
  };
  reducers: {
  };
};

const Model: DealModelType = {
  namespace: 'deal',
  state: {
  },
  effects: {
    *apply({ payload }, { call, put }) {
      const response = yield call(fakeSubmitForm, payload);
      console.log(response);
      // Login successfully
      if (response.ok) {
        message.success('🎉 🎉 🎉  上傳成功！');
        return;
      }
    },
  },
  reducers: {}
};

export default Model;
