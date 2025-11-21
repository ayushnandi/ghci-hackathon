'use client'

import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  PieChartIcon,
  BarChart3Icon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import {
  investmentHoldings,
  portfolioMetrics,
  assetAllocation,
  portfolioPerformance,
  sectorPerformance
} from '@/lib/mock-data/investments'

export default function Investments() {
  // Statistics card data
  const statisticsCardData = [
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${portfolioMetrics.totalValue.toLocaleString()}`,
      title: 'Portfolio Value',
      changePercentage: `+${portfolioMetrics.totalGainLossPercentage}%`
    },
    {
      icon: portfolioMetrics.todayChange >= 0 ? <TrendingUpIcon className='size-4' /> : <TrendingDownIcon className='size-4' />,
      value: `${portfolioMetrics.todayChange >= 0 ? '+' : ''}$${portfolioMetrics.todayChange.toLocaleString()}`,
      title: "Today's Change",
      changePercentage: `${portfolioMetrics.todayChangePercentage >= 0 ? '+' : ''}${portfolioMetrics.todayChangePercentage}%`
    },
    {
      icon: <BarChart3Icon className='size-4' />,
      value: `+$${portfolioMetrics.totalGainLoss.toLocaleString()}`,
      title: 'Total Gain/Loss',
      changePercentage: `+${portfolioMetrics.totalGainLossPercentage}%`
    },
    {
      icon: <PieChartIcon className='size-4' />,
      value: `${portfolioMetrics.oneYearReturn}%`,
      title: '1-Year Return',
      changePercentage: 'YTD: +' + portfolioMetrics.ytdReturn + '%'
    }
  ]

  // Get asset type badge color
  const getAssetTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      stock: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      etf: 'bg-green-500/10 text-green-700 dark:text-green-400',
      mutual_fund: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      bond: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      crypto: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
      real_estate: 'bg-teal-500/10 text-teal-700 dark:text-teal-400'
    }
    return <Badge variant='outline' className={colors[type]}>{type.toUpperCase().replace('_', ' ')}</Badge>
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

          {/* Portfolio Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your investment growth over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={portfolioPerformance}>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
                  <XAxis dataKey='date' className='text-xs text-muted-foreground' />
                  <YAxis className='text-xs text-muted-foreground' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='hsl(var(--chart-1))'
                    strokeWidth={2}
                    dot={false}
                    name='Portfolio Value'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Asset Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Portfolio distribution by asset type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      dataKey='percentage'
                      nameKey='assetType'
                      cx='50%'
                      cy='50%'
                      outerRadius={100}
                      label={(entry) => `${entry.assetType}: ${entry.percentage}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                      formatter={(value: number, name: string, props: any) => [
                        `$${props.payload.value.toLocaleString()} (${value}%)`,
                        props.payload.assetType
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className='mt-4 space-y-2'>
                  {assetAllocation.map((asset, index) => (
                    <div key={index} className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='size-3 rounded-full'
                          style={{ backgroundColor: asset.color }}
                        />
                        <span>{asset.assetType}</span>
                      </div>
                      <span className='font-medium'>${asset.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Performance breakdown by sector</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {sectorPerformance.map((sector, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between rounded-lg border p-3'
                  >
                    <div className='flex-1 space-y-1'>
                      <p className='font-medium'>{sector.sector}</p>
                      <p className='text-sm text-muted-foreground'>
                        ${sector.value.toLocaleString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p
                        className={`font-semibold flex items-center justify-end ${
                          sector.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {sector.gainLoss >= 0 ? <ArrowUpIcon className='size-4' /> : <ArrowDownIcon className='size-4' />}
                        {sector.percentage >= 0 ? '+' : ''}{sector.percentage}%
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {sector.gainLoss >= 0 ? '+' : ''}${sector.gainLoss.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Holdings</CardTitle>
              <CardDescription>Your current investment positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {investmentHoldings.map(holding => (
                  <div
                    key={holding.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='flex items-center gap-3 flex-1'>
                      <Avatar>
                        <AvatarImage src={holding.logo} />
                        <AvatarFallback>{holding.symbol.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{holding.symbol}</p>
                          {getAssetTypeBadge(holding.type)}
                        </div>
                        <p className='text-sm text-muted-foreground'>{holding.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {holding.shares} shares @ ${holding.currentPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className='text-right space-y-1'>
                      <p className='text-lg font-bold'>${holding.totalValue.toLocaleString()}</p>
                      <p
                        className={`text-sm font-medium flex items-center justify-end ${
                          holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {holding.gainLoss >= 0 ? <ArrowUpIcon className='size-3' /> : <ArrowDownIcon className='size-3' />}
                        {holding.gainLossPercentage >= 0 ? '+' : ''}{holding.gainLossPercentage}%
                      </p>
                      <p
                        className={`text-xs ${
                          holding.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        Today: {holding.dayChange >= 0 ? '+' : ''}${holding.dayChange.toLocaleString()}
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
