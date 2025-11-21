'use client'

import {
  UploadIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertTriangleIcon,
  XCircleIcon,
  DollarSignIcon,
  TrendingUpIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import {
  depositHistory,
  depositLimits,
  depositTrends,
  depositStatusSummary,
  Deposit
} from '@/lib/mock-data/deposits'
import { formatDateTime, formatDate } from '@/lib/utils/date'

export default function DepositServices() {
  const clearedDeposits = depositHistory.filter(d => d.status === 'cleared')
  const totalDeposited = clearedDeposits.reduce((sum, d) => sum + d.amount, 0)
  const processingDeposits = depositHistory.filter(d => d.status === 'processing').length
  const pendingAmount = depositHistory
    .filter(d => d.status === 'processing' || d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0)

  const statisticsCardData = [
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalDeposited.toLocaleString()}`,
      title: 'Total Deposited',
      changePercentage: 'Last 30 days'
    },
    {
      icon: <ClockIcon className='size-4' />,
      value: processingDeposits.toString(),
      title: 'Processing Deposits',
      changePercentage: `$${pendingAmount.toLocaleString()}`
    },
    {
      icon: <CheckCircle2Icon className='size-4' />,
      value: depositStatusSummary.cleared.toString(),
      title: 'Cleared Deposits',
      changePercentage: 'All time'
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: `$${(totalDeposited / clearedDeposits.length).toLocaleString()}`,
      title: 'Average Deposit',
      changePercentage: 'Per transaction'
    }
  ]

  const getStatusBadge = (status: Deposit['status']) => {
    const config = {
      cleared: { color: 'bg-green-500/10 text-green-700 dark:text-green-400', icon: CheckCircle2Icon },
      processing: { color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400', icon: ClockIcon },
      pending: { color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400', icon: ClockIcon },
      held: { color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400', icon: AlertTriangleIcon },
      failed: { color: 'bg-red-500/10 text-red-700 dark:text-red-400', icon: XCircleIcon }
    }
    const { color, icon: Icon } = config[status]
    return (
      <Badge variant='outline' className={`${color} flex items-center gap-1`}>
        <Icon className='size-3' />
        {status}
      </Badge>
    )
  }

  const getDepositTypeBadge = (type: Deposit['type']) => {
    const colors = {
      direct_deposit: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      mobile_check: 'bg-green-500/10 text-green-700 dark:text-green-400',
      wire: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      ach: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      cash: 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
    }
    return (
      <Badge variant='outline' className={colors[type]}>
        {type.toUpperCase().replace('_', ' ')}
      </Badge>
    )
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
            {/* Mobile Check Deposit */}
            <Card className='lg:col-span-1'>
              <CardHeader>
                <CardTitle>Mobile Check Deposit</CardTitle>
                <CardDescription>Deposit checks from your phone</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='rounded-lg border-2 border-dashed p-8 text-center'>
                  <UploadIcon className='size-12 mx-auto text-muted-foreground mb-4' />
                  <p className='text-sm text-muted-foreground mb-4'>
                    Upload front and back images of your check
                  </p>
                  <Button>Start Deposit</Button>
                </div>
                <div className='space-y-2 text-sm text-muted-foreground'>
                  <p>• Maximum $5,000 per check</p>
                  <p>• Funds available in 1-2 business days</p>
                  <p>• Keep check for 30 days after deposit</p>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Limits */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Deposit Limits</CardTitle>
                <CardDescription>Your current deposit limits and usage</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {depositLimits.map((limit, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium text-sm'>
                          {limit.depositType.toUpperCase().replace('_', ' ')} - {limit.limitType.charAt(0).toUpperCase() + limit.limitType.slice(1)}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Resets: {formatDate(limit.resetDate, 'medium')}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold'>${limit.remaining.toLocaleString()} remaining</p>
                        <p className='text-xs text-muted-foreground'>
                          of ${limit.limit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Progress value={(limit.used / limit.limit) * 100} className='h-2' />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Deposit Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Deposit Trends</CardTitle>
              <CardDescription>Monthly deposit activity by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={depositTrends}>
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
                  <Bar dataKey='directDeposit' fill='hsl(var(--chart-1))' name='Direct Deposit' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='mobileCheck' fill='hsl(var(--chart-2))' name='Mobile Check' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='wire' fill='hsl(var(--chart-3))' name='Wire' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='ach' fill='hsl(var(--chart-4))' name='ACH' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Deposit History */}
          <Card>
            <CardHeader>
              <CardTitle>Deposit History</CardTitle>
              <CardDescription>Recent and past deposits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {depositHistory.slice(0, 10).map(deposit => (
                  <div
                    key={deposit.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{deposit.source}</p>
                        {getDepositTypeBadge(deposit.type)}
                        {getStatusBadge(deposit.status)}
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Account: {deposit.accountNumber}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {formatDateTime(deposit.date)}
                      </p>
                      {deposit.expectedClearingDate && deposit.status !== 'cleared' && (
                        <p className='text-xs text-muted-foreground'>
                          Expected: {formatDate(deposit.expectedClearingDate, 'medium')}
                        </p>
                      )}
                      {deposit.memo && (
                        <p className='text-xs text-muted-foreground italic'>{deposit.memo}</p>
                      )}
                      <p className='text-xs text-muted-foreground'>Confirmation: {deposit.confirmationNumber}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-lg font-bold'>${deposit.amount.toLocaleString()}</p>
                      {deposit.checkNumber && (
                        <p className='text-xs text-muted-foreground'>Check #{deposit.checkNumber}</p>
                      )}
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
