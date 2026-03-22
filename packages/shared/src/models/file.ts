import type { Reducer, Effect } from 'umi';

import { message } from 'antd';
import { fakeSubmitForm } from '@/services/file';

export type FileModelState = {
};

export type FileModelType = {
  namespace: string;
  state: any;
  effects: {
    upload: Effect;
  };
  reducers: {
  };
};

const Model: FileModelType = {
  namespace: 'file',
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
