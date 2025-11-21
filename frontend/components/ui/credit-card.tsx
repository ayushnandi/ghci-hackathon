'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CreditCardValue {
  cardholderName: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cvvLabel: 'CVC' | 'CVV'
}

interface CreditCardProps {
  value: CreditCardValue
  onChange: (value: CreditCardValue) => void
  className?: string
}

export function CreditCard({ value, onChange, className }: CreditCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'>('unknown')

  // Detect card type based on card number
  useEffect(() => {
    const num = value.cardNumber.replace(/\s/g, '')
    if (num.startsWith('4')) setCardType('visa')
    else if (num.startsWith('5')) setCardType('mastercard')
    else if (num.startsWith('3')) setCardType('amex')
    else if (num.startsWith('6')) setCardType('discover')
    else setCardType('unknown')
  }, [value.cardNumber])

  const formatCardNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '')
    const limited = cleaned.slice(0, 16)
    const formatted = limited.replace(/(\d{4})/g, '$1 ').trim()
    return formatted
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    onChange({ ...value, cardNumber: formatted })
  }

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 2)
    const limited = cleaned ? Math.min(parseInt(cleaned), 12).toString().padStart(cleaned.length, '0') : ''
    onChange({ ...value, expiryMonth: limited })
  }

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 2)
    onChange({ ...value, expiryYear: cleaned })
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, cardType === 'amex' ? 4 : 3)
    onChange({ ...value, cvv: cleaned })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, cardholderName: e.target.value.toUpperCase() })
  }

  const getCardBrandGradient = () => {
    switch (cardType) {
      case 'visa':
        return 'from-blue-500 to-blue-700'
      case 'mastercard':
        return 'from-red-500 to-orange-600'
      case 'amex':
        return 'from-green-500 to-teal-600'
      case 'discover':
        return 'from-orange-500 to-amber-600'
      default:
        return 'from-gray-700 to-gray-900'
    }
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Card Preview */}
      <div className='relative mx-auto w-full max-w-md'>
        <div
          className={cn(
            'relative h-56 w-full transition-transform duration-700',
            isFlipped && '[transform:rotateY(180deg)] [transform-style:preserve-3d]'
          )}
        >
          {/* Front of Card */}
          <Card
            className={cn(
              'absolute inset-0 flex flex-col justify-between p-6 text-white shadow-2xl [backface-visibility:hidden]',
              'bg-gradient-to-br',
              getCardBrandGradient()
            )}
          >
            {/* Card Brand Logo Area */}
            <div className='flex items-start justify-between'>
              <div className='size-12 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600' />
              <div className='text-xl font-bold uppercase'>{cardType !== 'unknown' ? cardType : 'Bank Card'}</div>
            </div>

            {/* Card Number */}
            <div className='font-mono text-2xl tracking-wider'>
              {value.cardNumber || '•••• •••• •••• ••••'}
            </div>

            {/* Card Details */}
            <div className='flex items-end justify-between'>
              <div>
                <div className='text-xs opacity-70'>Cardholder Name</div>
                <div className='text-sm font-semibold'>{value.cardholderName || 'YOUR NAME'}</div>
              </div>
              <div>
                <div className='text-xs opacity-70'>Expires</div>
                <div className='text-sm font-semibold'>
                  {value.expiryMonth || 'MM'}/{value.expiryYear || 'YY'}
                </div>
              </div>
            </div>
          </Card>

          {/* Back of Card */}
          <Card
            className={cn(
              'absolute inset-0 flex flex-col justify-between overflow-hidden bg-gradient-to-br text-white shadow-2xl',
              '[backface-visibility:hidden] [transform:rotateY(180deg)]',
              getCardBrandGradient()
            )}
          >
            {/* Magnetic Strip */}
            <div className='mt-6 h-12 w-full bg-black' />

            {/* CVV Section */}
            <div className='flex-1 px-6 py-4'>
              <div className='flex h-10 items-center justify-end rounded bg-white px-4'>
                <span className='font-mono text-lg text-black'>{value.cvv || '•••'}</span>
              </div>
              <div className='mt-2 text-right text-xs opacity-70'>{value.cvvLabel}</div>
            </div>

            {/* Bottom Section */}
            <div className='px-6 pb-6 text-xs opacity-70'>
              This card is property of the cardholder. Misuse is criminal offense.
            </div>
          </Card>
        </div>
      </div>

      {/* Input Fields */}
      <div className='space-y-4'>
        {/* Card Number */}
        <div>
          <Label htmlFor='cardNumber'>Card Number</Label>
          <Input
            id='cardNumber'
            type='text'
            placeholder='1234 5678 9012 3456'
            value={value.cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className='font-mono'
          />
        </div>

        {/* Cardholder Name */}
        <div>
          <Label htmlFor='cardholderName'>Cardholder Name</Label>
          <Input
            id='cardholderName'
            type='text'
            placeholder='JOHN DOE'
            value={value.cardholderName}
            onChange={handleNameChange}
            className='uppercase'
          />
        </div>

        {/* Expiry Date and CVV */}
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <Label htmlFor='expiryMonth'>Month</Label>
            <Input
              id='expiryMonth'
              type='text'
              placeholder='MM'
              value={value.expiryMonth}
              onChange={handleExpiryMonthChange}
              maxLength={2}
              className='font-mono'
            />
          </div>
          <div>
            <Label htmlFor='expiryYear'>Year</Label>
            <Input
              id='expiryYear'
              type='text'
              placeholder='YY'
              value={value.expiryYear}
              onChange={handleExpiryYearChange}
              maxLength={2}
              className='font-mono'
            />
          </div>
          <div>
            <Label htmlFor='cvv'>CVV</Label>
            <Input
              id='cvv'
              type='text'
              placeholder='123'
              value={value.cvv}
              onChange={handleCVVChange}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              maxLength={cardType === 'amex' ? 4 : 3}
              className='font-mono'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
