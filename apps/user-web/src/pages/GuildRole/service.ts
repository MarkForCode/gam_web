// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/role';

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

export async function createRole(
  data: { name: string; description?: string; permissions: string[]; isDefault?: boolean },
  options?: { [key: string]: any },
) {
  return request(host, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateRole(
  id: string,
  data: { name?: string; description?: string; permissions?: string[]; isDefault?: boolean },
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
}

export async function removeRole(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function setDefaultRole(
  id: string,
  options?: { [key: string]: any },
) {
  return request(host + `/${id}/set-default`, {
    method: 'POST',
    ...(options || {}),
  });
}
