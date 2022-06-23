import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  captchaComp: {
    code: string;
    codeId: string;
  }
};

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log(123, params);
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
