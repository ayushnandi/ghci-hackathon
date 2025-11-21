/**
 * Route configuration for dashboard breadcrumbs and navigation
 * Maps route paths to human-readable labels
 */

export const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/dashboard/account-overview': 'Account Overview',
  '/dashboard/account-management': 'Account Management',
  '/dashboard/alerts-notifications': 'Alerts & Notifications',
  '/dashboard/card-management': 'Card Management',
  '/dashboard/chat-with-ai': 'Chat With AI',
  '/dashboard/deposit-services': 'Deposit Services',
  '/dashboard/investments': 'Investments',
  '/dashboard/net-banking': 'Net Banking',
  '/dashboard/security-features': 'Security Features',
  '/dashboard/settings-integrations': 'Settings & Integrations'
}

/**
 * Get label for a given route path
 * @param path - Route path
 * @returns Human-readable label or formatted path segment
 */
export function getRouteLabel(path: string): string {
  if (routeLabels[path]) {
    return routeLabels[path]
  }

  // Fallback: Convert path segment to title case
  const segment = path.split('/').pop() || ''
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
