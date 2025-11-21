import { NextRequest, NextResponse } from 'next/server';

// Mock responses for testing when backend is not available
const MOCK_RESPONSES = [
  "Hello! I'm BroBankAI, your financial assistant. How can I help you manage your finances today?",
  "I can help you with account balances, transaction history, budget planning, and financial advice. What would you like to know?",
  "Based on your recent spending patterns, I notice you've been spending more on dining out. Would you like some tips on managing your food expenses?",
  "Your current account balance is healthy. Would you like me to help you set up a savings goal?",
  "I can analyze your transactions and provide insights. What specific area of your finances would you like to focus on?",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get backend URL from environment variable
    const backendURL = process.env.BROBANK_AGENT_API_URL;

    // If backend URL is configured, proxy the request
    if (backendURL) {
      try {
        const response = await fetch(`${backendURL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            conversationId,
          }),
        });

        if (!response.ok) {
          throw new Error('Backend request failed');
        }

        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Backend request error:', error);
        // Fall through to mock response
      }
    }

    // Mock response when backend is not available
    // Use a simple hash of the message to get consistent responses
    const hash = message.split('').reduce((acc: number, char: string) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const responseIndex = Math.abs(hash) % MOCK_RESPONSES.length;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    return NextResponse.json({
      response: MOCK_RESPONSES[responseIndex],
      conversationId: conversationId || `conv_${Date.now()}`,
      suggestions: [
        'Show my recent transactions',
        'What is my account balance?',
        'Help me create a budget',
      ],
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
