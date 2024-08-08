import { BaseResponse } from "@/model/response/base";

export function appendBase<T>(data: T, message: string = ""): BaseResponse<T> {
  return ({
    date: new Date(),
    message: message,
    data: data
  });
}