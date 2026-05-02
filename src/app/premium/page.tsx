'use client'

import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { 
  Crown, 
  CheckCircle, 
  X,
  Zap,
  Star,
  Shield,
  Clock,
  TrendingUp,
  Gift,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PremiumPage() {
  const { user } = useAuth()

  const features = [
    {
      icon: TrendingUp,
      title: '3x Earnings Multiplier',
      description: 'Earn 3 times more from every ad, task, and referral',
    },
    {
      icon: Zap,
      title: 'Instant Withdrawals',
      description: 'Get your money within minutes instead of 24-48 hours',
    },
    {
      icon: Gift,
      title: 'Premium-Only Offers',
      description: 'Access high-paying exclusive tasks and offers',
    },
    {
      icon: Clock,
      title: 'Unlimited Daily Ads',
      description: 'Watch unlimited ads instead of the 50 daily limit',
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: 'Get dedicated customer support with faster response',
    },
    {
      icon: Star,
      title: 'Bonus Rewards',
      description: 'Extra bonuses on milestones and achievements',
    },
  ]

  const plans = [
    {
      name: 'Monthly',
      price: 9.99,
      period: 'month',
      popular: false,
      savings: null,
    },
    {
      name: 'Quarterly',
      price: 24.99,
      period: '3 months',
      popular: true,
      savings: '17%',
    },
    {
      name: 'Yearly',
      price: 79.99,
      period: 'year',
      popular: false,
      savings: '33%',
    },
  ]

  const handleSubscribe = (plan: typeof plans[0]) => {
    // In production, integrate with payment gateway
    toast.success(`Selected ${plan.name} plan. Payment integration needed!`)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
            <Crown className="h-8 w-8 text-gold-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upgrade to Premium
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of AdEarn with premium features. 
            Earn 3x more and get instant withdrawals!
          </p>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Your Current Plan</h2>
              <p className="text-gray-600">
                {user.isPremium ? (
                  <span className="text-gold-600 font-semibold flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    Premium Active
                  </span>
                ) : (
                  'Free Plan - Limited features'
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Daily Earnings Potential</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.isPremium ? '৳5,500+' : '৳1,650'}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Plan Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-medium text-gold-600 bg-gold-50">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Earnings Multiplier', free: '1x', premium: '3x' },
                  { feature: 'Daily Ads Limit', free: '50 ads', premium: 'Unlimited' },
                  { feature: 'Withdrawal Speed', free: '24-48 hours', premium: 'Instant' },
                  { feature: 'Minimum Withdrawal', free: '৳1,100', premium: '৳550' },
                  { feature: 'Premium Offers', free: false, premium: true },
                  { feature: 'Priority Support', free: false, premium: true },
                  { feature: 'Bonus Rewards', free: false, premium: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 px-6 text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-600">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-gold-50">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <CheckCircle className="h-5 w-5 text-gold-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-gold-700 font-semibold">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-xl scale-105'
                  : 'bg-white shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`ml-2 ${plan.popular ? 'text-gold-100' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>
                {plan.savings && (
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-gold-100' : 'text-green-600'}`}>
                    Save {plan.savings}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-3 ${plan.popular ? 'text-white' : 'text-gold-500'}`} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-600 text-sm'}>
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-white text-gold-600 hover:bg-gray-100'
                    : 'bg-gold-500 text-white hover:bg-gold-600'
                }`}
              >
                {user.isPremium ? 'Extend Plan' : 'Get Premium'}
              </button>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Premium Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="bg-gold-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            What Premium Members Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                role: 'Premium Member',
                text: 'Upgraded last month and my earnings tripled! The instant withdrawals are a game changer.',
                earnings: '৳137,500',
              },
              {
                name: 'John D.',
                role: 'Premium Member',
                text: 'Best investment ever. I earn ৳4,400-5,500 daily now. The premium offers alone pay for the subscription.',
                earnings: '৳97,900',
              },
              {
                name: 'Lisa K.',
                role: 'Premium Member',
                text: 'The unlimited ads feature is amazing. I can earn whenever I have free time. Highly recommend!',
                earnings: '৳231,000',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="text-gold-600 font-semibold">
                  Earned {testimonial.earnings} this month!
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Money-Back Guarantee</h4>
              <p className="text-sm text-blue-700">
                Try Premium risk-free for 7 days. If you don&apos;t earn at least double your 
                subscription cost, we&apos;ll refund you in full. No questions asked!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
