// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

const host = API_URL + '/api/v1/guild/announce';

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host + '/guild', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  console.log(res);
  return res;
}

/** 新建规则 PUT /api/rule */
export async function updateRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(host, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(host + '/guild/' + data.key, {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
