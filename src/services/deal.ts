
export type CommodityParamsType = {
  commodityId: string;
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
    }),
    method: 'POST',
  })
  const res = JSON.parse(await data.text());
  console.log(res);
  return res;
}

