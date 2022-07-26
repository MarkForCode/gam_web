import { request } from 'umi';
import { CommodityInputParams } from './data';

const host = API_URL + '/api/v1/guild/commodity';

export async function fakeSubmitForm(params: CommodityInputParams) {
  console.log(params)
  return request(host, {
    method: 'POST',
    data: params,
  });
}

export async function uploadFile(params: CommodityInputParams) {
  const formData = new FormData();
  if (params.previewImage) {
    formData.append('previewImage', params.previewImage.file.originFileObj);
  }
  console.log(params)
  return request(host, {
    method: 'POST',
    data: formData,
  });
}
