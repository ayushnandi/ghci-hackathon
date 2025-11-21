'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'

/**
 * Dynamic breadcrumbs component for dashboard
 * Automatically updates based on current route
 */
export function DashboardBreadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  return (
    <Breadcrumb className='hidden sm:block'>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className='flex items-center gap-2'>
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
