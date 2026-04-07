// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/invite';

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

export async function createInvite(
  data: { inviteeEmail: string; message?: string },
  options?: { [key: string]: any },
) {
  return request(host, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function getInviteByCode(
  code: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${code}`, {
    method: 'GET',
    ...(options || {}),
  });
}
