import { fakeUploadFile, getPresigned } from "./file";

export type CommodityParamsType = {
  title: string;
  content: string;
  previewImage: any;
};


const host = API_URL + '/api/v1/guild/announce';

export async function fakeSubmitForm(params: CommodityParamsType) {
  console.log(params)
  let dd;
  if (params.previewImage) {
    const link = await getPresigned();
    dd = JSON.parse(await link.text())
    console.log(dd);
    await fakeUploadFile(dd, params.previewImage.file.originFileObj);
  }
  const body = {
    ...params,
    file: dd?.fields.key,
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
