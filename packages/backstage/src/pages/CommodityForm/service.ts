// import { fakeUploadFile } from '@/services/file';
// import { request } from 'umi';
// import { CommodityInputParams } from './data';

// const host = API_URL + '/api/v1/guild/commodity';
// const fileHost = API_URL + '/api/v1/guild/file';

// export async function fakeSubmitForm(params: CommodityInputParams) {
//   console.log(params)
//   if (params.previewImage) {
//     const link = await getPresigned();
//     console.log(link);
//     const res = await fakeUploadFile(link, params.previewImage.file.originFileObj);
//     console.log(res)
//   }

//   return request(host, {
//     method: 'POST',
//     data: params,
//   });
// }


// export async function getPresigned() {
//   return request(fileHost  + `/presigned?ext=jpg`, {
//     method: 'GET',
//   });
// }