const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://134.122.56.191/api'
const assetBaseUrl = apiBaseUrl.replace(/\/api\/?$/, '')

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

type RequestOptions = RequestInit & {
  token?: string | null
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, body, ...requestOptions } = options
  const isFormData = body instanceof FormData

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...requestOptions,
    body,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    throw new ApiError(data?.message || 'API-kall feilet', response.status, data)
  }

  return data as T
}

export function getAssetUrl(path?: string | null) {
  if (!path) {
    return ''
  }

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return `${assetBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function isUnauthorizedError(error: unknown) {
  return error instanceof ApiError && (error.status === 401 || error.status === 403)
}
