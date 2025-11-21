'use client'

import {
  ArrowDownUpIcon,
  BadgePercentIcon,
  ChartNoAxesCombinedIcon,
  CirclePercentIcon,
  CoinsIcon,
  PiggyBankIcon,
  TrendingDownIcon
} from 'lucide-react'

import { Bar, BarChart, Label, Pie, PieChart } from 'recharts'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const budgetPercentage = 78
const totalBars = 24
const filledBars = Math.round((budgetPercentage * totalBars) / 100)

// Budget tracking chart data
const budgetChartData = Array.from({ length: totalBars }, (_, index) => {
  const date = new Date(2025, 11, 1 + index)

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return {
    date: formattedDate,
    spending: index < filledBars ? 315 : 0
  }
})

const budgetChartConfig = {
  spending: {
    label: 'Spending'
  }
} satisfies ChartConfig

const MetricsData = [
  {
    icons: <TrendingDownIcon className='size-5' />,
    title: 'Monthly Spending',
    value: '$7,854'
  },
  {
    icons: <BadgePercentIcon className='size-5' />,
    title: 'Cashback Earned',
    value: '$425'
  },
  {
    icons: <PiggyBankIcon className='size-5' />,
    title: 'Total Savings',
    value: '$24,680'
  },
  {
    icons: <ArrowDownUpIcon className='size-5' />,
    title: 'Total Transactions',
    value: '1,006'
  }
]

const savingsGoalChartData = [
  { category: 'achieved', amount: 115000, fill: 'var(--color-achieved)' },
  { category: 'housing', amount: 28800, fill: 'var(--color-housing)' },
  { category: 'other', amount: 45200, fill: 'var(--color-other)' }
]

const savingsGoalChartConfig = {
  amount: {
    label: 'Amount'
  },
  achieved: {
    label: 'Savings Achieved',
    color: 'var(--primary)'
  },
  housing: {
    label: 'Housing',
    color: 'color-mix(in oklab, var(--primary) 60%, transparent)'
  },
  other: {
    label: 'Other Expenses',
    color: 'color-mix(in oklab, var(--primary) 20%, transparent)'
  }
} satisfies ChartConfig

const SalesMetricsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardContent className='space-y-4'>
        <div className='grid gap-6 lg:grid-cols-5'>
          <div className='flex flex-col gap-7 lg:col-span-3'>
            <span className='text-lg font-semibold'>Banking Metrics</span>
            <div className='flex items-center gap-3'>
              <Avatar className='size-12 rounded-lg'>
                <AvatarFallback className='rounded-lg text-lg font-medium'>SA</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5'>
                <span className='text-xl font-medium'>Sarah Anderson</span>
                <span className='text-muted-foreground text-sm'>Account ****8945</span>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              {MetricsData.map((metric, index) => (
                <div key={index} className='flex items-center gap-3 rounded-md border px-4 py-2'>
                  <Avatar className='size-8.5 rounded-sm'>
                    <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                      {metric.icons}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-muted-foreground text-sm font-medium'>{metric.title}</span>
                    <span className='text-lg font-medium'>{metric.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className='gap-4 py-4 shadow-none lg:col-span-2'>
            <CardHeader className='gap-1'>
              <CardTitle className='text-lg font-semibold'>Savings Goal</CardTitle>
            </CardHeader>

            <CardContent className='px-0'>
              <ChartContainer config={savingsGoalChartConfig} className='h-38.5 w-full'>
                <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={savingsGoalChartData}
                    dataKey='amount'
                    nameKey='category'
                    startAngle={300}
                    endAngle={660}
                    innerRadius={58}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 12}
                                className='fill-card-foreground text-lg font-medium'
                              >
                                $115K
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 19}
                                className='fill-muted-foreground text-sm'
                              >
                                Total Saved
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>

            <CardFooter className='justify-between'>
              <span className='text-xl'>Goal Achieved</span>
              <span className='text-2xl font-medium'>115%</span>
            </CardFooter>
          </Card>
        </div>
        <Card className='shadow-none'>
          <CardContent className='grid gap-4 px-4 lg:grid-cols-5'>
            <div className='flex flex-col justify-center gap-6'>
              <span className='text-lg font-semibold'>Budget Tracker</span>
              <span className='max-lg:5xl text-6xl'>{budgetPercentage}%</span>
              <span className='text-muted-foreground text-sm'>Budget utilization this month</span>
            </div>
            <div className='flex flex-col gap-6 text-lg md:col-span-4'>
              <span className='font-medium'>Spending Analysis</span>
              <span className='text-muted-foreground text-wrap'>
                Track your spending patterns across different categories and monitor your budget adherence throughout the
                month.
              </span>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='flex items-center gap-2'>
                  <ChartNoAxesCombinedIcon className='size-6' />
                  <span className='text-lg font-medium'>Category Breakdown</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CirclePercentIcon className='size-6' />
                  <span className='text-lg font-medium'>Budget vs Actual</span>
                </div>
              </div>

              <ChartContainer config={budgetChartConfig} className='h-7.75 w-full'>
                <BarChart
                  accessibilityLayer
                  data={budgetChartData}
                  margin={{
                    left: 0,
                    right: 0
                  }}
                  maxBarSize={16}
                >
                  <Bar
                    dataKey='spending'
                    fill='var(--primary)'
                    background={{ fill: 'color-mix(in oklab, var(--primary) 10%, transparent)', radius: 12 }}
                    radius={12}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default SalesMetricsCard
