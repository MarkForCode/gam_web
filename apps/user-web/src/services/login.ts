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
    body: JSON.stringify({
      platform_id: params.guild.platform,
      guild_id: params.guild.guild,
      username: params.username,
      password: params.password,
      captcha: params.captchaComp.code,
      captcha_id: params.captchaComp.codeId,
    }),
    method: 'POST',
  })
  const text = await data.text();
  if (!data.ok) {
    const error = new Error(text || `HTTP error ${data.status}`) as Error & { status?: number };
    error.status = data.status;
    throw error;
  }
  const res = JSON.parse(text);
  console.log(res);
  return res;
}
