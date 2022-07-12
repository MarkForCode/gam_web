import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return {
    name: window.localStorage.getItem('userName') || 'sefs',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
  };
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
