import { AxiosError } from 'axios'
import { axiosInstance } from './axios-instance'
import { ApiResponse, ErrorResponse } from './types'

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiService = {
  async token(): Promise<void> {
    await axiosInstance.get<any>('/sanctum/csrf-cookie')
  },

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T | undefined> {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, { params })
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>)
    }
  },

  async post<T>(url: string, data?: unknown): Promise<T | undefined> {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data)
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>)
    }
  },

  async put<T>(url: string, data?: unknown): Promise<T | undefined> {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data)
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>)
    }
  },

  async delete<T>(url: string): Promise<T | undefined> {
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url)
      return response.data
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>)
    }
  },

  handleError(error: AxiosError<ErrorResponse>) {
    const message = error.response?.data?.message || 'An unexpected error occurred'
    const status = error.response?.status || 500
    const errors = error.response?.data?.errors

    throw new ApiError(message, status, errors)
  }
} 