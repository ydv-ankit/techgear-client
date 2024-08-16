import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestDataType = {
  urlPath: string;
  method: RequestMethod;
  headers?: object;
  data?: object | string | null;
};

type ResponseType<T = any> = {
  requestFunction: (
    args: RequestDataType,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  loading: boolean;
  error: string | null;
  responseData: T | null;
};

export const useAxiosQuery = <T = any>(): ResponseType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestFunction = async (args: RequestDataType) => {
    try {
      setLoading(true);
      setError(null);
      const axiosRequestObject: AxiosRequestConfig = {
        url: args.urlPath,
        method: args.method,
        withCredentials: true,
        data: args.data,
      };
      if (args.headers) axiosRequestObject.headers = args.headers;
      const resp = await axios(axiosRequestObject);
      setResponseData(resp?.data);
      return resp;
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { requestFunction, loading, error, responseData };
};
