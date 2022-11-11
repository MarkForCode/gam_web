import { fakeUploadImage } from "./file";

export type CommodityParamsType = {
  title: string;
  content: string;
  type: string;
  previewImage: any;
  basicPrice: number;
};


const host = API_URL + '/api/v1/guild/commodity';

export async function fakeSubmitForm(params: CommodityParamsType) {
  console.log(params)
  let key;
  if (params.previewImage) {
    key = await fakeUploadImage(params.previewImage.file.originFileObj);
  }
  const body = {
    ...params,
    file: key?.path,
  };
  console.log(body)
  return fetch(host, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });
}

