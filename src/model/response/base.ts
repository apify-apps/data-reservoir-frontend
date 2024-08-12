export interface BaseResponse<T> {
  date: Date,
  message: string,
  data: T
}

export interface BasePaginationResponse<T> {
  date: Date,
  message: string,

  currentPage: number,
  pageSize: number,
  totalPage: number,
  data: T[]
}