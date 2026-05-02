'use client'

import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { 
  DollarSign, 
  Users, 
  PlayCircle, 
  Gift, 
  Crown,
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please login to view your dashboard</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Current Balance',
      value: `৳${user.balance.toFixed(0)}`,
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      link: '/withdraw',
    },
    {
      name: 'Total Earned',
      value: `৳${user.totalEarned.toFixed(0)}`,
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
      link: null,
    },
    {
      name: 'Referrals',
      value: user.referrals.toString(),
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      link: '/referrals',
    },
    {
      name: 'Premium Status',
      value: user.isPremium ? 'Active' : 'Free',
      icon: Crown,
      color: user.isPremium ? 'bg-gold-50 text-gold-600' : 'bg-gray-50 text-gray-600',
      link: '/premium',
    },
  ]

  const quickActions = [
    {
      name: 'Watch Ads',
      description: 'Earn $0.10 - $0.50 per ad',
      icon: PlayCircle,
      href: '/ads',
      color: 'bg-blue-500',
    },
    {
      name: 'Complete Tasks',
      description: 'Like, follow & download apps',
      icon: Gift,
      href: '/tasks',
      color: 'bg-green-500',
    },
    {
      name: 'Refer Friends',
      description: `Earn 20% from referrals`,
      icon: Users,
      href: '/referrals',
      color: 'bg-purple-500',
    },
  ]

  const recentActivity = [
    { type: 'ad', description: 'Watched Video Ad', amount: 0.25, time: '2 min ago' },
    { type: 'task', description: 'Liked Facebook Page', amount: 0.50, time: '15 min ago' },
    { type: 'referral', description: 'Referral Bonus', amount: 2.00, time: '1 hour ago' },
    { type: 'ad', description: 'Watched Banner Ad', amount: 0.10, time: '2 hours ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s your earning summary for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.name}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                {stat.link && (
                  <Link
                    href={stat.link}
                    className="mt-4 flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    View details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{action.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </Link>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.type === 'ad' ? 'bg-blue-500' :
                        activity.type === 'task' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">
                      +${activity.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Premium Promo */}
            {!user.isPremium && (
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 text-white">
                <Crown className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
                <p className="text-gold-100 text-sm mb-4">
                  Earn 3x more with premium membership. Get instant withdrawals and exclusive offers.
                </p>
                <Link
                  href="/premium"
                  className="block w-full text-center bg-white text-gold-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            )}

            {/* Referral Promo */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Invite Friends</h3>
              <p className="text-purple-100 text-sm mb-4">
                Share your code <span className="font-bold bg-white/20 px-2 py-1 rounded">{user.referralCode}</span> and earn 20% commission!
              </p>
              <Link
                href="/referrals"
                className="block w-full text-center bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Share Now
              </Link>
            </div>

            {/* Daily Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Daily Goals</h3>
              <div className="space-y-3">
                {[
                  { label: 'Watch 10 ads', current: 7, target: 10 },
                  { label: 'Complete 3 tasks', current: 1, target: 3 },
                  { label: 'Invite 1 friend', current: 0, target: 1 },
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{goal.label}</span>
                      <span className="text-gray-900">{goal.current}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawal Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Withdrawal Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum withdrawal</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing time</span>
                  <span className="font-medium">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Methods</span>
                  <span className="font-medium">PayPal, Bank</span>
                </div>
              </div>
              {user.balance >= 10 && (
                <div className="mt-4 flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  You can withdraw now!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
