import request from '@/utils/request';
import jwt_decode from "jwt-decode";
import { fakeUploadImage } from './file';

const host = API_URL + '/api/v1/guild/account';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  const exp = window.localStorage.getItem('exp');
  const accessToken = window.localStorage.getItem('token');
  if (exp && parseInt(exp) > new Date().valueOf() - 10000 && accessToken) {
    const ss: any = jwt_decode(accessToken);
    console.log(ss);
    return {
      name: ss.user.nickname || '',
      avatar: ss.user.avatar || '',
      userid: ss.user.id || '',
      email: ss.user.email || '',
      signature: ss.user.signature || '',
      // title: '',
      role: ss.user.role || '',
      group: ss.user.group || '',
      // tags: [
      //   {
      //     key: '0',
      //     label: '很有想法的',
      //   },
      // ],
      // country: 'China',
      // geographic: {
      //   province: {
      //     label: '浙江省',
      //     key: '330000',
      //   },
      //   city: {
      //     label: '杭州市',
      //     key: '330100',
      //   },
      // },
      // address: '西湖区工专路 77 号',
    };
  } else {
    window.localStorage.removeItem('token')
  }
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}


export type ModifyParamsType = {
  nickname: string;
  avatar: File;
  email: string;
  phone: string;
  signature: string;
};

export async function modifyProfile(params: ModifyParamsType) {
  console.log(123, params);
  let key;
  if (params.avatar) {
    key = await fakeUploadImage(params.avatar);
  }
  
  const body = {
    nickname: params.nickname,
    email: params.email,
    phone: params.phone,
    signature: params.signature,
    avatar: key?.path,
  };
  console.log(body);
  const data = await fetch(host + '/state', {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
    method: 'PUT',
  })
  const res = JSON.parse(await data.text());
  console.log(res);
  return res;
}
