/**
 * Currency utility functions for formatting and calculations
 */

/**
 * Format a number as currency with symbol
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Format currency without symbol (just number with decimals)
 * @param amount - The amount to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string
 */
export function formatAmount(amount: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Format large numbers with K, M, B suffixes
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted compact number
 */
export function formatCompactCurrency(
  amount: number,
  decimals: number = 1
): string {
  const absAmount = Math.abs(amount)
  const sign = amount < 0 ? '-' : ''

  if (absAmount >= 1e9) {
    return `${sign}$${(absAmount / 1e9).toFixed(decimals)}B`
  } else if (absAmount >= 1e6) {
    return `${sign}$${(absAmount / 1e6).toFixed(decimals)}M`
  } else if (absAmount >= 1e3) {
    return `${sign}$${(absAmount / 1e3).toFixed(decimals)}K`
  }
  return formatCurrency(amount)
}

/**
 * Calculate percentage change
 * @param current - Current value
 * @param previous - Previous value
 * @returns Percentage change with + or - sign
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): string {
  if (previous === 0) return '0%'
  const change = ((current - previous) / previous) * 100
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

/**
 * Format percentage
 * @param value - Percentage value (e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Parse currency string to number
 * @param currencyString - Currency string (e.g., "$1,234.56")
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  return parseFloat(currencyString.replace(/[^0-9.-]+/g, ''))
}

/**
 * Calculate fee as percentage
 * @param amount - Transaction amount
 * @param feePercentage - Fee percentage (e.g., 0.015 for 1.5%)
 * @param minimumFee - Minimum fee amount
 * @returns Calculated fee
 */
export function calculateFee(
  amount: number,
  feePercentage: number,
  minimumFee: number = 0
): number {
  const calculatedFee = amount * feePercentage
  return Math.max(calculatedFee, minimumFee)
}

/**
 * Add thousands separator to number
 * @param value - Number to format
 * @returns Formatted string with commas
 */
export function addThousandsSeparator(value: number | string): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Get currency symbol for a given currency code
 * @param currency - Currency code (default: 'USD')
 * @returns Currency symbol
 */
export function getCurrencySymbol(currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
    CNY: '¥'
  }
  return symbols[currency] || currency
}
