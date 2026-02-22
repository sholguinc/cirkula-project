import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Logger from "./LogService";

export default class ApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.api = axios.create({
      baseURL,
      ...config,
    });
  }

  async get<T, R>(endpoint: string, params?: T): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      Logger.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  async post<T, R>(endpoint: string, data?: T): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      Logger.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  }

  async put<T, R>(endpoint: string, data?: T): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      Logger.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  }

  async delete<T, R>(endpoint: string, data?: T): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      Logger.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }
}