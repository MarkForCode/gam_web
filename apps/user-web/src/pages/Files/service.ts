// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/file';

export async function rule(
  params: TableListParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>(host + '/presigned', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function uploadFile(
  data: { file: string },
  options?: { [key: string]: any },
) {
  return request(host, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function removeFile(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
