// ============================================================================
// Banking Dashboard Data Types and Mock Data
// ============================================================================

// ----------------------------------------------------------------------------
// Statistics Card Types
// ----------------------------------------------------------------------------

export interface StatisticsCardData {
  icon: React.ReactNode
  value: string
  title: string
  changePercentage: string
}

// ----------------------------------------------------------------------------
// Account Insights Types
// ----------------------------------------------------------------------------

export interface AccountActivity {
  month: string
  transactions: number
  deposits: number
}

// ----------------------------------------------------------------------------
// Investment/Account Portfolio Types
// ----------------------------------------------------------------------------

export interface AccountData {
  img: string
  accountType: string
  accountNumber: string
  balance: string
  allocationPercentage: number
}

// ----------------------------------------------------------------------------
// Banking Metrics Types
// ----------------------------------------------------------------------------

export interface BankingProfile {
  avatar: string
  name: string
  accountNumber: string
  email: string
  memberSince: string
}

export interface MetricData {
  icon: React.ReactNode
  title: string
  value: string
  change: string
}

export interface SavingsGoalData {
  month: string
  current: number
  target: number
}

export interface BudgetAnalysisData {
  category: string
  amount: number
  budget: number
  percentage: number
}

// ----------------------------------------------------------------------------
// Transaction Types
// ----------------------------------------------------------------------------

export interface BankingTransaction {
  id: string
  avatar: string
  avatarFallback: string
  name: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'processing'
  email: string
  transactionType: 'debit' | 'credit'
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet'
  category: string
  date: string
  description: string
}

// ============================================================================
// MOCK DATA - Account Insights
// ============================================================================

export const accountActivityData: AccountActivity[] = [
  { month: 'Jan', transactions: 45, deposits: 12 },
  { month: 'Feb', transactions: 52, deposits: 15 },
  { month: 'Mar', transactions: 48, deposits: 11 },
  { month: 'Apr', transactions: 61, deposits: 18 },
  { month: 'May', transactions: 55, deposits: 16 },
  { month: 'Jun', transactions: 67, deposits: 20 },
  { month: 'Jul', transactions: 72, deposits: 22 },
  { month: 'Aug', transactions: 68, deposits: 19 },
  { month: 'Sep', transactions: 75, deposits: 24 },
  { month: 'Oct', transactions: 81, deposits: 26 },
  { month: 'Nov', transactions: 78, deposits: 25 },
  { month: 'Dec', transactions: 85, deposits: 28 }
]

// ============================================================================
// MOCK DATA - Investment/Account Portfolio
// ============================================================================

export const accountPortfolioData: AccountData[] = [
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/zipcar.png',
    accountType: 'Savings Account',
    accountNumber: '****4532',
    balance: '$524,890.45',
    allocationPercentage: 42
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/bitbank.png',
    accountType: 'Investment Portfolio',
    accountNumber: '****7821',
    balance: '$721,000.22',
    allocationPercentage: 58
  }
]

// ============================================================================
// MOCK DATA - Banking Profile
// ============================================================================

export const bankingProfile: BankingProfile = {
  avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
  name: 'Sarah Anderson',
  accountNumber: '****8945',
  email: 'sarah.anderson@email.com',
  memberSince: 'January 2020'
}

// ============================================================================
// MOCK DATA - Savings Goal Data
// ============================================================================

export const savingsGoalData: SavingsGoalData[] = [
  { month: 'Jan', current: 45000, target: 100000 },
  { month: 'Feb', current: 52000, target: 100000 },
  { month: 'Mar', current: 58000, target: 100000 },
  { month: 'Apr', current: 65000, target: 100000 },
  { month: 'May', current: 71000, target: 100000 },
  { month: 'Jun', current: 78000, target: 100000 },
  { month: 'Jul', current: 84000, target: 100000 },
  { month: 'Aug', current: 89000, target: 100000 },
  { month: 'Sep', current: 95000, target: 100000 },
  { month: 'Oct', current: 101000, target: 100000 },
  { month: 'Nov', current: 107000, target: 100000 },
  { month: 'Dec', current: 115000, target: 100000 }
]

// ============================================================================
// MOCK DATA - Budget Analysis
// ============================================================================

export const budgetAnalysisData: BudgetAnalysisData[] = [
  { category: 'Housing', amount: 2400, budget: 2500, percentage: 96 },
  { category: 'Food', amount: 850, budget: 1000, percentage: 85 },
  { category: 'Transport', amount: 420, budget: 500, percentage: 84 },
  { category: 'Entertainment', amount: 380, budget: 400, percentage: 95 },
  { category: 'Shopping', amount: 650, budget: 800, percentage: 81 },
  { category: 'Healthcare', amount: 290, budget: 400, percentage: 73 },
  { category: 'Utilities', amount: 340, budget: 350, percentage: 97 },
  { category: 'Education', amount: 520, budget: 600, percentage: 87 },
  { category: 'Savings', amount: 1850, budget: 2000, percentage: 93 },
  { category: 'Others', amount: 245, budget: 300, percentage: 82 }
]

// ============================================================================
// MOCK DATA - Banking Transactions
// ============================================================================

export const bankingTransactions: BankingTransaction[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    avatarFallback: 'BTC',
    name: 'Bitcoin Investment',
    amount: 5000.0,
    status: 'completed',
    email: 'trades@coinbase.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Cryptocurrency',
    date: '2025-11-20T14:32:00',
    description: 'Bitcoin purchase - 0.078 BTC'
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    avatarFallback: 'SA',
    name: 'Salary Deposit',
    amount: 8500.0,
    status: 'completed',
    email: 'payroll@company.com',
    transactionType: 'credit',
    paymentMethod: 'netbanking',
    category: 'Salary',
    date: '2025-11-20T09:00:00',
    description: 'Monthly salary credit'
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    avatarFallback: 'ETH',
    name: 'Ethereum Investment',
    amount: 3500.0,
    status: 'completed',
    email: 'trades@binance.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Cryptocurrency',
    date: '2025-11-19T16:45:00',
    description: 'Ethereum purchase - 1.2 ETH'
  },
  {
    id: '4',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
    avatarFallback: 'LI',
    name: 'Life Insurance Premium',
    amount: 850.0,
    status: 'pending',
    email: 'billing@lifeinsurance.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Insurance',
    date: '2025-11-19T12:00:00',
    description: 'Quarterly life insurance premium'
  },
  {
    id: '5',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    avatarFallback: 'EB',
    name: 'Electricity Bill',
    amount: 245.75,
    status: 'completed',
    email: 'billing@power.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Utilities',
    date: '2025-11-18T10:15:00',
    description: 'Monthly electricity payment'
  },
  {
    id: '6',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    avatarFallback: 'GD',
    name: 'Gold Investment',
    amount: 6500.0,
    status: 'completed',
    email: 'invest@goldmarket.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-18T08:30:00',
    description: 'Digital gold purchase - 25g'
  },
  {
    id: '7',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    avatarFallback: 'FR',
    name: 'Freelance Payment',
    amount: 1200.0,
    status: 'completed',
    email: 'client@business.com',
    transactionType: 'credit',
    paymentMethod: 'upi',
    category: 'Income',
    date: '2025-11-17T14:20:00',
    description: 'Project milestone payment'
  },
  {
    id: '8',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    avatarFallback: 'GB',
    name: 'Government Bonds',
    amount: 10000.0,
    status: 'processing',
    email: 'invest@treasury.gov',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-17T11:45:00',
    description: 'Treasury bonds - 10 year maturity'
  },
  {
    id: '9',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    avatarFallback: 'GY',
    name: 'Gym Membership',
    amount: 89.99,
    status: 'completed',
    email: 'billing@fitness.com',
    transactionType: 'debit',
    paymentMethod: 'card',
    category: 'Health & Fitness',
    date: '2025-11-16T07:00:00',
    description: 'Monthly gym membership'
  },
  {
    id: '10',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
    avatarFallback: 'MF',
    name: 'Mutual Fund SIP',
    amount: 2500.0,
    status: 'completed',
    email: 'invest@mutualfund.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-16T00:05:00',
    description: 'Monthly SIP - Equity Growth Fund'
  },
  {
    id: '11',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    avatarFallback: 'TS',
    name: 'Tesla Stock Purchase',
    amount: 4200.0,
    status: 'completed',
    email: 'trades@broker.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-15T15:30:00',
    description: 'Premium stock - 20 shares TSLA'
  },
  {
    id: '12',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
    avatarFallback: 'RF',
    name: 'Tax Refund',
    amount: 2450.0,
    status: 'completed',
    email: 'refunds@irs.gov',
    transactionType: 'credit',
    paymentMethod: 'netbanking',
    category: 'Income',
    date: '2025-11-15T10:00:00',
    description: 'Annual tax refund'
  },
  {
    id: '13',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
    avatarFallback: 'IF',
    name: 'Index Fund Investment',
    amount: 7500.0,
    status: 'completed',
    email: 'invest@vanguard.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-14T13:20:00',
    description: 'S&P 500 Index Fund - Monthly investment'
  },
  {
    id: '14',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
    avatarFallback: 'IN',
    name: 'Insurance Premium',
    amount: 425.0,
    status: 'completed',
    email: 'billing@insurance.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Insurance',
    date: '2025-11-14T09:30:00',
    description: 'Monthly insurance payment'
  },
  {
    id: '15',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
    avatarFallback: 'DD',
    name: 'DoorDash Delivery',
    amount: 45.32,
    status: 'completed',
    email: 'orders@doordash.com',
    transactionType: 'debit',
    paymentMethod: 'upi',
    category: 'Food & Dining',
    date: '2025-11-13T19:45:00',
    description: 'Dinner delivery'
  },
  {
    id: '16',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    avatarFallback: 'GS',
    name: 'Gas Station',
    amount: 67.8,
    status: 'completed',
    email: 'store@shell.com',
    transactionType: 'debit',
    paymentMethod: 'card',
    category: 'Transportation',
    date: '2025-11-13T08:15:00',
    description: 'Fuel purchase'
  },
  {
    id: '17',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
    avatarFallback: 'PH',
    name: 'Pharmacy',
    amount: 89.45,
    status: 'failed',
    email: 'store@cvs.com',
    transactionType: 'debit',
    paymentMethod: 'card',
    category: 'Healthcare',
    date: '2025-11-12T16:30:00',
    description: 'Prescription medication'
  },
  {
    id: '18',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
    avatarFallback: 'BK',
    name: 'Book Store',
    amount: 56.99,
    status: 'completed',
    email: 'orders@bookstore.com',
    transactionType: 'debit',
    paymentMethod: 'card',
    category: 'Education',
    date: '2025-11-12T14:00:00',
    description: 'Technical books purchase'
  },
  {
    id: '19',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
    avatarFallback: 'CA',
    name: 'Cashback Reward',
    amount: 125.5,
    status: 'completed',
    email: 'rewards@bank.com',
    transactionType: 'credit',
    paymentMethod: 'card',
    category: 'Cashback',
    date: '2025-11-11T12:00:00',
    description: 'Monthly cashback credit'
  },
  {
    id: '20',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
    avatarFallback: 'RE',
    name: 'Restaurant',
    amount: 98.75,
    status: 'completed',
    email: 'reservations@restaurant.com',
    transactionType: 'debit',
    paymentMethod: 'card',
    category: 'Food & Dining',
    date: '2025-11-11T20:30:00',
    description: 'Dinner with friends'
  },
  {
    id: '21',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
    avatarFallback: 'RE',
    name: 'Real Estate Investment',
    amount: 15000.0,
    status: 'pending',
    email: 'invest@reit.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-10T10:00:00',
    description: 'REIT investment - Commercial property fund'
  },
  {
    id: '22',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-22.png',
    avatarFallback: 'DV',
    name: 'Dividend Payment',
    amount: 385.25,
    status: 'completed',
    email: 'invest@broker.com',
    transactionType: 'credit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-10T09:00:00',
    description: 'Quarterly dividend credit'
  },
  {
    id: '23',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-23.png',
    avatarFallback: 'PR',
    name: 'Parking Fee',
    amount: 15.0,
    status: 'completed',
    email: 'parking@city.com',
    transactionType: 'debit',
    paymentMethod: 'wallet',
    category: 'Transportation',
    date: '2025-11-09T14:30:00',
    description: 'Downtown parking'
  },
  {
    id: '24',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
    avatarFallback: 'CH',
    name: 'Charity Donation',
    amount: 200.0,
    status: 'completed',
    email: 'donate@charity.org',
    transactionType: 'debit',
    paymentMethod: 'upi',
    category: 'Donation',
    date: '2025-11-09T11:00:00',
    description: 'Monthly charitable contribution'
  },
  {
    id: '25',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-25.png',
    avatarFallback: 'SM',
    name: 'Stock Market',
    amount: 1500.0,
    status: 'completed',
    email: 'trades@broker.com',
    transactionType: 'debit',
    paymentMethod: 'netbanking',
    category: 'Investment',
    date: '2025-11-08T10:30:00',
    description: 'Stock purchase - TECH'
  }
]
