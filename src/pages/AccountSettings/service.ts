import { request } from 'umi';
import type { CurrentUser, GeographicItemType } from './data';

const host = API_URL + '/api/v1/guild/account';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  const result = await request(host + '/state');
  console.log(result);
  return result;
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/api/geographic/province');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
