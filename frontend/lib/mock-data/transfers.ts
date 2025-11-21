// ============================================================================
// Net Banking & Transfers - Mock Data
// ============================================================================

export interface Beneficiary {
  id: string
  nickname: string
  accountHolderName: string
  accountNumber: string
  bankName: string
  routingNumber: string
  accountType: 'checking' | 'savings'
  addedDate: string
  isVerified: boolean
  lastUsed?: string
  avatar?: string
}

export interface Transfer {
  id: string
  fromAccount: string
  fromAccountNumber: string
  toAccount: string
  toAccountNumber: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed' | 'cancelled' | 'processing'
  transferType: 'internal' | 'ach' | 'wire' | 'international'
  referenceNumber: string
  memo?: string
  fee: number
}

export interface ScheduledTransfer {
  id: string
  fromAccount: string
  fromAccountNumber: string
  toAccount: string
  toAccountNumber: string
  amount: number
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly'
  nextDate: string
  startDate: string
  endDate?: string
  status: 'active' | 'paused' | 'completed'
  memo?: string
}

export interface TransferVolume {
  month: string
  internal: number
  external: number
  total: number
}

// ============================================================================
// MOCK DATA - Beneficiaries
// ============================================================================

export const beneficiaries: Beneficiary[] = [
  {
    id: '1',
    nickname: 'Mom - Emergency',
    accountHolderName: 'Margaret Anderson',
    accountNumber: '****6543',
    bankName: 'Chase Bank',
    routingNumber: '021000021',
    accountType: 'checking',
    addedDate: '2023-05-15',
    isVerified: true,
    lastUsed: '2025-10-20',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
  },
  {
    id: '2',
    nickname: 'Investment Account',
    accountHolderName: 'Sarah Anderson',
    accountNumber: '****2156',
    bankName: 'BrosBank',
    routingNumber: '021000021',
    accountType: 'savings',
    addedDate: '2023-01-10',
    isVerified: true,
    lastUsed: '2025-11-15',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png'
  },
  {
    id: '3',
    nickname: 'Rent Payment',
    accountHolderName: 'Premium Properties LLC',
    accountNumber: '****8921',
    bankName: 'Wells Fargo',
    routingNumber: '121000248',
    accountType: 'checking',
    addedDate: '2023-03-01',
    isVerified: true,
    lastUsed: '2025-11-01',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'
  },
  {
    id: '4',
    nickname: 'Brother - John',
    accountHolderName: 'John Anderson',
    accountNumber: '****3421',
    bankName: 'Bank of America',
    routingNumber: '026009593',
    accountType: 'checking',
    addedDate: '2023-07-22',
    isVerified: true,
    lastUsed: '2025-09-12',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png'
  },
  {
    id: '5',
    nickname: 'Utility Company',
    accountHolderName: 'City Power & Light',
    accountNumber: '****7654',
    bankName: 'Citibank',
    routingNumber: '021000089',
    accountType: 'checking',
    addedDate: '2023-02-14',
    isVerified: true,
    lastUsed: '2025-11-18',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
  },
  {
    id: '6',
    nickname: 'Gym Membership',
    accountHolderName: 'FitLife Gym',
    accountNumber: '****9087',
    bankName: 'US Bank',
    routingNumber: '091000022',
    accountType: 'checking',
    addedDate: '2024-01-05',
    isVerified: true,
    lastUsed: '2025-11-16',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png'
  }
]

// ============================================================================
// MOCK DATA - Transfer History
// ============================================================================

export const transferHistory: Transfer[] = [
  {
    id: '1',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Investment Account',
    toAccountNumber: '****2156',
    amount: 5000.0,
    date: '2025-11-20T10:30:00',
    status: 'completed',
    transferType: 'internal',
    referenceNumber: 'TRF20251120001',
    memo: 'Monthly investment transfer',
    fee: 0
  },
  {
    id: '2',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Mom - Emergency',
    toAccountNumber: '****6543',
    amount: 1500.0,
    date: '2025-11-18T14:20:00',
    status: 'completed',
    transferType: 'ach',
    referenceNumber: 'TRF20251118002',
    memo: 'Medical expenses',
    fee: 0
  },
  {
    id: '3',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Rent Payment',
    toAccountNumber: '****8921',
    amount: 2400.0,
    date: '2025-11-01T09:00:00',
    status: 'completed',
    transferType: 'ach',
    referenceNumber: 'TRF20251101003',
    memo: 'November rent',
    fee: 0
  },
  {
    id: '4',
    fromAccount: 'High-Yield Savings',
    fromAccountNumber: '****7821',
    toAccount: 'Primary Checking',
    toAccountNumber: '****4532',
    amount: 10000.0,
    date: '2025-10-25T11:15:00',
    status: 'completed',
    transferType: 'internal',
    referenceNumber: 'TRF20251025004',
    memo: 'Emergency fund withdrawal',
    fee: 0
  },
  {
    id: '5',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Brother - John',
    toAccountNumber: '****3421',
    amount: 500.0,
    date: '2025-10-15T16:45:00',
    status: 'completed',
    transferType: 'ach',
    referenceNumber: 'TRF20251015005',
    memo: 'Birthday gift',
    fee: 0
  },
  {
    id: '6',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Emergency Fund',
    toAccountNumber: '****9634',
    amount: 3000.0,
    date: '2025-10-10T12:00:00',
    status: 'completed',
    transferType: 'internal',
    referenceNumber: 'TRF20251010006',
    memo: 'Monthly savings',
    fee: 0
  },
  {
    id: '7',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'International Transfer',
    toAccountNumber: 'GB29****1234',
    amount: 2500.0,
    date: '2025-10-05T10:30:00',
    status: 'completed',
    transferType: 'international',
    referenceNumber: 'TRF20251005007',
    memo: 'Family support',
    fee: 45.0
  },
  {
    id: '8',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Utility Company',
    toAccountNumber: '****7654',
    amount: 245.75,
    date: '2025-09-28T08:00:00',
    status: 'completed',
    transferType: 'ach',
    referenceNumber: 'TRF20250928008',
    memo: 'September electricity bill',
    fee: 0
  },
  {
    id: '9',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Wire Transfer - Business',
    toAccountNumber: '****4567',
    amount: 15000.0,
    date: '2025-09-20T13:45:00',
    status: 'completed',
    transferType: 'wire',
    referenceNumber: 'TRF20250920009',
    memo: 'Business investment',
    fee: 30.0
  },
  {
    id: '10',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Investment Account',
    toAccountNumber: '****2156',
    amount: 5000.0,
    date: '2025-09-15T10:30:00',
    status: 'completed',
    transferType: 'internal',
    referenceNumber: 'TRF20250915010',
    memo: 'Monthly investment transfer',
    fee: 0
  },
  {
    id: '11',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Emergency Transfer',
    toAccountNumber: '****8765',
    amount: 1200.0,
    date: '2025-11-21T15:20:00',
    status: 'pending',
    transferType: 'ach',
    referenceNumber: 'TRF20251121011',
    memo: 'Urgent payment',
    fee: 0
  },
  {
    id: '12',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Failed Transfer Test',
    toAccountNumber: '****9999',
    amount: 500.0,
    date: '2025-11-19T12:00:00',
    status: 'failed',
    transferType: 'ach',
    referenceNumber: 'TRF20251119012',
    memo: 'Failed due to insufficient funds at destination',
    fee: 0
  }
]

// ============================================================================
// MOCK DATA - Scheduled Transfers
// ============================================================================

export const scheduledTransfers: ScheduledTransfer[] = [
  {
    id: '1',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Investment Account',
    toAccountNumber: '****2156',
    amount: 5000.0,
    frequency: 'monthly',
    nextDate: '2025-12-15',
    startDate: '2024-01-15',
    status: 'active',
    memo: 'Monthly investment transfer'
  },
  {
    id: '2',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Emergency Fund',
    toAccountNumber: '****9634',
    amount: 3000.0,
    frequency: 'monthly',
    nextDate: '2025-12-10',
    startDate: '2024-03-10',
    status: 'active',
    memo: 'Monthly emergency fund contribution'
  },
  {
    id: '3',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Rent Payment',
    toAccountNumber: '****8921',
    amount: 2400.0,
    frequency: 'monthly',
    nextDate: '2025-12-01',
    startDate: '2023-01-01',
    status: 'active',
    memo: 'Monthly rent payment'
  },
  {
    id: '4',
    fromAccount: 'Primary Checking',
    fromAccountNumber: '****4532',
    toAccount: 'Utility Company',
    toAccountNumber: '****7654',
    amount: 250.0,
    frequency: 'monthly',
    nextDate: '2025-12-05',
    startDate: '2023-06-05',
    status: 'active',
    memo: 'Monthly utility bill'
  },
  {
    id: '5',
    fromAccount: 'High-Yield Savings',
    fromAccountNumber: '****7821',
    toAccount: 'Primary Checking',
    toAccountNumber: '****4532',
    amount: 1000.0,
    frequency: 'weekly',
    nextDate: '2025-11-28',
    startDate: '2025-09-01',
    status: 'paused',
    memo: 'Weekly spending money'
  }
]

// ============================================================================
// MOCK DATA - Transfer Volume (for chart)
// ============================================================================

export const transferVolume: TransferVolume[] = [
  { month: 'May', internal: 15000, external: 8500, total: 23500 },
  { month: 'Jun', internal: 18000, external: 12000, total: 30000 },
  { month: 'Jul', internal: 16500, external: 9800, total: 26300 },
  { month: 'Aug', internal: 20000, external: 15000, total: 35000 },
  { month: 'Sep', internal: 22000, external: 18000, total: 40000 },
  { month: 'Oct', internal: 25000, external: 16500, total: 41500 },
  { month: 'Nov', internal: 28000, external: 14200, total: 42200 }
]
