// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/account';

export async function rule(
  params: TableListParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>(host, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function removeMember(
  username: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${username}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function updateMember(
  username: string,
  data: { nickname?: string; email?: string },
  options?: { [key: string]: any },
) {
  return request(host + `/${username}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}
