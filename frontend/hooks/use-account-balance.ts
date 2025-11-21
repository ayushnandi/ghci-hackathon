/**
 * Custom hook for managing account balance visibility
 * Allows users to toggle between showing and hiding sensitive balance information
 */

import { useState, useCallback } from 'react'

export interface UseAccountBalanceReturn {
  showBalance: boolean
  toggleBalance: () => void
  setShowBalance: (show: boolean) => void
  maskBalance: (balance: string | number) => string
}

/**
 * Hook to manage balance visibility state
 * @param initialState - Initial visibility state (default: false)
 * @returns Object with showBalance state and control functions
 */
export function useAccountBalance(initialState: boolean = false): UseAccountBalanceReturn {
  const [showBalance, setShowBalance] = useState<boolean>(initialState)

  const toggleBalance = useCallback(() => {
    setShowBalance((prev) => !prev)
  }, [])

  const maskBalance = useCallback(
    (balance: string | number): string => {
      if (showBalance) {
        return typeof balance === 'number' ? balance.toFixed(2) : balance
      }

      // Mask the balance with X's or asterisks
      const balanceStr = typeof balance === 'number' ? balance.toString() : balance

      // If balance contains currency symbol, preserve it
      if (balanceStr.includes('$')) {
        return balanceStr.replace(/\d/g, 'X')
      }

      return 'X'.repeat(balanceStr.replace(/[^\d]/g, '').length)
    },
    [showBalance]
  )

  return {
    showBalance,
    toggleBalance,
    setShowBalance,
    maskBalance
  }
}
