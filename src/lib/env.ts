/**
 * Gets an environment variable value
 * @param key The environment variable key
 * @param defaultValue Optional default value if not set
 * @returns The environment variable value or default
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
} 