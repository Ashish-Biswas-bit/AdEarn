'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { 
  DollarSign, 
  Wallet, 
  CreditCard,
  Landmark,
  AlertCircle,
  CheckCircle,
  Clock,
  History,
  ArrowRight,
  Crown
} from 'lucide-react'
import toast from 'react-hot-toast'

interface WithdrawalMethod {
  id: string
  name: string
  icon: typeof DollarSign
  processingTime: string
  minAmount: number
  fee: number
}

interface Transaction {
  id: string
  amount: number
  method: string
  status: 'pending' | 'completed' | 'failed'
  date: string
  reference: string
}

export default function WithdrawPage() {
  const { user, updateBalance } = useAuth()
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const methods: WithdrawalMethod[] = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: DollarSign,
      processingTime: 'Instant - 2 hours',
      minAmount: user?.isPremium ? 550 : 1100,
      fee: 0,
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: DollarSign,
      processingTime: 'Instant - 2 hours',
      minAmount: user?.isPremium ? 550 : 1100,
      fee: 0,
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Landmark,
      processingTime: '1-3 business days',
      minAmount: user?.isPremium ? 550 : 1100,
      fee: 0,
    },
    {
      id: 'rocket',
      name: 'Rocket (DBBL)',
      icon: CreditCard,
      processingTime: 'Instant - 2 hours',
      minAmount: user?.isPremium ? 550 : 1100,
      fee: 0,
    },
  ]

  const [transactions] = useState<Transaction[]>([
    { id: '1', amount: 5500, method: 'bKash', status: 'completed', date: '2024-01-15', reference: 'WD-001' },
    { id: '2', amount: 2750, method: 'bKash', status: 'completed', date: '2024-01-10', reference: 'WD-002' },
    { id: '3', amount: 8250, method: 'Bank Transfer', status: 'pending', date: '2024-01-20', reference: 'WD-003' },
  ])

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount)
    const method = methods.find(m => m.id === selectedMethod)
    
    if (!method) {
      toast.error('Please select a withdrawal method')
      return
    }

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (withdrawAmount < method.minAmount) {
      toast.error(`Minimum withdrawal is $${method.minAmount}`)
      return
    }

    if (withdrawAmount > (user?.balance || 0)) {
      toast.error('Insufficient balance')
      return
    }

    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    updateBalance(-withdrawAmount)
    toast.success(`Withdrawal request for ৳${withdrawAmount.toFixed(0)} submitted!`)
    
    setAmount('')
    setSelectedMethod(null)
    setIsProcessing(false)
  }

  if (!user) return null

  const minWithdrawal = user.isPremium ? 550 : 1100
  const canWithdraw = user.balance >= minWithdrawal

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Withdraw Earnings</h1>
          <p className="text-gray-600 mt-1">
            Withdraw your earnings to your preferred payment method
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Withdrawal Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100 mb-1">Available Balance</p>
                  <p className="text-4xl font-bold">৳{user.balance.toFixed(0)}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <Wallet className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-primary-100 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                {user.isPremium 
                  ? 'Premium: Instant withdrawals available' 
                  : 'Free: Withdrawals processed in 24-48 hours'}
              </div>
            </div>

            {/* Withdrawal Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Request Withdrawal
              </h2>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Withdraw
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min. ৳${minWithdrawal}`}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-500">
                    Minimum: ৳{minWithdrawal}
                  </span>
                  <button
                    onClick={() => setAmount(user.balance.toString())}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Withdraw All
                  </button>
                </div>
              </div>

              {/* Withdrawal Methods */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="space-y-3">
                  {methods.map((method) => {
                    const Icon = method.icon
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                          selectedMethod === method.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          selectedMethod === method.id ? 'bg-primary-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            selectedMethod === method.id ? 'text-primary-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="ml-4 text-left flex-1">
                          <p className="font-semibold text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            Min: ৳{method.minAmount} • {method.processingTime}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle className="h-6 w-6 text-primary-600" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Summary */}
              {amount && selectedMethod && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Withdrawal Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">৳{parseFloat(amount).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total Receive</span>
                      <span className="font-bold text-lg text-gray-900">
                        ৳{parseFloat(amount).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleWithdraw}
                disabled={!canWithdraw || !amount || !selectedMethod || isProcessing}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  'Processing...'
                ) : !canWithdraw ? (
                  `Need ৳${minWithdrawal} Minimum`
                ) : (
                  'Request Withdrawal'
                )}
              </button>

              {!canWithdraw && (
                <div className="mt-4 flex items-center text-amber-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  You need ৳{(minWithdrawal - user.balance).toFixed(0)} more to withdraw
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Withdrawal Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Withdrawal Info</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Processing Time</p>
                    <p className="text-sm text-gray-600">
                      {user.isPremium 
                        ? 'Instant to 24 hours' 
                        : '24-48 hours'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Minimum Amount</p>
                    <p className="text-sm text-gray-600">৳{minWithdrawal}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Withdrawal Fee</p>
                    <p className="text-sm text-gray-600">Free for all methods</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Promo */}
            {!user.isPremium && (
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 text-white">
                <Crown className="h-8 w-8 mb-4" />
                <h3 className="font-semibold mb-2">Lower Minimum with Premium</h3>
                <p className="text-gold-100 text-sm mb-4">
                  Upgrade to Premium and withdraw with just ৳550 minimum!
                </p>
                <button className="w-full bg-white text-gold-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Upgrade Now
                </button>
              </div>
            )}

            {/* Transaction History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <History className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">Transaction History</span>
              </div>
              <ArrowRight className={`h-5 w-5 text-gray-400 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Transaction History */}
        {showHistory && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Transactions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reference</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4 font-medium text-gray-900">{tx.reference}</td>
                      <td className="py-3 px-4 text-gray-600">{tx.date}</td>
                      <td className="py-3 px-4 text-gray-600">{tx.method}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">৳{tx.amount.toFixed(0)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
