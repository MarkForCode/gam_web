import request from '@/utils/request';

export type LoginParamsType = {
  guild: {
    guild: string;
    platform: string;
  }
  username: string;
  password: string;
  captchaComp: {
    code: string;
    codeId: string;
  }
};

const host = API_URL + '/api/v1/guild/login';

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log(123, params);
  const data = await fetch(host, {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(params),
    method: 'POST',
  })
  const res = JSON.parse(await data.text());
  console.log(res);
  return res;
}
