// ============================================================================
// Deposit Services - Mock Data
// ============================================================================

export interface Deposit {
  id: string
  type: 'direct_deposit' | 'mobile_check' | 'wire' | 'ach' | 'cash'
  amount: number
  source: string
  accountNumber: string
  date: string
  expectedClearingDate?: string
  actualClearingDate?: string
  status: 'processing' | 'pending' | 'cleared' | 'failed' | 'held'
  confirmationNumber: string
  memo?: string
  checkNumber?: string
  checkImageFront?: string
  checkImageBack?: string
}

export interface DepositLimit {
  limitType: 'daily' | 'monthly'
  depositType: 'mobile_check' | 'ach' | 'all'
  limit: number
  used: number
  remaining: number
  resetDate: string
}

export interface DepositTrend {
  month: string
  directDeposit: number
  mobileCheck: number
  wire: number
  ach: number
  total: number
}

// ============================================================================
// MOCK DATA - Deposit History
// ============================================================================

export const depositHistory: Deposit[] = [
  {
    id: '1',
    type: 'direct_deposit',
    amount: 8500.0,
    source: 'Acme Corporation',
    accountNumber: '****4532',
    date: '2025-11-20T09:00:00',
    expectedClearingDate: '2025-11-20',
    actualClearingDate: '2025-11-20',
    status: 'cleared',
    confirmationNumber: 'DD20251120001',
    memo: 'November salary'
  },
  {
    id: '2',
    type: 'mobile_check',
    amount: 1250.0,
    source: 'John Smith',
    accountNumber: '****4532',
    date: '2025-11-18T14:35:00',
    expectedClearingDate: '2025-11-21',
    status: 'processing',
    confirmationNumber: 'MC20251118002',
    memo: 'Freelance payment',
    checkNumber: '1045',
    checkImageFront: '/checks/front-1045.jpg',
    checkImageBack: '/checks/back-1045.jpg'
  },
  {
    id: '3',
    type: 'wire',
    amount: 25000.0,
    source: 'Real Estate Investment LLC',
    accountNumber: '****4532',
    date: '2025-11-15T11:20:00',
    expectedClearingDate: '2025-11-15',
    actualClearingDate: '2025-11-15',
    status: 'cleared',
    confirmationNumber: 'WR20251115003',
    memo: 'Property sale proceeds'
  },
  {
    id: '4',
    type: 'ach',
    amount: 3500.0,
    source: 'ABC Consulting',
    accountNumber: '****4532',
    date: '2025-11-12T10:00:00',
    expectedClearingDate: '2025-11-14',
    actualClearingDate: '2025-11-14',
    status: 'cleared',
    confirmationNumber: 'ACH20251112004',
    memo: 'Contract payment'
  },
  {
    id: '5',
    type: 'mobile_check',
    amount: 450.0,
    source: 'Birthday Gift - Mom',
    accountNumber: '****4532',
    date: '2025-11-10T16:45:00',
    expectedClearingDate: '2025-11-13',
    actualClearingDate: '2025-11-12',
    status: 'cleared',
    confirmationNumber: 'MC20251110005',
    memo: 'Birthday check',
    checkNumber: '2187',
    checkImageFront: '/checks/front-2187.jpg',
    checkImageBack: '/checks/back-2187.jpg'
  },
  {
    id: '6',
    type: 'direct_deposit',
    amount: 1200.0,
    source: 'Freelance Client - Tech Co',
    accountNumber: '****4532',
    date: '2025-11-08T09:00:00',
    expectedClearingDate: '2025-11-08',
    actualClearingDate: '2025-11-08',
    status: 'cleared',
    confirmationNumber: 'DD20251108006',
    memo: 'Project milestone payment'
  },
  {
    id: '7',
    type: 'ach',
    amount: 750.0,
    source: 'Insurance Refund',
    accountNumber: '****4532',
    date: '2025-11-05T13:30:00',
    expectedClearingDate: '2025-11-07',
    actualClearingDate: '2025-11-07',
    status: 'cleared',
    confirmationNumber: 'ACH20251105007',
    memo: 'Insurance overpayment refund'
  },
  {
    id: '8',
    type: 'mobile_check',
    amount: 2250.0,
    source: 'Tax Refund',
    accountNumber: '****4532',
    date: '2025-11-03T10:15:00',
    expectedClearingDate: '2025-11-06',
    actualClearingDate: '2025-11-06',
    status: 'cleared',
    confirmationNumber: 'MC20251103008',
    memo: 'State tax refund',
    checkNumber: '9987',
    checkImageFront: '/checks/front-9987.jpg',
    checkImageBack: '/checks/back-9987.jpg'
  },
  {
    id: '9',
    type: 'wire',
    amount: 50000.0,
    source: 'Investment Returns',
    accountNumber: '****4532',
    date: '2025-10-28T14:00:00',
    expectedClearingDate: '2025-10-28',
    actualClearingDate: '2025-10-28',
    status: 'cleared',
    confirmationNumber: 'WR20251028009',
    memo: 'Quarterly investment distribution'
  },
  {
    id: '10',
    type: 'direct_deposit',
    amount: 8500.0,
    source: 'Acme Corporation',
    accountNumber: '****4532',
    date: '2025-10-20T09:00:00',
    expectedClearingDate: '2025-10-20',
    actualClearingDate: '2025-10-20',
    status: 'cleared',
    confirmationNumber: 'DD20251020010',
    memo: 'October salary'
  },
  {
    id: '11',
    type: 'mobile_check',
    amount: 890.0,
    source: 'Reimbursement',
    accountNumber: '****4532',
    date: '2025-10-15T11:20:00',
    expectedClearingDate: '2025-10-18',
    status: 'held',
    confirmationNumber: 'MC20251015011',
    memo: 'Travel expense reimbursement - Under review',
    checkNumber: '5432',
    checkImageFront: '/checks/front-5432.jpg',
    checkImageBack: '/checks/back-5432.jpg'
  },
  {
    id: '12',
    type: 'ach',
    amount: 325.0,
    source: 'Cashback Rewards',
    accountNumber: '****4532',
    date: '2025-10-12T10:00:00',
    expectedClearingDate: '2025-10-12',
    actualClearingDate: '2025-10-12',
    status: 'cleared',
    confirmationNumber: 'ACH20251012012',
    memo: 'Credit card cashback'
  },
  {
    id: '13',
    type: 'mobile_check',
    amount: 150.0,
    source: 'Security Deposit Return',
    accountNumber: '****4532',
    date: '2025-10-08T15:45:00',
    expectedClearingDate: '2025-10-08',
    status: 'failed',
    confirmationNumber: 'MC20251008013',
    memo: 'Apartment security deposit - Check signature mismatch',
    checkNumber: '7890'
  }
]

// ============================================================================
// MOCK DATA - Pending Deposits
// ============================================================================

export const pendingDeposits: Deposit[] = depositHistory.filter(
  (d) => d.status === 'processing' || d.status === 'pending' || d.status === 'held'
)

// ============================================================================
// MOCK DATA - Deposit Limits
// ============================================================================

export const depositLimits: DepositLimit[] = [
  {
    limitType: 'daily',
    depositType: 'mobile_check',
    limit: 5000.0,
    used: 1250.0,
    remaining: 3750.0,
    resetDate: '2025-11-22'
  },
  {
    limitType: 'monthly',
    depositType: 'mobile_check',
    limit: 25000.0,
    used: 5890.0,
    remaining: 19110.0,
    resetDate: '2025-12-01'
  },
  {
    limitType: 'daily',
    depositType: 'ach',
    limit: 50000.0,
    used: 3500.0,
    remaining: 46500.0,
    resetDate: '2025-11-22'
  },
  {
    limitType: 'monthly',
    depositType: 'ach',
    limit: 250000.0,
    used: 87850.0,
    remaining: 162150.0,
    resetDate: '2025-12-01'
  },
  {
    limitType: 'daily',
    depositType: 'all',
    limit: 100000.0,
    used: 29750.0,
    remaining: 70250.0,
    resetDate: '2025-11-22'
  }
]

// ============================================================================
// MOCK DATA - Deposit Trends (for chart)
// ============================================================================

export const depositTrends: DepositTrend[] = [
  {
    month: 'May',
    directDeposit: 8500,
    mobileCheck: 2450,
    wire: 15000,
    ach: 3200,
    total: 29150
  },
  {
    month: 'Jun',
    directDeposit: 8500,
    mobileCheck: 1890,
    wire: 0,
    ach: 2800,
    total: 13190
  },
  {
    month: 'Jul',
    directDeposit: 8500,
    mobileCheck: 3200,
    wire: 25000,
    ach: 4100,
    total: 40800
  },
  {
    month: 'Aug',
    directDeposit: 8500,
    mobileCheck: 2750,
    wire: 10000,
    ach: 3600,
    total: 24850
  },
  {
    month: 'Sep',
    directDeposit: 8500,
    mobileCheck: 1950,
    wire: 0,
    ach: 3100,
    total: 13550
  },
  {
    month: 'Oct',
    directDeposit: 8500,
    mobileCheck: 3890,
    wire: 50000,
    ach: 3575,
    total: 65965
  },
  {
    month: 'Nov',
    directDeposit: 9700,
    mobileCheck: 1700,
    wire: 25000,
    ach: 4250,
    total: 40650
  }
]

// ============================================================================
// MOCK DATA - Deposit Status Summary
// ============================================================================

export interface DepositStatusSummary {
  total: number
  cleared: number
  processing: number
  pending: number
  held: number
  failed: number
}

export const depositStatusSummary: DepositStatusSummary = {
  total: depositHistory.length,
  cleared: depositHistory.filter((d) => d.status === 'cleared').length,
  processing: depositHistory.filter((d) => d.status === 'processing').length,
  pending: depositHistory.filter((d) => d.status === 'pending').length,
  held: depositHistory.filter((d) => d.status === 'held').length,
  failed: depositHistory.filter((d) => d.status === 'failed').length
}
