'use client'

import { useState } from 'react'
import {
  BellIcon,
  ShieldAlertIcon,
  DollarSignIcon,
  CalendarIcon,
  CheckCircle2Icon,
  XCircleIcon,
  InfoIcon,
  Settings2Icon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { formatDateTime } from '@/lib/utils/date'

// Mock alert data
interface Alert {
  id: string
  type: 'transaction' | 'security' | 'balance' | 'payment' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'high' | 'medium' | 'low'
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'security',
    title: 'New Login Detected',
    message: 'A new login from Windows Chrome was detected in New York, NY',
    timestamp: '2025-11-21T10:30:00',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'transaction',
    title: 'Large Transaction Alert',
    message: 'A transaction of $5,000.00 was processed from your Primary Checking account',
    timestamp: '2025-11-20T14:20:00',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'balance',
    title: 'Low Balance Warning',
    message: 'Your Emergency Fund balance is below $160,000',
    timestamp: '2025-11-20T09:00:00',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Reminder',
    message: 'Your scheduled rent payment of $2,400 is due in 3 days',
    timestamp: '2025-11-19T08:00:00',
    read: true,
    priority: 'high'
  },
  {
    id: '5',
    type: 'transaction',
    title: 'Deposit Received',
    message: 'A deposit of $8,500.00 has been credited to your account',
    timestamp: '2025-11-18T12:00:00',
    read: true,
    priority: 'low'
  },
  {
    id: '6',
    type: 'security',
    title: 'Password Changed',
    message: 'Your account password was successfully changed',
    timestamp: '2025-11-17T16:45:00',
    read: true,
    priority: 'high'
  },
  {
    id: '7',
    type: 'info',
    title: 'New Feature Available',
    message: 'Check out our new AI-powered financial insights feature',
    timestamp: '2025-11-16T10:00:00',
    read: true,
    priority: 'low'
  },
  {
    id: '8',
    type: 'transaction',
    title: 'Card Transaction Declined',
    message: 'A transaction of $450.00 was declined due to insufficient funds',
    timestamp: '2025-11-15T18:30:00',
    read: true,
    priority: 'high'
  }
]

export default function AlertsNotifications() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [balanceAlerts, setBalanceAlerts] = useState(true)
  const [paymentReminders, setPaymentReminders] = useState(true)

  const unreadCount = alerts.filter(a => !a.read).length
  const todayAlerts = alerts.filter(a => {
    const alertDate = new Date(a.timestamp)
    const today = new Date()
    return alertDate.toDateString() === today.toDateString()
  }).length

  const statisticsCardData = [
    {
      icon: <BellIcon className='size-4' />,
      value: alerts.length.toString(),
      title: 'Total Alerts',
      changePercentage: 'Last 30 days'
    },
    {
      icon: <InfoIcon className='size-4' />,
      value: unreadCount.toString(),
      title: 'Unread Alerts',
      changePercentage: todayAlerts + ' today'
    },
    {
      icon: <ShieldAlertIcon className='size-4' />,
      value: alerts.filter(a => a.type === 'security').length.toString(),
      title: 'Security Alerts',
      changePercentage: 'All time'
    },
    {
      icon: <DollarSignIcon className='size-4' />,
      value: alerts.filter(a => a.type === 'transaction').length.toString(),
      title: 'Transaction Alerts',
      changePercentage: 'Last 30 days'
    }
  ]

  const getAlertIcon = (type: Alert['type']) => {
    const icons = {
      transaction: DollarSignIcon,
      security: ShieldAlertIcon,
      balance: DollarSignIcon,
      payment: CalendarIcon,
      info: InfoIcon
    }
    const Icon = icons[type]
    return <Icon className='size-5' />
  }

  const getAlertColor = (type: Alert['type'], priority: Alert['priority']) => {
    if (priority === 'high') return 'border-l-4 border-l-red-500 bg-red-500/5'
    if (type === 'security') return 'border-l-4 border-l-orange-500 bg-orange-500/5'
    if (type === 'transaction') return 'border-l-4 border-l-blue-500 bg-blue-500/5'
    return 'border-l-4 border-l-gray-500 bg-gray-500/5'
  }

  const filteredAlerts = filter === 'unread' ? alerts.filter(a => !a.read) : alerts

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })))
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='grid grid-cols-1 gap-6'>
          {/* Statistics Cards */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {statisticsCardData.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
              />
            ))}
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {/* Alert Feed */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>Alert Feed</CardTitle>
                    <CardDescription>Your recent notifications and alerts</CardDescription>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === 'unread' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setFilter('unread')}
                    >
                      Unread ({unreadCount})
                    </Button>
                    <Button variant='ghost' size='sm' onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                {filteredAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`rounded-lg p-4 transition-colors hover:bg-muted/50 ${getAlertColor(alert.type, alert.priority)} ${!alert.read ? 'font-medium' : ''}`}
                  >
                    <div className='flex items-start gap-3'>
                      <div className={`mt-1 ${alert.type === 'security' ? 'text-orange-600' : alert.type === 'transaction' ? 'text-blue-600' : 'text-muted-foreground'}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className={!alert.read ? 'font-semibold' : 'font-medium'}>
                            {alert.title}
                          </p>
                          {!alert.read && (
                            <Badge variant='default' className='h-5 px-1.5 text-xs'>New</Badge>
                          )}
                          <Badge variant='outline' className='h-5 px-1.5 text-xs capitalize'>
                            {alert.type}
                          </Badge>
                        </div>
                        <p className='text-sm text-muted-foreground'>{alert.message}</p>
                        <p className='text-xs text-muted-foreground'>
                          {formatDateTime(alert.timestamp)}
                        </p>
                      </div>
                      {!alert.read && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => markAsRead(alert.id)}
                        >
                          <CheckCircle2Icon className='size-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className='lg:col-span-1'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Settings2Icon className='size-5' />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage your alert preferences</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <h3 className='font-semibold text-sm'>Notification Channels</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='email' className='text-sm'>Email Notifications</Label>
                      <Switch
                        id='email'
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='sms' className='text-sm'>SMS Notifications</Label>
                      <Switch
                        id='sms'
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='push' className='text-sm'>Push Notifications</Label>
                      <Switch
                        id='push'
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='font-semibold text-sm'>Alert Types</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='transaction' className='text-sm'>Transaction Alerts</Label>
                      <Switch
                        id='transaction'
                        checked={transactionAlerts}
                        onCheckedChange={setTransactionAlerts}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='security' className='text-sm'>Security Alerts</Label>
                      <Switch
                        id='security'
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='balance' className='text-sm'>Balance Alerts</Label>
                      <Switch
                        id='balance'
                        checked={balanceAlerts}
                        onCheckedChange={setBalanceAlerts}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='payment' className='text-sm'>Payment Reminders</Label>
                      <Switch
                        id='payment'
                        checked={paymentReminders}
                        onCheckedChange={setPaymentReminders}
                      />
                    </div>
                  </div>
                </div>

                <Button className='w-full'>Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
