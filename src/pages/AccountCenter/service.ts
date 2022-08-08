import { request } from 'umi';
import type { CurrentUser, ListItemDataType } from './data.d';

const host = API_URL + '/api/v1/guild/account';
const announceHost = API_URL + '/api/v1/guild/announce';
export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  const rr =await request(host + '/state');
  console.log(rr)
  return rr;
}

export async function querySystemAnnouncementList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  const ww = await request(announceHost + '/system');
  console.log(ww);
  return ww;
}

export async function queryGuildAnnouncementList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  const ww = await request(announceHost + '/guild');
  console.log(ww);
  return ww;
}

