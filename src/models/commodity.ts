import type { Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/commodity';

export type FileModelState = {
};

export type CommodityModelType = {
  namespace: string;
  state: any;
  effects: {
    upload: Effect;
  };
  reducers: {
  };
};

const Model: CommodityModelType = {
  namespace: 'commodity',
  state: {
  },
  effects: {
    *upload({ payload }, { call, put }) {
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
