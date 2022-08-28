export interface IReturnData<T> {
  response: Object;
  body: T;
}

export enum RequestMethods {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}
