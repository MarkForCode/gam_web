import { request } from 'umi';
import type { Params, ListItemDataType } from './data';

const host = API_URL + '/api/v1/guild/commodity';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  console.log(params);
  return request(host, {
    params: {
      ...params,
      type: params.type == ''? undefined: params.type,
    },
  });
}
