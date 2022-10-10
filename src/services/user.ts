import request from '@/utils/request';
import jwt_decode from "jwt-decode";

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
