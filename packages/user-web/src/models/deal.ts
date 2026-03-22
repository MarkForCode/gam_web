import type { Reducer, Effect } from 'umi';

import { message } from 'antd';
import { fakeSubmitForm } from '@gam/shared/services/deal';

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
      if (response === true) {
        message.success('🎉 🎉 🎉  出價成功！');
        return;
      } else {
        message.error(response.message)
      }
    },
  },
  reducers: {}
};

export default Model;
