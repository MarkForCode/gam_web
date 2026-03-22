
export type CommodityParamsType = {
  commodityId: string;
  bid: number;
};


const host = API_URL + '/api/v1/guild/deal';

export async function fakeSubmitForm(params: CommodityParamsType) {
  console.log(123, params);
  const data = await fetch(host, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      commodityId: params.commodityId,
      bid: Number(params.bid)
    }),
    method: 'POST',
  })
  const res = JSON.parse(await data.text());
  console.log(res);
  return res;
}

