/**
 * Helper to cast Supabase query results when the Database generic
 * type doesn't propagate through complex join queries.
 */
export function cast<T>(value: unknown): T {
  return value as T
}
