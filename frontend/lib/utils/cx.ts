import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sort and combine CSS classes for consistent styling
 * Used primarily with UntitledUI components
 */
export function sortCx<T extends Record<string, any>>(styles: T): T {
  return styles
}
