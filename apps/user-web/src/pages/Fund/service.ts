// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/fund';

export async function rule(
  params: TableListParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>(host + '/withdraw/applicant', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateStatus(
  id: string,
  data: { status: string },
  options?: { [key: string]: any },
) {
  return request(host + `/withdraw/applicant/${id}`, {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
}

export async function removeRecord(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/withdraw/applicant/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getFundState(
  options?: { [key: string]: any },
) {
  return request(host + '/state', {
    method: 'GET',
    ...(options || {}),
  });
}
