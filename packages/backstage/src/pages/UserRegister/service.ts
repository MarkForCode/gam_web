import { request } from 'umi';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
}

const host = API_URL + '/api/v1/guild/trial';
export async function fakeRegister(params: UserRegisterParams) {
  const res = await request(host, {
    method: 'POST',
    data: params,
  });
  console.log(res);
  return res;
}
