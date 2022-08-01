import { request } from 'umi';
import type { BasicGood, BasicProgress } from './data.d';

const host = API_URL + '/api/v1/guild/commodity';

export async function queryBasicProfile(id: string): Promise<{
  data: {
    id: string,
    creator: any,
    title: string,
    content: string,
  };
}> {
  console.log(id);
  const result = await request(host + `/${id}`);
  console.log(result)
  return result;
}
