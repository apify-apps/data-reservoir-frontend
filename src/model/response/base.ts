export interface BaseResponse<T> {
  date: Date,
  message: string,
  data: T
}