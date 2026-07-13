import { env } from '@/config/env'

const BASE_URL = env.VITE_API_URL

/** Distinguishes a non-2xx HTTP response from a network/timeout failure */
export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'HttpError'
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network request failed') {
    super(message)
    this.name = 'NetworkError'
  }
}

const TIMEOUT_MS = 10_000
const MAX_RETRIES = 2
const RETRYABLE_STATUSES = new Set([429, 502, 503, 504])

async function request<T>(
  path: string,
  init?: RequestInit,
  attempt = 0,
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...init,
    })

    if (!res.ok) {
      if (RETRYABLE_STATUSES.has(res.status) && attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 2 ** attempt * 500))
        return request<T>(path, init, attempt + 1)
      }
      throw new HttpError(res.status, `HTTP ${res.status}: ${res.statusText}`)
    }

    return res.json() as Promise<T>
  } catch (err) {
    if (err instanceof HttpError) throw err
    // AbortError = timeout; TypeError = network failure
    throw new NetworkError(
      err instanceof Error ? err.message : 'Unknown network error',
    )
  } finally {
    clearTimeout(timeout)
  }
}

export const http = {
  get:  <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
