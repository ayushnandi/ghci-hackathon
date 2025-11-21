// ============================================================================
// Account Management - Mock Data
// ============================================================================

export interface Account {
  id: string
  accountType: 'checking' | 'savings' | 'credit' | 'loan' | 'investment'
  nickname: string
  accountNumber: string
  routingNumber?: string
  balance: number
  availableBalance: number
  status: 'active' | 'closed' | 'frozen' | 'pending'
  openedDate: string
  interestRate?: number
  minimumBalance?: number
  monthlyFee?: number
  currency: string
  isDefault: boolean
}

export interface AccountStatement {
  id: string
  accountId: string
  statementDate: string
  startDate: string
  endDate: string
  openingBalance: number
  closingBalance: number
  totalCredits: number
  totalDebits: number
  url: string
}

export interface TaxDocument {
  id: string
  documentType: '1099' | '1098' | 'W2' | '5498'
  taxYear: number
  accountId: string
  amount: number
  issuedDate: string
  url: string
}

// ============================================================================
// MOCK DATA - Accounts
// ============================================================================

export const userAccounts: Account[] = [
  {
    id: '1',
    accountType: 'checking',
    nickname: 'Primary Checking',
    accountNumber: '****4532',
    routingNumber: '021000021',
    balance: 847532.45,
    availableBalance: 847532.45,
    status: 'active',
    openedDate: '2020-01-15',
    interestRate: 0.01,
    minimumBalance: 500,
    monthlyFee: 0,
    currency: 'USD',
    isDefault: true
  },
  {
    id: '2',
    accountType: 'savings',
    nickname: 'High-Yield Savings',
    accountNumber: '****7821',
    routingNumber: '021000021',
    balance: 524890.45,
    availableBalance: 524890.45,
    status: 'active',
    openedDate: '2020-02-20',
    interestRate: 4.5,
    minimumBalance: 1000,
    monthlyFee: 0,
    currency: 'USD',
    isDefault: false
  },
  {
    id: '3',
    accountType: 'credit',
    nickname: 'Platinum Credit Card',
    accountNumber: '****8945',
    balance: -3542.67,
    availableBalance: 21457.33,
    status: 'active',
    openedDate: '2020-06-10',
    interestRate: 15.99,
    monthlyFee: 0,
    currency: 'USD',
    isDefault: false
  },
  {
    id: '4',
    accountType: 'investment',
    nickname: 'Investment Portfolio',
    accountNumber: '****2156',
    balance: 1245890.67,
    availableBalance: 1245890.67,
    status: 'active',
    openedDate: '2020-08-01',
    monthlyFee: 0,
    currency: 'USD',
    isDefault: false
  },
  {
    id: '5',
    accountType: 'savings',
    nickname: 'Emergency Fund',
    accountNumber: '****9634',
    routingNumber: '021000021',
    balance: 156789.23,
    availableBalance: 156789.23,
    status: 'active',
    openedDate: '2021-03-15',
    interestRate: 4.75,
    minimumBalance: 500,
    monthlyFee: 0,
    currency: 'USD',
    isDefault: false
  },
  {
    id: '6',
    accountType: 'loan',
    nickname: 'Home Mortgage',
    accountNumber: '****4721',
    balance: -285000.0,
    availableBalance: 0,
    status: 'active',
    openedDate: '2019-11-20',
    interestRate: 3.25,
    monthlyFee: 2450,
    currency: 'USD',
    isDefault: false
  }
]

// ============================================================================
// MOCK DATA - Statements
// ============================================================================

export const accountStatements: AccountStatement[] = [
  {
    id: '1',
    accountId: '1',
    statementDate: '2025-11-01',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    openingBalance: 812340.23,
    closingBalance: 847532.45,
    totalCredits: 85234.67,
    totalDebits: 50042.45,
    url: '/statements/2025-11-checking.pdf'
  },
  {
    id: '2',
    accountId: '1',
    statementDate: '2025-10-01',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    openingBalance: 798456.12,
    closingBalance: 812340.23,
    totalCredits: 72456.34,
    totalDebits: 58572.23,
    url: '/statements/2025-10-checking.pdf'
  },
  {
    id: '3',
    accountId: '2',
    statementDate: '2025-11-01',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    openingBalance: 520145.89,
    closingBalance: 524890.45,
    totalCredits: 15890.12,
    totalDebits: 11145.56,
    url: '/statements/2025-11-savings.pdf'
  }
]

// ============================================================================
// MOCK DATA - Tax Documents
// ============================================================================

export const taxDocuments: TaxDocument[] = [
  {
    id: '1',
    documentType: '1099',
    taxYear: 2024,
    accountId: '2',
    amount: 23456.78,
    issuedDate: '2025-01-31',
    url: '/tax-docs/2024-1099-savings.pdf'
  },
  {
    id: '2',
    documentType: '1099',
    taxYear: 2024,
    accountId: '4',
    amount: 87654.32,
    issuedDate: '2025-01-31',
    url: '/tax-docs/2024-1099-investment.pdf'
  },
  {
    id: '3',
    documentType: '1098',
    taxYear: 2024,
    accountId: '6',
    amount: 9267.45,
    issuedDate: '2025-01-31',
    url: '/tax-docs/2024-1098-mortgage.pdf'
  }
]

// ============================================================================
// MOCK DATA - Balance History (for charts)
// ============================================================================

export interface BalanceHistory {
  month: string
  checking: number
  savings: number
  investment: number
  total: number
}

export const balanceHistory: BalanceHistory[] = [
  {
    month: 'May',
    checking: 725000,
    savings: 485000,
    investment: 1050000,
    total: 2260000
  },
  {
    month: 'Jun',
    checking: 742000,
    savings: 495000,
    investment: 1120000,
    total: 2357000
  },
  {
    month: 'Jul',
    checking: 768000,
    savings: 502000,
    investment: 1145000,
    total: 2415000
  },
  {
    month: 'Aug',
    checking: 785000,
    savings: 510000,
    investment: 1178000,
    total: 2473000
  },
  {
    month: 'Sep',
    checking: 812000,
    savings: 518000,
    investment: 1215000,
    total: 2545000
  },
  {
    month: 'Oct',
    checking: 832000,
    savings: 522000,
    investment: 1234000,
    total: 2588000
  },
  {
    month: 'Nov',
    checking: 847532,
    savings: 524890,
    investment: 1245890,
    total: 2618312
  }
]

// ============================================================================
// MOCK DATA - Spending by Category (for donut chart)
// ============================================================================

export interface SpendingCategory {
  category: string
  amount: number
  percentage: number
  color: string
}

export const spendingByCategory: SpendingCategory[] = [
  { category: 'Investment', amount: 32500, percentage: 35, color: 'hsl(var(--chart-1))' },
  { category: 'Housing', amount: 24500, percentage: 26, color: 'hsl(var(--chart-2))' },
  { category: 'Food & Dining', amount: 12450, percentage: 13, color: 'hsl(var(--chart-3))' },
  { category: 'Transportation', amount: 8900, percentage: 10, color: 'hsl(var(--chart-4))' },
  { category: 'Utilities', amount: 5650, percentage: 6, color: 'hsl(var(--chart-5))' },
  { category: 'Healthcare', amount: 4200, percentage: 5, color: 'hsl(var(--primary))' },
  { category: 'Entertainment', amount: 2850, percentage: 3, color: 'hsl(var(--muted))' },
  { category: 'Others', amount: 1950, percentage: 2, color: 'hsl(var(--secondary))' }
]
