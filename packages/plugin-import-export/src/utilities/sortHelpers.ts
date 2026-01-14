/** Remove a leading '-' from a sort value (e.g. "-title" -> "title") */
export const stripSortDash = (v?: null | string): string => (v ? v.replace(/^-/, '') : '')

/** Apply order to a base field (("title","desc") -> "-title") */
export const applySortOrder = (field: string, order: 'asc' | 'desc'): string =>
  order === 'desc' ? `-${field}` : field

// Safely coerce query.sort / query.groupBy to a string (ignore arrays)
export const normalizeQueryParam = (v: unknown): string | undefined => {
  if (typeof v === 'string') {
    return v
  }
  if (Array.isArray(v) && typeof v[0] === 'string') {
    return v[0]
  }
  return undefined
}

export type SortDirection = 'asc' | 'desc'

export function isValidSortDirection(value: unknown): value is SortDirection {
  return value === 'asc' || value === 'desc'
}

export function toSortDirection(value: unknown, fallback: SortDirection = 'asc'): SortDirection {
  return isValidSortDirection(value) ? value : fallback
}

export function toggleSortDirection(current: SortDirection): SortDirection {
  return current === 'asc' ? 'desc' : 'asc'
}

export function toggleSortDirection(current: SortDirection): SortDirection {
  return current === 'asc' ? 'desc' : 'asc'
}
