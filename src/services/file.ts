
export type CommodityParamsType = {
  title: string;
  content: string;
  previewImage: any;
};


const fileHost = API_URL + '/api/v1/guild/file';


export async function fakeSubmitForm(params: CommodityParamsType) {
  console.log(params)
  let dd;
  if (params.previewImage) {
    const link = await getPresigned();
    dd = JSON.parse(await link.text())
    console.log(dd);
    return fakeUploadFile(dd, params.previewImage.file.originFileObj);
  }
}

export async function getPresigned() {
  return fetch(fileHost  + `/presigned?ext=jpg`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
    method: 'GET',
  });
}

interface PresignedData {
  "url": string,
  "fields": {
    "acl": string,
    "key": string,
    "bucket": string,
    "X-Amz-Algorithm": string,
    "X-Amz-Credential": string,
    "X-Amz-Date": string,
    "Policy": string,
    "X-Amz-Signature": string
  }
}
export async function fakeUploadFile(presignedData: PresignedData, file: any) {
  const url = presignedData.url;
  const formData = new FormData();
  Object.entries(presignedData.fields).map((f) => {
    formData.append(f[0], f[1]);
  })

  formData.append('file', file);
  const requestOptions = {
    method: 'POST',
    body: formData,
  };
  try {
    await fetch(url, requestOptions);
  } catch (error) {
    console.log(error)
  }
}
