
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
  "url": "https://filestg.wscqau.com",
  "fields": {
    "acl": "public-read",
    "key": "tempfile/ef99162a-8d59-4a90-9b72-4d6931985e49.jpg",
    "bucket": "filestg.wscqau.com",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "AKIAJPI7AKMV4JRQCLKA/20220728/ap-northeast-1/s3/aws4_request",
    "X-Amz-Date": "20220728T113347Z",
    "Policy": "eyJleHBpcmF0aW9uIjoiMjAyMi0wOC0yN1QxMTozMzo0N1oiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMSw1MDAwMDAwMDAwMDBdLHsiYWNsIjoicHVibGljLXJlYWQifSx7ImtleSI6InRlbXBmaWxlL2VmOTkxNjJhLThkNTktNGE5MC05YjcyLTRkNjkzMTk4NWU0OS5qcGcifSx7ImJ1Y2tldCI6ImZpbGVzdGcud3NjcWF1LmNvbSJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUFKUEk3QUtNVjRKUlFDTEtBLzIwMjIwNzI4L2FwLW5vcnRoZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjIwNzI4VDExMzM0N1oifV19",
    "X-Amz-Signature": "c1e31721eded807734e3c54b5ffcc1a9603ecd315593857b736452d08ce63d07"
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
