'use client'

import { useState } from 'react'
import {
  Settings2Icon,
  PaletteIcon,
  GlobeIcon,
  BellIcon,
  ShieldIcon,
  DownloadIcon,
  PlugIcon,
  CheckCircle2Icon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'

// Mock integration data
interface Integration {
  id: string
  name: string
  description: string
  category: 'financial' | 'productivity' | 'analytics' | 'communication'
  status: 'connected' | 'available'
  logo: string
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Mint',
    description: 'Budget tracking and financial planning',
    category: 'financial',
    status: 'available',
    logo: '🌿'
  },
  {
    id: '2',
    name: 'QuickBooks',
    description: 'Accounting and business management',
    category: 'financial',
    status: 'available',
    logo: '📊'
  },
  {
    id: '3',
    name: 'YNAB',
    description: 'You Need A Budget - Budget management',
    category: 'financial',
    status: 'available',
    logo: '💰'
  },
  {
    id: '4',
    name: 'Personal Capital',
    description: 'Wealth management and investment tracking',
    category: 'financial',
    status: 'available',
    logo: '💼'
  },
  {
    id: '5',
    name: 'Google Sheets',
    description: 'Export transaction data automatically',
    category: 'productivity',
    status: 'available',
    logo: '📑'
  },
  {
    id: '6',
    name: 'Slack',
    description: 'Get transaction alerts in Slack',
    category: 'communication',
    status: 'available',
    logo: '💬'
  }
]

export default function SettingsIntegrations() {
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('en')
  const [currency, setCurrency] = useState('USD')
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const [twoFactor, setTwoFactor] = useState(true)

  const connectedIntegrations = mockIntegrations.filter(i => i.status === 'connected').length
  const availableIntegrations = mockIntegrations.filter(i => i.status === 'available').length

  const statisticsCardData = [
    {
      icon: <Settings2Icon className='size-4' />,
      value: 'Customized',
      title: 'Settings Profile',
      changePercentage: 'Personalized'
    },
    {
      icon: <PlugIcon className='size-4' />,
      value: connectedIntegrations.toString(),
      title: 'Connected Apps',
      changePercentage: availableIntegrations + ' available'
    },
    {
      icon: <PaletteIcon className='size-4' />,
      value: theme.charAt(0).toUpperCase() + theme.slice(1),
      title: 'Theme',
      changePercentage: 'Current'
    },
    {
      icon: <GlobeIcon className='size-4' />,
      value: language.toUpperCase(),
      title: 'Language',
      changePercentage: 'Active'
    }
  ]

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

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Display Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <PaletteIcon className='size-5' />
                  Display Settings
                </CardTitle>
                <CardDescription>Customize your visual experience</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='theme'>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id='theme'>
                      <SelectValue placeholder='Select theme' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                      <SelectItem value='system'>System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='language'>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id='language'>
                      <SelectValue placeholder='Select language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Español</SelectItem>
                      <SelectItem value='fr'>Français</SelectItem>
                      <SelectItem value='de'>Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='currency'>Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id='currency'>
                      <SelectValue placeholder='Select currency' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USD'>USD ($)</SelectItem>
                      <SelectItem value='EUR'>EUR (€)</SelectItem>
                      <SelectItem value='GBP'>GBP (£)</SelectItem>
                      <SelectItem value='JPY'>JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShieldIcon className='size-5' />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your data and privacy</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <Label>Email Notifications</Label>
                    <p className='text-sm text-muted-foreground'>
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <Label>Marketing Communications</Label>
                    <p className='text-sm text-muted-foreground'>
                      Promotional offers and updates
                    </p>
                  </div>
                  <Switch
                    checked={marketing}
                    onCheckedChange={setMarketing}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <Label>Data Sharing</Label>
                    <p className='text-sm text-muted-foreground'>
                      Share anonymized data for improvements
                    </p>
                  </div>
                  <Switch
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <Label>Two-Factor Authentication</Label>
                    <p className='text-sm text-muted-foreground'>
                      Enhanced account security
                    </p>
                  </div>
                  <Switch
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <PlugIcon className='size-5' />
                Integrations
              </CardTitle>
              <CardDescription>Connect your favorite apps and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {mockIntegrations.map(integration => (
                  <div
                    key={integration.id}
                    className='rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <div className='text-3xl'>{integration.logo}</div>
                      {integration.status === 'connected' ? (
                        <CheckCircle2Icon className='size-5 text-green-600' />
                      ) : (
                        <Button variant='outline' size='sm'>
                          Connect
                        </Button>
                      )}
                    </div>
                    <h3 className='font-semibold mb-1'>{integration.name}</h3>
                    <p className='text-sm text-muted-foreground mb-3'>
                      {integration.description}
                    </p>
                    <span className='text-xs text-muted-foreground capitalize'>
                      {integration.category}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <DownloadIcon className='size-5' />
                Data Management
              </CardTitle>
              <CardDescription>Export and manage your data</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h3 className='font-semibold mb-2'>Export Data</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Download your account data in CSV or JSON format
                  </p>
                  <Button variant='outline' className='w-full'>
                    <DownloadIcon className='size-4 mr-2' />
                    Export Data
                  </Button>
                </div>

                <div className='rounded-lg border p-4'>
                  <h3 className='font-semibold mb-2'>Data Portability</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Transfer your data to another service
                  </p>
                  <Button variant='outline' className='w-full'>
                    <PlugIcon className='size-4 mr-2' />
                    Request Transfer
                  </Button>
                </div>

                <div className='rounded-lg border p-4'>
                  <h3 className='font-semibold mb-2'>API Access</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Generate API keys for custom integrations
                  </p>
                  <Button variant='outline' className='w-full'>
                    <Settings2Icon className='size-4 mr-2' />
                    Manage API
                  </Button>
                </div>

                <div className='rounded-lg border p-4 border-red-200'>
                  <h3 className='font-semibold mb-2 text-red-600'>Delete Account</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Permanently delete your account and data
                  </p>
                  <Button variant='outline' className='w-full border-red-300 text-red-600 hover:bg-red-50'>
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
