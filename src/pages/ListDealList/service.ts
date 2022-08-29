// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem, TableListParams } from './data';

const host = API_URL + '/api/v1/guild/deal';
const commodityHost = API_URL + '/api/v1/guild/commodity';

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
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
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

export async function updateRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(host, {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(commodityHost, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(data: { commodityId: string }, options?: { [key: string]: any }) {
  console.log(data);
  return request<Record<string, any>>(commodityHost + `/${data.commodityId}`, {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function auditRule(data: { commodityId: string }, options?: { [key: string]: any }) {
  console.log(data);
  return request<Record<string, any>>(host, {
    data,
    method: 'PATCH',
    ...(options || {}),
  });
}
