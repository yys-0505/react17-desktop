import request from './http';

export const update = (file, params) => request({
  url: `/update`,
  headers: { 'Content-Type': 'multipart/form-data', },
  method: 'post',
  data: file,
  params,
});

export const exportFile = params => request({
  url: `/export`,
  method: 'get',
  responseType: 'blob',
  params,
});