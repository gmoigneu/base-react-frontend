export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
  status: number
} 