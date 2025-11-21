/**
 * Custom hook for managing transfer form state and validation
 */

import { useState, useCallback } from 'react'
import { isValidAmount, validateTransferAmount } from '@/lib/utils/validation'

export interface TransferFormData {
  fromAccount: string
  toAccount: string
  amount: string
  memo: string
  scheduledDate?: string
}

export interface TransferError {
  field: keyof TransferFormData
  message: string
}

export interface UseTransfersReturn {
  formData: TransferFormData
  errors: TransferError[]
  isValid: boolean
  isSubmitting: boolean
  updateField: (field: keyof TransferFormData, value: string) => void
  validateForm: (accountBalance?: number) => boolean
  resetForm: () => void
  submitTransfer: (onSuccess?: (data: TransferFormData) => void) => Promise<void>
  setFormData: (data: TransferFormData) => void
}

const initialFormData: TransferFormData = {
  fromAccount: '',
  toAccount: '',
  amount: '',
  memo: ''
}

/**
 * Hook to manage transfer form state, validation, and submission
 * @param onSubmit - Optional callback function to handle form submission
 * @returns Object with form state and control functions
 */
export function useTransfers(
  onSubmit?: (data: TransferFormData) => Promise<void>
): UseTransfersReturn {
  const [formData, setFormData] = useState<TransferFormData>(initialFormData)
  const [errors, setErrors] = useState<TransferError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof TransferFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((error) => error.field !== field))
  }, [])

  const validateForm = useCallback(
    (accountBalance?: number): boolean => {
      const newErrors: TransferError[] = []

      // Validate from account
      if (!formData.fromAccount) {
        newErrors.push({ field: 'fromAccount', message: 'Please select an account' })
      }

      // Validate to account
      if (!formData.toAccount) {
        newErrors.push({ field: 'toAccount', message: 'Please select a recipient' })
      }

      // Check if from and to accounts are the same
      if (formData.fromAccount && formData.toAccount && formData.fromAccount === formData.toAccount) {
        newErrors.push({
          field: 'toAccount',
          message: 'Cannot transfer to the same account'
        })
      }

      // Validate amount
      if (!formData.amount) {
        newErrors.push({ field: 'amount', message: 'Please enter an amount' })
      } else if (!isValidAmount(formData.amount, 0.01)) {
        newErrors.push({ field: 'amount', message: 'Please enter a valid amount (minimum $0.01)' })
      } else if (accountBalance !== undefined) {
        const amount = parseFloat(formData.amount)
        const validation = validateTransferAmount(amount, accountBalance)
        if (!validation.isValid && validation.error) {
          newErrors.push({ field: 'amount', message: validation.error })
        }
      }

      // Validate scheduled date (if provided)
      if (formData.scheduledDate) {
        const scheduledDate = new Date(formData.scheduledDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (scheduledDate < today) {
          newErrors.push({
            field: 'scheduledDate',
            message: 'Scheduled date cannot be in the past'
          })
        }
      }

      setErrors(newErrors)
      return newErrors.length === 0
    },
    [formData]
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors([])
    setIsSubmitting(false)
  }, [])

  const submitTransfer = useCallback(
    async (onSuccess?: (data: TransferFormData) => void) => {
      if (!validateForm()) return

      setIsSubmitting(true)

      try {
        if (onSubmit) {
          await onSubmit(formData)
        }

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(formData)
        }

        // Reset form after successful submission
        resetForm()
      } catch (error) {
        // Handle error (could add error state if needed)
        console.error('Transfer submission error:', error)
        setErrors([
          {
            field: 'amount',
            message: 'Failed to process transfer. Please try again.'
          }
        ])
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, onSubmit, resetForm]
  )

  const getError = useCallback(
    (field: keyof TransferFormData): string | undefined => {
      return errors.find((error) => error.field === field)?.message
    },
    [errors]
  )

  return {
    formData,
    errors,
    isValid: errors.length === 0,
    isSubmitting,
    updateField,
    validateForm,
    resetForm,
    submitTransfer,
    setFormData
  }
}
