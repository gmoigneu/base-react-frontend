import { ApiError, apiService } from './api-service'
interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  two_factor: boolean
}

interface UserResponse {
  id: number
  email: string
  name: string
  email_verified_at: string
  created_at: string
  updated_at: string
  organization_id: number
  deleted_at: string | null
  two_factor_secret: string | null
  two_factor_recovery_codes: string | null
}

interface RegisterData extends LoginCredentials {
  name: string
  email: string
}

export function redirectToLogin(callbackUrl?: string) {
  const baseUrl = '/login'
  const url = callbackUrl ? `${baseUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}` : baseUrl
  window.location.href = url
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      await apiService.token()
      const response = await apiService.post<LoginResponse>('/api/login', credentials)
      localStorage.setItem('email', credentials.email)

      return response
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle specific API errors
        throw error
      }
      // Handle unexpected errors
      throw new Error('Login failed. Please try again.')
    }
  },

  async register(data: RegisterData) {
    return apiService.post<LoginResponse>('/api/register', data)
  },

  async logout() {
    await apiService.post('/api/logout')
    localStorage.removeItem('email')
    redirectToLogin()
  },

  async getCurrentUser() {
    return apiService.get<UserResponse>('/api/user')
  }
} 