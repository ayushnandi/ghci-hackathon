/**
 * Status utility functions for mapping statuses to colors, badges, and labels
 */

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'processing' | 'cancelled'
export type AccountStatus = 'active' | 'inactive' | 'suspended' | 'closed'
export type TransferStatus = 'completed' | 'pending' | 'failed' | 'scheduled' | 'cancelled'
export type DepositStatus = 'completed' | 'pending' | 'processing' | 'failed' | 'on_hold'
export type AlertType = 'info' | 'success' | 'warning' | 'error'
export type SecurityLevel = 'low' | 'medium' | 'high' | 'critical'

/**
 * Get color class for transaction status
 * @param status - Transaction status
 * @returns Tailwind color class
 */
export function getTransactionStatusColor(status: TransactionStatus): string {
  const colorMap: Record<TransactionStatus, string> = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    failed: 'text-red-600',
    processing: 'text-blue-600',
    cancelled: 'text-gray-600'
  }
  return colorMap[status] || 'text-gray-600'
}

/**
 * Get background color class for transaction status badge
 * @param status - Transaction status
 * @returns Tailwind background color class
 */
export function getTransactionStatusBgColor(status: TransactionStatus): string {
  const colorMap: Record<TransactionStatus, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    processing: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-700'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

/**
 * Get label for transaction status
 * @param status - Transaction status
 * @returns Formatted status label
 */
export function getTransactionStatusLabel(status: TransactionStatus): string {
  const labelMap: Record<TransactionStatus, string> = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    processing: 'Processing',
    cancelled: 'Cancelled'
  }
  return labelMap[status] || status
}

/**
 * Get color class for account status
 * @param status - Account status
 * @returns Tailwind color class
 */
export function getAccountStatusColor(status: AccountStatus): string {
  const colorMap: Record<AccountStatus, string> = {
    active: 'text-green-600',
    inactive: 'text-gray-600',
    suspended: 'text-yellow-600',
    closed: 'text-red-600'
  }
  return colorMap[status] || 'text-gray-600'
}

/**
 * Get background color class for account status badge
 * @param status - Account status
 * @returns Tailwind background color class
 */
export function getAccountStatusBgColor(status: AccountStatus): string {
  const colorMap: Record<AccountStatus, string> = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-red-100 text-red-700'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

/**
 * Get color for transaction type (debit vs credit)
 * @param type - Transaction type
 * @returns Tailwind color class
 */
export function getTransactionTypeColor(type: 'debit' | 'credit'): string {
  return type === 'credit' ? 'text-green-600' : 'text-red-600'
}

/**
 * Get icon for transaction type
 * @param type - Transaction type
 * @returns Icon name or component identifier
 */
export function getTransactionTypeIcon(type: 'debit' | 'credit'): string {
  return type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'
}

/**
 * Get color class for alert type
 * @param type - Alert type
 * @returns Tailwind color class
 */
export function getAlertTypeColor(type: AlertType): string {
  const colorMap: Record<AlertType, string> = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }
  return colorMap[type] || 'text-gray-600'
}

/**
 * Get background color for alert type
 * @param type - Alert type
 * @returns Tailwind background color class
 */
export function getAlertTypeBgColor(type: AlertType): string {
  const colorMap: Record<AlertType, string> = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  }
  return colorMap[type] || 'bg-gray-50 border-gray-200'
}

/**
 * Get color for security level
 * @param level - Security level
 * @returns Tailwind color class
 */
export function getSecurityLevelColor(level: SecurityLevel): string {
  const colorMap: Record<SecurityLevel, string> = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600'
  }
  return colorMap[level] || 'text-gray-600'
}

/**
 * Get background color for security level badge
 * @param level - Security level
 * @returns Tailwind background color class
 */
export function getSecurityLevelBgColor(level: SecurityLevel): string {
  const colorMap: Record<SecurityLevel, string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700'
  }
  return colorMap[level] || 'bg-gray-100 text-gray-700'
}

/**
 * Get color for deposit status
 * @param status - Deposit status
 * @returns Tailwind color class
 */
export function getDepositStatusColor(status: DepositStatus): string {
  const colorMap: Record<DepositStatus, string> = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    processing: 'text-blue-600',
    failed: 'text-red-600',
    on_hold: 'text-orange-600'
  }
  return colorMap[status] || 'text-gray-600'
}

/**
 * Get background color for deposit status badge
 * @param status - Deposit status
 * @returns Tailwind background color class
 */
export function getDepositStatusBgColor(status: DepositStatus): string {
  const colorMap: Record<DepositStatus, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    failed: 'bg-red-100 text-red-700',
    on_hold: 'bg-orange-100 text-orange-700'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

/**
 * Get label for deposit status
 * @param status - Deposit status
 * @returns Formatted status label
 */
export function getDepositStatusLabel(status: DepositStatus): string {
  const labelMap: Record<DepositStatus, string> = {
    completed: 'Completed',
    pending: 'Pending',
    processing: 'Processing',
    failed: 'Failed',
    on_hold: 'On Hold'
  }
  return labelMap[status] || status
}

/**
 * Get color for transfer status
 * @param status - Transfer status
 * @returns Tailwind color class
 */
export function getTransferStatusColor(status: TransferStatus): string {
  const colorMap: Record<TransferStatus, string> = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    failed: 'text-red-600',
    scheduled: 'text-blue-600',
    cancelled: 'text-gray-600'
  }
  return colorMap[status] || 'text-gray-600'
}

/**
 * Get background color for transfer status badge
 * @param status - Transfer status
 * @returns Tailwind background color class
 */
export function getTransferStatusBgColor(status: TransferStatus): string {
  const colorMap: Record<TransferStatus, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    scheduled: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-700'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

/**
 * Get label for transfer status
 * @param status - Transfer status
 * @returns Formatted status label
 */
export function getTransferStatusLabel(status: TransferStatus): string {
  const labelMap: Record<TransferStatus, string> = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled'
  }
  return labelMap[status] || status
}

/**
 * Get color for percentage change (positive/negative)
 * @param value - Percentage value
 * @returns Tailwind color class
 */
export function getPercentageChangeColor(value: number): string {
  if (value > 0) return 'text-green-600'
  if (value < 0) return 'text-red-600'
  return 'text-gray-600'
}

/**
 * Get icon for percentage change
 * @param value - Percentage value
 * @returns Icon identifier
 */
export function getPercentageChangeIcon(value: number): 'up' | 'down' | 'neutral' {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'neutral'
}

/**
 * Get color for investment trend
 * @param trend - Trend direction
 * @returns Tailwind color class
 */
export function getInvestmentTrendColor(trend: 'up' | 'down' | 'neutral'): string {
  const colorMap = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }
  return colorMap[trend]
}

/**
 * Map generic status to badge variant
 * @param status - Status string
 * @returns Badge variant
 */
export function getStatusBadgeVariant(
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' {
  const statusLower = status.toLowerCase()
  if (['completed', 'success', 'active'].includes(statusLower)) return 'default'
  if (['pending', 'processing', 'scheduled'].includes(statusLower)) return 'secondary'
  if (['failed', 'error', 'cancelled', 'closed'].includes(statusLower)) return 'destructive'
  return 'outline'
}
