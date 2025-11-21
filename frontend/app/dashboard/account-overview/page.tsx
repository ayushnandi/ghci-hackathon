'use client'

import { useState } from 'react'
import {
  WalletIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CreditCardIcon,
  DownloadIcon,
  FileTextIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { userAccounts, balanceHistory, accountStatements, taxDocuments } from '@/lib/mock-data/accounts'
import { bankingTransactions } from '@/lib/banking-data'
import { formatDateTime } from '@/lib/utils/date'

export default function AccountOverview() {
  const [showBalance, setShowBalance] = useState(false)

  // Calculate total balances
  const totalBalance = userAccounts.reduce((sum, acc) => {
    if (acc.accountType !== 'loan') {
      return sum + acc.balance
    }
    return sum
  }, 0)

  const totalAssets = userAccounts
    .filter(acc => acc.accountType === 'investment')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const totalSavings = userAccounts
    .filter(acc => acc.accountType === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const activeAccounts = userAccounts.filter(acc => acc.status === 'active').length

  // Statistics card data
  const statisticsCardData = [
    {
      icon: <WalletIcon className='size-4' />,
      value: showBalance ? `$${totalBalance.toLocaleString()}` : '$XXX,XXX',
      title: 'Total Balance',
      changePercentage: '+12.5%',
      action: (
        <Button
          variant='ghost'
          size='icon'
          className='size-6 hover:bg-primary/10'
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
        </Button>
      )
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: `$${totalAssets.toLocaleString()}`,
      title: 'Investments',
      changePercentage: '+18.3%'
    },
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalSavings.toLocaleString()}`,
      title: 'Total Savings',
      changePercentage: '+8.7%'
    },
    {
      icon: <CreditCardIcon className='size-4' />,
      value: activeAccounts.toString(),
      title: 'Active Accounts',
      changePercentage: '+2'
    }
  ]

  // Get account type badge color
  const getAccountTypeBadge = (type: string, status: string) => {
    if (status !== 'active') {
      return <Badge variant='outline' className='text-muted-foreground'>{status}</Badge>
    }

    const colors: Record<string, string> = {
      checking: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      savings: 'bg-green-500/10 text-green-700 dark:text-green-400',
      credit: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      investment: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      loan: 'bg-red-500/10 text-red-700 dark:text-red-400'
    }
    return <Badge variant='outline' className={colors[type]}>{type}</Badge>
  }

  // Recent activity - last 5 transactions
  const recentActivity = bankingTransactions.slice(0, 5)

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
                action={card.action}
              />
            ))}
          </div>

          {/* Balance History Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Balance History</CardTitle>
              <CardDescription>Your account balance trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id='colorChecking' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(var(--chart-1))' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='hsl(var(--chart-1))' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id='colorSavings' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(var(--chart-2))' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='hsl(var(--chart-2))' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id='colorInvestment' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(var(--chart-3))' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='hsl(var(--chart-3))' stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type='monotone'
                    dataKey='checking'
                    stroke='hsl(var(--chart-1))'
                    fillOpacity={1}
                    fill='url(#colorChecking)'
                    name='Checking'
                  />
                  <Area
                    type='monotone'
                    dataKey='savings'
                    stroke='hsl(var(--chart-2))'
                    fillOpacity={1}
                    fill='url(#colorSavings)'
                    name='Savings'
                  />
                  <Area
                    type='monotone'
                    dataKey='investment'
                    stroke='hsl(var(--chart-3))'
                    fillOpacity={1}
                    fill='url(#colorInvestment)'
                    name='Investment'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Account Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Your Accounts</CardTitle>
                <CardDescription>Manage your banking accounts</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {userAccounts.map(account => (
                  <div
                    key={account.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{account.nickname}</p>
                        {getAccountTypeBadge(account.accountType, account.status)}
                      </div>
                      <p className='text-sm text-muted-foreground'>{account.accountNumber}</p>
                      {account.interestRate && (
                        <p className='text-xs text-muted-foreground'>
                          {account.interestRate}% APY
                        </p>
                      )}
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold'>
                        {account.accountType === 'credit' ? 'Available' : 'Balance'}
                      </p>
                      <p className='text-lg font-bold'>
                        ${Math.abs(account.balance).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {recentActivity.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className='flex items-start gap-4 border-l-2 border-muted pl-4 pb-4 last:pb-0'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium text-sm'>{transaction.name}</p>
                        <Badge
                          variant='outline'
                          className={
                            transaction.status === 'completed'
                              ? 'bg-green-500/10 text-green-700'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-700'
                              : 'bg-red-500/10 text-red-700'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className='text-xs text-muted-foreground'>{transaction.description}</p>
                      <p className='text-xs text-muted-foreground'>
                        {formatDateTime(transaction.date)}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p
                        className={`font-semibold flex items-center ${
                          transaction.transactionType === 'credit'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.transactionType === 'credit' ? (
                          <ArrowUpRight className='size-4' />
                        ) : (
                          <ArrowDownRight className='size-4' />
                        )}
                        ${transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Document Center */}
          <Card>
            <CardHeader>
              <CardTitle>Document Center</CardTitle>
              <CardDescription>Access your statements and tax documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* Statements */}
                <div className='space-y-4'>
                  <h3 className='font-semibold flex items-center gap-2'>
                    <FileTextIcon className='size-5' />
                    Account Statements
                  </h3>
                  <div className='space-y-2'>
                    {accountStatements.map(statement => {
                      const account = userAccounts.find(acc => acc.id === statement.accountId)
                      return (
                        <div
                          key={statement.id}
                          className='flex items-center justify-between rounded-lg border p-3'
                        >
                          <div>
                            <p className='font-medium text-sm'>{account?.nickname}</p>
                            <p className='text-xs text-muted-foreground'>
                              {new Date(statement.statementDate).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <Button variant='ghost' size='sm'>
                            <DownloadIcon className='size-4' />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tax Documents */}
                <div className='space-y-4'>
                  <h3 className='font-semibold flex items-center gap-2'>
                    <FileTextIcon className='size-5' />
                    Tax Documents
                  </h3>
                  <div className='space-y-2'>
                    {taxDocuments.map(doc => {
                      const account = userAccounts.find(acc => acc.id === doc.accountId)
                      return (
                        <div
                          key={doc.id}
                          className='flex items-center justify-between rounded-lg border p-3'
                        >
                          <div>
                            <p className='font-medium text-sm'>
                              {doc.documentType} - {doc.taxYear}
                            </p>
                            <p className='text-xs text-muted-foreground'>{account?.nickname}</p>
                            <p className='text-xs text-muted-foreground'>
                              ${doc.amount.toLocaleString()}
                            </p>
                          </div>
                          <Button variant='ghost' size='sm'>
                            <DownloadIcon className='size-4' />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
