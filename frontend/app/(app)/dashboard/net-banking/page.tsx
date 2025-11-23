'use client'

import { useState } from 'react'
import {
  SendIcon,
  UsersIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import {
  beneficiaries,
  transferHistory,
  scheduledTransfers,
  transferVolume,
  Transfer
} from '@/lib/mock-data/transfers'
import { userAccounts } from '@/lib/mock-data/accounts'
import { formatDateTime, formatDate } from '@/lib/utils/date'

export default function NetBanking() {
  const [selectedFromAccount, setSelectedFromAccount] = useState('')
  const [selectedToAccount, setSelectedToAccount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferMemo, setTransferMemo] = useState('')

  // Calculate statistics
  const totalTransferred = transferHistory
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingTransfers = transferHistory.filter(t => t.status === 'pending').length

  const activeScheduled = scheduledTransfers.filter(s => s.status === 'active').length

  const recentBeneficiaries = beneficiaries.filter(b => b.isVerified).length

  // Statistics card data
  const statisticsCardData = [
    {
      icon: <SendIcon className='size-4' />,
      value: `$${totalTransferred.toLocaleString()}`,
      title: 'Total Transferred',
      changePercentage: '+15.2%'
    },
    {
      icon: <ClockIcon className='size-4' />,
      value: pendingTransfers.toString(),
      title: 'Pending Transfers',
      changePercentage: `$${transferHistory.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0).toLocaleString()}`
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: activeScheduled.toString(),
      title: 'Scheduled Transfers',
      changePercentage: 'Active'
    },
    {
      icon: <UsersIcon className='size-4' />,
      value: recentBeneficiaries.toString(),
      title: 'Beneficiaries',
      changePercentage: 'Verified'
    }
  ]

  // Get status badge
  const getStatusBadge = (status: Transfer['status']) => {
    const config = {
      completed: { color: 'bg-green-500/10 text-green-700 dark:text-green-400', icon: CheckCircle2Icon },
      pending: { color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400', icon: ClockIcon },
      failed: { color: 'bg-red-500/10 text-red-700 dark:text-red-400', icon: XCircleIcon },
      cancelled: { color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400', icon: XCircleIcon },
      processing: { color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400', icon: AlertCircleIcon }
    }
    const { color, icon: Icon } = config[status]
    return (
      <Badge variant='outline' className={`${color} flex items-center gap-1`}>
        <Icon className='size-3' />
        {status}
      </Badge>
    )
  }

  // Get transfer type badge color
  const getTransferTypeBadge = (type: Transfer['transferType']) => {
    const colors = {
      internal: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      ach: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      wire: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      international: 'bg-red-500/10 text-red-700 dark:text-red-400'
    }
    return <Badge variant='outline' className={colors[type]}>{type.toUpperCase()}</Badge>
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
            {/* Quick Transfer Form */}
            <Card className='lg:col-span-1'>
              <CardHeader>
                <CardTitle>Quick Transfer</CardTitle>
                <CardDescription>Transfer money between accounts</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='from-account'>From Account</Label>
                  <Select value={selectedFromAccount} onValueChange={setSelectedFromAccount}>
                    <SelectTrigger id='from-account'>
                      <SelectValue placeholder='Select account' />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts
                        .filter(acc => acc.status === 'active' && acc.accountType !== 'loan')
                        .map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.nickname} ({account.accountNumber}) - $
                            {account.balance.toLocaleString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='to-account'>To Account/Beneficiary</Label>
                  <Select value={selectedToAccount} onValueChange={setSelectedToAccount}>
                    <SelectTrigger id='to-account'>
                      <SelectValue placeholder='Select beneficiary' />
                    </SelectTrigger>
                    <SelectContent>
                      <optgroup label='My Accounts'>
                        {userAccounts
                          .filter(acc => acc.status === 'active')
                          .map(account => (
                            <SelectItem key={`account-${account.id}`} value={`account-${account.id}`}>
                              {account.nickname} ({account.accountNumber})
                            </SelectItem>
                          ))}
                      </optgroup>
                      <optgroup label='Beneficiaries'>
                        {beneficiaries.map(ben => (
                          <SelectItem key={`ben-${ben.id}`} value={`ben-${ben.id}`}>
                            {ben.nickname} ({ben.accountNumber})
                          </SelectItem>
                        ))}
                      </optgroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount ($)</Label>
                  <input
                    id='amount'
                    type='number'
                    placeholder='0.00'
                    value={transferAmount}
                    onChange={e => setTransferAmount(e.target.value)}
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='memo'>Memo (Optional)</Label>
                  <input
                    id='memo'
                    type='text'
                    placeholder='Add a note'
                    value={transferMemo}
                    onChange={e => setTransferMemo(e.target.value)}
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>

                <Button className='w-full' size='lg'>
                  <SendIcon className='size-4 mr-2' />
                  Transfer Now
                </Button>
              </CardContent>
            </Card>

            {/* Beneficiaries */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>Beneficiaries</CardTitle>
                    <CardDescription>Manage your trusted payees</CardDescription>
                  </div>
                  <Button size='sm'>Add New</Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {beneficiaries.slice(0, 4).map(ben => (
                    <div
                      key={ben.id}
                      className='flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50'
                    >
                      <Avatar>
                        <AvatarImage src={ben.avatar} />
                        <AvatarFallback>{ben.nickname.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium text-sm'>{ben.nickname}</p>
                          {ben.isVerified && (
                            <CheckCircle2Icon className='size-3 text-green-600' />
                          )}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          {ben.bankName} • {ben.accountNumber}
                        </p>
                        {ben.lastUsed && (
                          <p className='text-xs text-muted-foreground'>
                            Last used: {formatDate(ben.lastUsed, 'medium')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transfer Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Volume</CardTitle>
              <CardDescription>Monthly transfer activity breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={transferVolume}>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
                  <XAxis dataKey='month' className='text-xs text-muted-foreground' />
                  <YAxis className='text-xs text-muted-foreground' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey='internal' fill='hsl(var(--chart-1))' name='Internal' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='external' fill='hsl(var(--chart-2))' name='External' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transfer History */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>Recent and past transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {transferHistory.slice(0, 10).map(transfer => (
                  <div
                    key={transfer.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{transfer.toAccount}</p>
                        {getTransferTypeBadge(transfer.transferType)}
                        {getStatusBadge(transfer.status)}
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        From: {transfer.fromAccount} ({transfer.fromAccountNumber})
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {formatDateTime(transfer.date)}
                      </p>
                      {transfer.memo && (
                        <p className='text-xs text-muted-foreground italic'>{transfer.memo}</p>
                      )}
                      <p className='text-xs text-muted-foreground'>Ref: {transfer.referenceNumber}</p>
                    </div>
                    <div className='text-right space-y-1'>
                      <p className='text-lg font-bold'>${transfer.amount.toLocaleString()}</p>
                      {transfer.fee > 0 && (
                        <p className='text-xs text-muted-foreground'>Fee: ${transfer.fee}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Transfers */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Scheduled Transfers</CardTitle>
                  <CardDescription>Recurring and future transfers</CardDescription>
                </div>
                <Button size='sm'>Schedule New</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {scheduledTransfers.map(scheduled => (
                  <div
                    key={scheduled.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{scheduled.toAccount}</p>
                        <Badge
                          variant='outline'
                          className={
                            scheduled.status === 'active'
                              ? 'bg-green-500/10 text-green-700'
                              : scheduled.status === 'paused'
                              ? 'bg-yellow-500/10 text-yellow-700'
                              : 'bg-gray-500/10 text-gray-700'
                          }
                        >
                          {scheduled.status}
                        </Badge>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {scheduled.frequency.charAt(0).toUpperCase() + scheduled.frequency.slice(1)} • Next:{' '}
                        {formatDate(scheduled.nextDate, 'medium')}
                      </p>
                      {scheduled.memo && (
                        <p className='text-xs text-muted-foreground italic'>{scheduled.memo}</p>
                      )}
                    </div>
                    <div className='text-right'>
                      <p className='text-lg font-bold'>${scheduled.amount.toLocaleString()}</p>
                      <p className='text-xs text-muted-foreground'>
                        From: {scheduled.fromAccountNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
