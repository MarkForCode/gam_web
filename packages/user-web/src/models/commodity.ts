import { Reducer, Effect, history } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from '@gam/shared/services/commodity';

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
        history.replace('/commodity/list');
        return;
      }
    },
  },
  reducers: {}
};

export default Model;
