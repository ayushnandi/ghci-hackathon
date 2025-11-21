// ============================================================================
// Investment Portfolio - Mock Data
// ============================================================================

export interface InvestmentHolding {
  id: string
  symbol: string
  name: string
  type: 'stock' | 'etf' | 'mutual_fund' | 'bond' | 'crypto' | 'real_estate'
  shares: number
  currentPrice: number
  totalValue: number
  costBasis: number
  gainLoss: number
  gainLossPercentage: number
  dayChange: number
  dayChangePercentage: number
  sector: string
  logo?: string
}

export interface PortfolioMetrics {
  totalValue: number
  todayChange: number
  todayChangePercentage: number
  totalGainLoss: number
  totalGainLossPercentage: number
  ytdReturn: number
  oneYearReturn: number
  fiveYearReturn: number
  allTimeReturn: number
}

export interface AssetAllocation {
  assetType: string
  value: number
  percentage: number
  color: string
}

export interface PortfolioPerformance {
  date: string
  value: number
}

// ============================================================================
// MOCK DATA - Investment Holdings
// ============================================================================

export const investmentHoldings: InvestmentHolding[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    shares: 250,
    currentPrice: 178.52,
    totalValue: 44630.0,
    costBasis: 38750.0,
    gainLoss: 5880.0,
    gainLossPercentage: 15.18,
    dayChange: 892.5,
    dayChangePercentage: 2.04,
    sector: 'Technology',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    shares: 180,
    currentPrice: 405.63,
    totalValue: 73013.4,
    costBasis: 65340.0,
    gainLoss: 7673.4,
    gainLossPercentage: 11.74,
    dayChange: 1095.24,
    dayChangePercentage: 1.52,
    sector: 'Technology',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png'
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    shares: 350,
    currentPrice: 142.87,
    totalValue: 50004.5,
    costBasis: 47250.0,
    gainLoss: 2754.5,
    gainLossPercentage: 5.83,
    dayChange: -525.35,
    dayChangePercentage: -1.04,
    sector: 'Technology',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    shares: 120,
    currentPrice: 245.32,
    totalValue: 29438.4,
    costBasis: 32400.0,
    gainLoss: -2961.6,
    gainLossPercentage: -9.14,
    dayChange: 736.8,
    dayChangePercentage: 2.57,
    sector: 'Automotive',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png'
  },
  {
    id: '5',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    shares: 85,
    currentPrice: 498.12,
    totalValue: 42340.2,
    costBasis: 29750.0,
    gainLoss: 12590.2,
    gainLossPercentage: 42.32,
    dayChange: 1279.08,
    dayChangePercentage: 3.12,
    sector: 'Technology',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
  },
  {
    id: '6',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: 'etf',
    shares: 450,
    currentPrice: 452.67,
    totalValue: 203701.5,
    costBasis: 185625.0,
    gainLoss: 18076.5,
    gainLossPercentage: 9.74,
    dayChange: 1813.35,
    dayChangePercentage: 0.90,
    sector: 'Index Fund',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png'
  },
  {
    id: '7',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: 'etf',
    shares: 320,
    currentPrice: 267.45,
    totalValue: 85584.0,
    costBasis: 78720.0,
    gainLoss: 6864.0,
    gainLossPercentage: 8.72,
    dayChange: 855.84,
    dayChangePercentage: 1.01,
    sector: 'Index Fund',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png'
  },
  {
    id: '8',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    shares: 1.234,
    currentPrice: 64258.45,
    totalValue: 79295.93,
    costBasis: 72450.0,
    gainLoss: 6845.93,
    gainLossPercentage: 9.45,
    dayChange: -1585.92,
    dayChangePercentage: -1.96,
    sector: 'Cryptocurrency',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png'
  },
  {
    id: '9',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    shares: 15.67,
    currentPrice: 3245.89,
    totalValue: 50862.79,
    costBasis: 48900.0,
    gainLoss: 1962.79,
    gainLossPercentage: 4.01,
    dayChange: -1017.26,
    dayChangePercentage: -1.96,
    sector: 'Cryptocurrency',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png'
  },
  {
    id: '10',
    symbol: 'FXAIX',
    name: 'Fidelity 500 Index Fund',
    type: 'mutual_fund',
    shares: 2850,
    currentPrice: 178.92,
    totalValue: 509922.0,
    costBasis: 475000.0,
    gainLoss: 34922.0,
    gainLossPercentage: 7.35,
    dayChange: 5099.22,
    dayChangePercentage: 1.01,
    sector: 'Index Fund',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png'
  },
  {
    id: '11',
    symbol: 'AGG',
    name: 'iShares Core US Aggregate Bond ETF',
    type: 'bond',
    shares: 580,
    currentPrice: 98.45,
    totalValue: 57101.0,
    costBasis: 58000.0,
    gainLoss: -899.0,
    gainLossPercentage: -1.55,
    dayChange: 114.22,
    dayChangePercentage: 0.20,
    sector: 'Fixed Income',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png'
  },
  {
    id: '12',
    symbol: 'VNQ',
    name: 'Vanguard Real Estate ETF',
    type: 'real_estate',
    shares: 420,
    currentPrice: 89.67,
    totalValue: 37661.4,
    costBasis: 39900.0,
    gainLoss: -2238.6,
    gainLossPercentage: -5.61,
    dayChange: 376.61,
    dayChangePercentage: 1.01,
    sector: 'Real Estate',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png'
  }
]

// ============================================================================
// MOCK DATA - Portfolio Metrics
// ============================================================================

export const portfolioMetrics: PortfolioMetrics = {
  totalValue: 1245890.67,
  todayChange: 11234.56,
  todayChangePercentage: 0.91,
  totalGainLoss: 227890.45,
  totalGainLossPercentage: 18.3,
  ytdReturn: 14.5,
  oneYearReturn: 21.3,
  fiveYearReturn: 87.6,
  allTimeReturn: 127.4
}

// ============================================================================
// MOCK DATA - Asset Allocation
// ============================================================================

export const assetAllocation: AssetAllocation[] = [
  {
    assetType: 'Stocks',
    value: 612000.0,
    percentage: 49.1,
    color: 'hsl(var(--chart-1))'
  },
  {
    assetType: 'ETFs',
    value: 376887.4,
    percentage: 30.2,
    color: 'hsl(var(--chart-2))'
  },
  {
    assetType: 'Crypto',
    value: 130158.72,
    percentage: 10.4,
    color: 'hsl(var(--chart-3))'
  },
  {
    assetType: 'Bonds',
    value: 57101.0,
    percentage: 4.6,
    color: 'hsl(var(--chart-4))'
  },
  {
    assetType: 'Real Estate',
    value: 37661.4,
    percentage: 3.0,
    color: 'hsl(var(--chart-5))'
  },
  {
    assetType: 'Cash',
    value: 32082.15,
    percentage: 2.7,
    color: 'hsl(var(--muted))'
  }
]

// ============================================================================
// MOCK DATA - Portfolio Performance (1 year)
// ============================================================================

export const portfolioPerformance: PortfolioPerformance[] = [
  { date: '2024-11', value: 1025000 },
  { date: '2024-12', value: 1042000 },
  { date: '2025-01', value: 1068000 },
  { date: '2025-02', value: 1055000 },
  { date: '2025-03', value: 1089000 },
  { date: '2025-04', value: 1124000 },
  { date: '2025-05', value: 1145000 },
  { date: '2025-06', value: 1167000 },
  { date: '2025-07', value: 1192000 },
  { date: '2025-08', value: 1178000 },
  { date: '2025-09', value: 1215000 },
  { date: '2025-10', value: 1234000 },
  { date: '2025-11', value: 1245890.67 }
]

// ============================================================================
// MOCK DATA - Sector Performance
// ============================================================================

export interface SectorPerformance {
  sector: string
  value: number
  gainLoss: number
  percentage: number
}

export const sectorPerformance: SectorPerformance[] = [
  { sector: 'Technology', value: 239426.5, gainLoss: 27937.1, percentage: 13.23 },
  { sector: 'Index Fund', value: 799207.5, gainLoss: 59862.5, percentage: 8.09 },
  { sector: 'Cryptocurrency', value: 130158.72, gainLoss: 8808.72, percentage: 7.26 },
  { sector: 'Fixed Income', value: 57101.0, gainLoss: -899.0, percentage: -1.55 },
  { sector: 'Real Estate', value: 37661.4, gainLoss: -2238.6, percentage: -5.61 },
  { sector: 'Automotive', value: 29438.4, gainLoss: -2961.6, percentage: -9.14 }
]
