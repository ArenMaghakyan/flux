export interface IResponse<T> {
  data: T;
  status: number;
  success: boolean;
}
