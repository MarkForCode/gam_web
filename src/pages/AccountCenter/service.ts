import { request } from 'umi';
import type { CurrentUser, ListItemDataType } from './data.d';

const host = API_URL + '/api/v1/guild/account';
const announceHost = API_URL + '/api/v1/guild/announce';
export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  const rr =await request(host + '/state');
  console.log(rr)
  return rr;
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  const rr = await request(announceHost);
  console.log(rr);
  return rr;
}
