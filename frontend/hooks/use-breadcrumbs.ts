'use client'

import { usePathname } from 'next/navigation'
import { getRouteLabel } from '@/lib/route-config'

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage: boolean
}

/**
 * Hook to generate dynamic breadcrumbs based on current pathname
 * @returns Array of breadcrumb items with label, href, and current page status
 */
export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()

  // Always start with Home
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
      isCurrentPage: pathname === '/'
    }
  ]

  // If we're not on home page, parse the path
  if (pathname !== '/') {
    const segments = pathname.split('/').filter(Boolean)
    let accumulatedPath = ''

    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`
      const isLast = index === segments.length - 1

      breadcrumbs.push({
        label: getRouteLabel(accumulatedPath),
        href: accumulatedPath,
        isCurrentPage: isLast
      })
    })
  }

  return breadcrumbs
}
