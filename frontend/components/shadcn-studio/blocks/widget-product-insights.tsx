'use client'

import { Bar, BarChart } from 'recharts'
import { LandmarkIcon } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

// Transaction activity data - last 5 months
const transactionChartData = [
  { month: 'August', transactions: 168 },
  { month: 'September', transactions: 205 },
  { month: 'October', transactions: 213 },
  { month: 'November', transactions: 195 },
  { month: 'December', transactions: 225 }
]

const transactionChartConfig = {
  transactions: {
    label: 'Transactions',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

// Deposits data - last 5 months
const depositsChartData = [
  { month: 'August', deposits: 42 },
  { month: 'September', deposits: 58 },
  { month: 'October', deposits: 51 },
  { month: 'November', deposits: 63 },
  { month: 'December', deposits: 72 }
]

const depositsChartConfig = {
  deposits: {
    label: 'Deposits',
    color: 'color-mix(in oklab, var(--primary) 10%, transparent)'
  }
} satisfies ChartConfig

const ProductInsightsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>Account Activity</span>
          <span className='text-muted-foreground text-sm'>Last updated on 21 NOV 2025 - 3:45 PM</span>
        </div>
        <div className='bg-primary/10 flex size-16 items-center justify-center rounded-md'>
          <LandmarkIcon className='text-primary size-8' />
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Separator />
        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Total Transactions</span>
            <span className='text-2xl font-semibold'>1,006</span>
          </div>
          <ChartContainer config={transactionChartConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={transactionChartData} barSize={8}>
              <Bar dataKey='transactions' fill='var(--color-transactions)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Deposits Made</span>
            <span className='text-2xl font-semibold'>286</span>
          </div>
          <ChartContainer config={depositsChartConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={depositsChartData} barSize={8}>
              <Bar dataKey='deposits' fill='var(--color-deposits)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductInsightsCard
