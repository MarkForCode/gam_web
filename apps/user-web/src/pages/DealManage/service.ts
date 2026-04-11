// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

const host = API_URL + '/api/v1/guild/deal';

export async function fetchDeals(
  params?: any,
  options?: { [key: string]: any },
) {
  return request(host, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function approveDeal(
  data: { commodityId: string; buyerId: string; quantity?: number },
  options?: { [key: string]: any },
) {
  return request(host + '/approve', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function buyerConfirmDeal(
  data: { id: string },
  options?: { [key: string]: any },
) {
  return request(host + '/buyer-confirm', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function sellerConfirmDeal(
  data: { id: string; tax: number },
  options?: { [key: string]: any },
) {
  return request(host + '/seller-confirm', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}