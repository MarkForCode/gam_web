import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import jwt_decode from "jwt-decode";
import { fakeAccountRegister } from '@/services/register';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type RegisterModelType = {
  namespace: string;
  state: StateType;
  effects: {
    trial: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: RegisterModelType = {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *trial({ payload }, { call, put }) {
      const response = yield call(fakeAccountRegister, payload);
      console.log(response);
      // register successfully
      if (response.status === 'ok') {
        message.success('注册成功！');
        history.push({
          pathname: '/user/login',
          state: {
            account: payload.email,
          },
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
