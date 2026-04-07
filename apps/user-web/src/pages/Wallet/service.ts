// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/wallet';

export async function rule(
  params: TableListParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>(host + '/withdraw', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createWithdraw(
  data: { amount: number; walletPassword: string },
  options?: { [key: string]: any },
) {
  return request(host + '/withdraw', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function createTransfer(
  data: { amount: number; targetUsername: string },
  options?: { [key: string]: any },
) {
  return request(host + '/transfer', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function removeRecord(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
