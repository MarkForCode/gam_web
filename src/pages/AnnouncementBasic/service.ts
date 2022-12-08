import { request } from 'umi';

const host = API_URL + '/api/v1/guild/announce';

export async function queryBasicProfile(id: string): Promise<{
    id: string,
    creator: any,
    title: string,
    content: string,
}> {
  console.log(id);
  const result = await request(host + `/guild/${id}`);
  console.log(result)
  return result;
}
