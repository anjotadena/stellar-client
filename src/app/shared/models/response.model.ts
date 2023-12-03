export interface Response<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T;
}
