'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, CreditCardIcon, Trash2Icon, StarIcon } from 'lucide-react'
import { CreditCard as CreditCardForm, type CreditCardValue } from '@/components/ui/credit-card'
import { CreditCard as UntitledCreditCard } from '@/components/shared-assets/credit-card/credit-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface SavedCard {
  id: string
  cardholderName: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cardType: string
  isDefault: boolean
}

export default function CardManagement() {
  const [creditCard, setCreditCard] = useState<CreditCardValue>({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cvvLabel: 'CVC' as const
  })

  const [savedCards, setSavedCards] = useState<SavedCard[]>([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load saved cards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('savedCards')
    if (stored) {
      try {
        setSavedCards(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to load saved cards:', error)
        // Initialize with default cards if parsing fails
        setSavedCards([
          {
            id: '1',
            cardholderName: 'SARAH ANDERSON',
            cardNumber: '4532 •••• •••• 8945',
            expiryMonth: '12',
            expiryYear: '26',
            cardType: 'visa',
            isDefault: true
          },
          {
            id: '2',
            cardholderName: 'SARAH ANDERSON',
            cardNumber: '5412 •••• •••• 3456',
            expiryMonth: '08',
            expiryYear: '27',
            cardType: 'mastercard',
            isDefault: false
          }
        ])
      }
    } else {
      // Initialize with default cards on first load
      setSavedCards([
        {
          id: '1',
          cardholderName: 'SARAH ANDERSON',
          cardNumber: '4532 •••• •••• 8945',
          expiryMonth: '12',
          expiryYear: '26',
          cardType: 'visa',
          isDefault: true
        },
        {
          id: '2',
          cardholderName: 'SARAH ANDERSON',
          cardNumber: '5412 •••• •••• 3456',
          expiryMonth: '08',
          expiryYear: '27',
          cardType: 'mastercard',
          isDefault: false
        }
      ])
    }
  }, [])

  // Save to localStorage whenever savedCards changes
  useEffect(() => {
    if (savedCards.length > 0) {
      localStorage.setItem('savedCards', JSON.stringify(savedCards))
    }
  }, [savedCards])

  const handleSaveCard = () => {
    if (
      !creditCard.cardholderName ||
      !creditCard.cardNumber ||
      !creditCard.expiryMonth ||
      !creditCard.expiryYear ||
      !creditCard.cvv
    ) {
      alert('Please fill in all card details')
      return
    }

    // Clean and validate card number
    const cleanNumber = creditCard.cardNumber.replace(/\s/g, '')
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      alert('Invalid card number length. Card number must be between 13-19 digits.')
      return
    }

    // Validate expiry date
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1
    const expYear = parseInt(creditCard.expiryYear)
    const expMonth = parseInt(creditCard.expiryMonth)

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert('This card has expired. Please use a valid card.')
      return
    }

    // Check for duplicate cards
    const last4Digits = cleanNumber.slice(-4)
    const cardExists = savedCards.some(card => card.cardNumber.slice(-4) === last4Digits)
    if (cardExists) {
      alert('A card with these last 4 digits already exists.')
      return
    }

    // Mask the card number (show only first 4 and last 4 digits)
    const maskedNumber = cleanNumber.slice(0, 4) + ' •••• •••• ' + cleanNumber.slice(-4)

    // Detect card type
    const num = creditCard.cardNumber.replace(/\s/g, '')
    let cardType = 'unknown'
    if (num.startsWith('4')) cardType = 'visa'
    else if (num.startsWith('5')) cardType = 'mastercard'
    else if (num.startsWith('3')) cardType = 'amex'
    else if (num.startsWith('6')) cardType = 'discover'

    const newCard: SavedCard = {
      id: Date.now().toString(),
      cardholderName: creditCard.cardholderName,
      cardNumber: maskedNumber,
      expiryMonth: creditCard.expiryMonth,
      expiryYear: creditCard.expiryYear,
      cardType,
      isDefault: savedCards.length === 0
    }

    setSavedCards([...savedCards, newCard])

    // Reset form
    setCreditCard({
      cardholderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cvvLabel: 'CVC' as const
    })

    setIsDialogOpen(false)
    alert('Card added successfully!')
  }

  const handleDeleteCard = (id: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      const cardToDelete = savedCards.find(card => card.id === id)
      const remainingCards = savedCards.filter(card => card.id !== id)

      // If deleted card was default and there are remaining cards, set new default
      if (cardToDelete?.isDefault && remainingCards.length > 0) {
        remainingCards[0].isDefault = true
      }

      setSavedCards(remainingCards)
    }
  }

  const handleSetDefaultCard = (id: string) => {
    setSavedCards(
      savedCards.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    )
  }

  const getCardColorVariant = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'visa-purple' as const // Purple gradient (#53389d to #663fc0)
      case 'mastercard':
        return 'gradient-strip' as const // Colorful gradient
      case 'amex':
        return 'gray-dark' as const // Dark gray
      case 'discover':
        return 'salmon-strip' as const // Salmon/pink color
      default:
        return 'brand-light' as const // Light variant
    }
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='space-y-6'>
          {/* Header */}
          <div>
            <h1 className='text-3xl font-bold'>Card Management</h1>
            <p className='text-muted-foreground mt-2'>Manage your payment cards and preferences</p>
          </div>

          {/* Add New Card Section */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Card className='border-dashed cursor-pointer transition-colors hover:border-primary hover:bg-accent/50'>
                <CardContent className='flex flex-col items-center justify-center py-8'>
                  <div className='bg-primary/10 mb-4 flex size-16 items-center justify-center rounded-full'>
                    <PlusIcon className='size-8 text-primary' />
                  </div>
                  <CardTitle className='mb-2'>Add New Card</CardTitle>
                  <CardDescription className='text-center'>
                    Click to add a new payment card to your account
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>Add New Payment Card</DialogTitle>
                <DialogDescription>
                  Enter your card details below. All information is encrypted and stored securely.
                </DialogDescription>
              </DialogHeader>
              <div className='py-4'>
                <CreditCardForm value={creditCard} onChange={setCreditCard} />
              </div>
              <div className='flex justify-end gap-2'>
                <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveCard}>Save Card</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Saved Cards */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Your Cards</h2>
            {savedCards.length === 0 ? (
              <Card className='border-dashed'>
                <CardContent className='flex flex-col items-center justify-center py-12'>
                  <CreditCardIcon className='text-muted-foreground mb-4 size-12' />
                  <p className='text-muted-foreground text-center'>
                    No cards added yet. Add your first card to get started.
                  </p>
                  <Button className='mt-4' variant='outline' onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon className='mr-2 size-4' />
                    Add Your First Card
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {savedCards.map(card => (
                  <div key={card.id} className='space-y-3'>
                    <UntitledCreditCard
                      type={getCardColorVariant(card.cardType)}
                      company={card.cardType.toUpperCase()}
                      cardNumber={card.cardNumber}
                      cardHolder={card.cardholderName}
                      cardExpiration={`${card.expiryMonth}/${card.expiryYear}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
