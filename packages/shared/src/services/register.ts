
export type RegisterParamsType = {
  guild: string;
  platform: string;
  username: string;
  password: string;
  mail: string;
};

const host = API_URL + '/api/v1/guild/trial';

export async function fakeAccountRegister(params: RegisterParamsType) {
  console.log(123, params);
  const data = await fetch(host, {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      guild: params.guild,
      platform: params.platform,
      password: params.password,
      username: params.username,
      mail: params.mail,
    }),
    method: 'POST',
  })
  const res = JSON.parse(await data.text());
  console.log(res);
  return res;
}
