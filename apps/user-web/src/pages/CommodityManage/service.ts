// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/commodity';

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

export async function createCommodity(
  data: {
    title: string;
    type: string;
    content?: string;
    file?: string;
    basicPrice: number;
  },
  options?: { [key: string]: any },
) {
  return request(host, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateCommodity(
  id: string,
  data: {
    title?: string;
    type?: string;
    content?: string;
    file?: string;
    basicPrice?: number;
  },
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
}

export async function removeCommodity(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function uploadFile(
  data: { file: string },
  options?: { [key: string]: any },
) {
  const fileHost = API_URL + '/api/v1/guild/file';
  return request(fileHost, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
