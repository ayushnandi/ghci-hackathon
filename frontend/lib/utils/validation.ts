/**
 * Form validation utility functions
 */

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (US format)
 * @param phone - Phone number to validate
 * @returns True if valid phone number
 */
export function isValidPhone(phone: string): boolean {
  // Accepts: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate account number
 * @param accountNumber - Account number to validate
 * @param minLength - Minimum length (default: 8)
 * @param maxLength - Maximum length (default: 17)
 * @returns True if valid account number
 */
export function isValidAccountNumber(
  accountNumber: string,
  minLength: number = 8,
  maxLength: number = 17
): boolean {
  const cleaned = accountNumber.replace(/\s/g, '')
  return /^\d+$/.test(cleaned) && cleaned.length >= minLength && cleaned.length <= maxLength
}

/**
 * Validate routing number (US - 9 digits)
 * @param routingNumber - Routing number to validate
 * @returns True if valid routing number
 */
export function isValidRoutingNumber(routingNumber: string): boolean {
  const cleaned = routingNumber.replace(/\s/g, '')
  if (!/^\d{9}$/.test(cleaned)) return false

  // ABA routing number checksum validation
  const digits = cleaned.split('').map(Number)
  const checksum =
    3 * (digits[0] + digits[3] + digits[6]) +
    7 * (digits[1] + digits[4] + digits[7]) +
    (digits[2] + digits[5] + digits[8])

  return checksum % 10 === 0
}

/**
 * Validate credit card number using Luhn algorithm
 * @param cardNumber - Card number to validate
 * @returns True if valid card number
 */
export function isValidCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '')
  if (!/^\d{13,19}$/.test(cleaned)) return false

  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Validate CVV code
 * @param cvv - CVV code to validate
 * @param cardType - Card type (amex has 4 digits, others have 3)
 * @returns True if valid CVV
 */
export function isValidCVV(cvv: string, cardType: string = 'default'): boolean {
  const length = cardType === 'amex' ? 4 : 3
  return /^\d+$/.test(cvv) && cvv.length === length
}

/**
 * Validate amount
 * @param amount - Amount to validate
 * @param min - Minimum amount (default: 0.01)
 * @param max - Maximum amount (optional)
 * @returns True if valid amount
 */
export function isValidAmount(
  amount: string | number,
  min: number = 0.01,
  max?: number
): boolean {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(numAmount)) return false
  if (numAmount < min) return false
  if (max !== undefined && numAmount > max) return false
  return true
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @param minLength - Minimum length (default: 8)
 * @returns Object with validation result and strength level
 */
export function validatePassword(
  password: string,
  minLength: number = 8
): { isValid: boolean; strength: 'weak' | 'medium' | 'strong'; errors: string[] } {
  const errors: string[] = []
  let strength: 'weak' | 'medium' | 'strong' = 'weak'

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`)
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUpperCase) errors.push('Password must contain an uppercase letter')
  if (!hasLowerCase) errors.push('Password must contain a lowercase letter')
  if (!hasNumbers) errors.push('Password must contain a number')
  if (!hasSpecialChar) errors.push('Password must contain a special character')

  const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(
    Boolean
  ).length

  if (password.length >= minLength && criteriaCount >= 4) {
    strength = 'strong'
  } else if (password.length >= minLength && criteriaCount >= 3) {
    strength = 'medium'
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors
  }
}

/**
 * Validate ZIP code (US format)
 * @param zipCode - ZIP code to validate
 * @returns True if valid ZIP code
 */
export function isValidZipCode(zipCode: string): boolean {
  // Accepts: 12345 or 12345-6789
  return /^\d{5}(-\d{4})?$/.test(zipCode)
}

/**
 * Validate IBAN (International Bank Account Number)
 * @param iban - IBAN to validate
 * @returns True if valid IBAN format
 */
export function isValidIBAN(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, '').toUpperCase()
  // Basic IBAN format validation (15-34 characters, starts with 2 letters)
  return /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(cleaned)
}

/**
 * Validate SWIFT/BIC code
 * @param swift - SWIFT code to validate
 * @returns True if valid SWIFT code
 */
export function isValidSWIFT(swift: string): boolean {
  // SWIFT code: 8 or 11 characters
  return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(swift.toUpperCase())
}

/**
 * Validate SSN (Social Security Number)
 * @param ssn - SSN to validate
 * @returns True if valid SSN format
 */
export function isValidSSN(ssn: string): boolean {
  const cleaned = ssn.replace(/[-\s]/g, '')
  // Basic format validation: 9 digits, cannot be all same digits
  if (!/^\d{9}$/.test(cleaned)) return false
  if (/^(\d)\1{8}$/.test(cleaned)) return false // All same digits
  return true
}

/**
 * Validate date is not in the future
 * @param date - Date to validate
 * @returns True if date is not in the future
 */
export function isDateNotFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj <= new Date()
}

/**
 * Validate date is not in the past
 * @param date - Date to validate
 * @returns True if date is not in the past
 */
export function isDateNotPast(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj >= today
}

/**
 * Validate required field
 * @param value - Value to validate
 * @returns True if value is not empty
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return value !== null && value !== undefined
}

/**
 * Validate minimum length
 * @param value - String to validate
 * @param minLength - Minimum length required
 * @returns True if length is valid
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength
}

/**
 * Validate maximum length
 * @param value - String to validate
 * @param maxLength - Maximum length allowed
 * @returns True if length is valid
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength
}

/**
 * Validate URL
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Sanitize input (remove potentially dangerous characters)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validate transfer amount against account balance
 * @param amount - Transfer amount
 * @param balance - Available balance
 * @param minBalance - Minimum balance to maintain
 * @returns Object with validation result and error message
 */
export function validateTransferAmount(
  amount: number,
  balance: number,
  minBalance: number = 0
): { isValid: boolean; error?: string } {
  if (amount <= 0) {
    return { isValid: false, error: 'Amount must be greater than zero' }
  }
  if (amount > balance - minBalance) {
    return {
      isValid: false,
      error: `Insufficient funds. You need to maintain a minimum balance of $${minBalance}`
    }
  }
  return { isValid: true }
}
