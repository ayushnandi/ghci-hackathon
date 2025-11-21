/**
 * Date utility functions for formatting and calculations
 */

/**
 * Format date to locale string
 * @param date - Date object, string, or timestamp
 * @param format - Format type: 'short', 'medium', 'long', 'full'
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  let options: Intl.DateTimeFormatOptions
  switch (format) {
    case 'short':
      options = { month: 'numeric', day: 'numeric', year: '2-digit' }
      break
    case 'medium':
      options = { month: 'short', day: 'numeric', year: 'numeric' }
      break
    case 'long':
      options = { month: 'long', day: 'numeric', year: 'numeric' }
      break
    case 'full':
      options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      break
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Format date with time
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj)
}

/**
 * Format time only
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted time string
 */
export function formatTime(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj)
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date object, string, or timestamp
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ]

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds)
    if (count >= 1) {
      const plural = count > 1 ? 's' : ''
      return diffInSeconds < 0
        ? `in ${count} ${interval.label}${plural}`
        : `${count} ${interval.label}${plural} ago`
    }
  }

  return 'just now'
}

/**
 * Check if date is today
 * @param date - Date object, string, or timestamp
 * @returns True if date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if date is yesterday
 * @param date - Date object, string, or timestamp
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  )
}

/**
 * Format date for display (handles today/yesterday)
 * @param date - Date object, string, or timestamp
 * @returns Smart formatted date string
 */
export function formatSmartDate(date: Date | string | number): string {
  if (isToday(date)) {
    return `Today at ${formatTime(date)}`
  }
  if (isYesterday(date)) {
    return `Yesterday at ${formatTime(date)}`
  }
  return formatDateTime(date)
}

/**
 * Get month name
 * @param monthIndex - Month index (0-11)
 * @param format - Format: 'short' or 'long'
 * @returns Month name
 */
export function getMonthName(
  monthIndex: number,
  format: 'short' | 'long' = 'long'
): string {
  const date = new Date(2000, monthIndex, 1)
  return new Intl.DateTimeFormat('en-US', { month: format }).format(date)
}

/**
 * Calculate days between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days between dates
 */
export function daysBetween(
  date1: Date | string | number,
  date2: Date | string | number
): number {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' || typeof date2 === 'number' ? new Date(date2) : date2
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Add days to a date
 * @param date - Starting date
 * @param days - Number of days to add (can be negative)
 * @returns New date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const result = new Date(dateObj)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Add months to a date
 * @param date - Starting date
 * @param months - Number of months to add (can be negative)
 * @returns New date
 */
export function addMonths(date: Date | string | number, months: number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const result = new Date(dateObj)
  result.setMonth(result.getMonth() + months)
  return result
}

/**
 * Get start of day
 * @param date - Date object, string, or timestamp
 * @returns Date at 00:00:00
 */
export function startOfDay(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const result = new Date(dateObj)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * Get end of day
 * @param date - Date object, string, or timestamp
 * @returns Date at 23:59:59
 */
export function endOfDay(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const result = new Date(dateObj)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * Format date range
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number
): string {
  return `${formatDate(startDate, 'medium')} - ${formatDate(endDate, 'medium')}`
}

/**
 * Get quarter from date
 * @param date - Date object, string, or timestamp
 * @returns Quarter number (1-4)
 */
export function getQuarter(date: Date | string | number): number {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  return Math.floor(dateObj.getMonth() / 3) + 1
}

/**
 * Format date for input field (YYYY-MM-DD)
 * @param date - Date object, string, or timestamp
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateForInput(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  return dateObj.toISOString().split('T')[0]
}
