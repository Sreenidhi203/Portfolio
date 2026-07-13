/**
 * Validates environment variables at startup.
 * Add keys to REQUIRED_VARS — the app throws before rendering
 * if any are missing, making misconfigured deployments immediately obvious.
 */

const REQUIRED_VARS: string[] = [
  // 'VITE_API_URL', // uncomment when a real backend is deployed
]

const OPTIONAL_VARS = ['VITE_API_URL'] as const

export type Env = {
  VITE_API_URL: string
}

function validateEnv(): Env {
  const missing = REQUIRED_VARS.filter((key) => !import.meta.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n\nSee .env.example for reference.`,
    )
  }

  return {
    VITE_API_URL: import.meta.env.VITE_API_URL ?? '',
  }
}

export const env = validateEnv()

// Log configured keys in dev only — never log values
if (import.meta.env.DEV) {
  const configured = OPTIONAL_VARS.filter((k) => !!import.meta.env[k])
  if (configured.length) {
    console.info('[env] Configured:', configured.join(', '))
  }
}
