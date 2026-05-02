'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { 
  Users, 
  Copy, 
  Share2, 
  DollarSign, 
  Gift,
  TrendingUp,
  UserPlus,
  Link as LinkIcon,
  CheckCircle,
  Facebook,
  Twitter,
  MessageCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Referral {
  id: string
  name: string
  date: string
  earnings: number
  status: 'active' | 'pending'
}

export default function ReferralsPage() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [referrals] = useState<Referral[]>([
    { id: '1', name: 'Alice Johnson', date: '2024-01-15', earnings: 12.50, status: 'active' },
    { id: '2', name: 'Bob Smith', date: '2024-01-14', earnings: 8.75, status: 'active' },
    { id: '3', name: 'Carol White', date: '2024-01-13', earnings: 15.00, status: 'active' },
    { id: '4', name: 'David Brown', date: '2024-01-12', earnings: 0, status: 'pending' },
    { id: '5', name: 'Emma Davis', date: '2024-01-10', earnings: 5.25, status: 'active' },
  ])

  const referralLink = `https://adearn.com/register?ref=${user?.referralCode || 'USER123'}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOn = (platform: string) => {
    const text = `Join AdEarn and earn money watching ads! Use my code ${user?.referralCode} to get $5 bonus: ${referralLink}`
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
          <p className="text-gray-600 mt-1">
            Invite friends and earn 20% commission from their earnings forever
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
            <Users className="h-8 w-8 mb-4" />
            <p className="text-purple-100 text-sm">Total Referrals</p>
            <p className="text-3xl font-bold">{user.referrals}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
            <DollarSign className="h-8 w-8 mb-4" />
            <p className="text-green-100 text-sm">Referral Earnings</p>
            <p className="text-3xl font-bold">৳{user.referralEarnings.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
            <TrendingUp className="h-8 w-8 mb-4" />
            <p className="text-blue-100 text-sm">This Month</p>
            <p className="text-3xl font-bold">৳{(user.referralEarnings * 0.3).toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 text-white">
            <Gift className="h-8 w-8 mb-4" />
            <p className="text-gold-100 text-sm">Friend Bonus</p>
            <p className="text-3xl font-bold">৳550</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Referral Link Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Referral Link */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Referral Link
              </h2>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 flex items-center">
                  <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700 text-sm truncate">{referralLink}</span>
                </div>
                <button
                  onClick={copyLink}
                  className="bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => shareOn('facebook')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Share on Facebook
                </button>
                <button
                  onClick={() => shareOn('twitter')}
                  className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </button>
                <button
                  onClick={() => shareOn('whatsapp')}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Share on WhatsApp
                </button>
              </div>
            </div>

            {/* Referral Code */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Referral Code
              </h2>
              <div className="flex items-center justify-between bg-gold-50 rounded-lg p-4 border-2 border-dashed border-gold-400">
                <div>
                  <p className="text-2xl font-bold text-gold-700">{user.referralCode}</p>
                  <p className="text-sm text-gold-600">Share this code with friends</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user.referralCode)
                    toast.success('Code copied!')
                  }}
                  className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Referral List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Referrals ({referrals.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Earnings</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-primary-700 font-semibold text-sm">
                                {referral.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{referral.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{referral.date}</td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-green-600">
                            ৳{referral.earnings.toFixed(0)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            referral.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {referral.status === 'active' ? 'Active' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { icon: UserPlus, text: 'Invite friends using your unique link or code' },
                  { icon: Gift, text: 'Your friends get ৳550 bonus when they sign up' },
                  { icon: TrendingUp, text: 'Earn 20% of their earnings forever' },
                  { icon: DollarSign, text: 'Withdraw your referral earnings anytime' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-lg mr-3">
                      <step.icon className="h-4 w-4 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Milestones */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Milestone Rewards</h3>
              <div className="space-y-3">
                {[
                  { count: 5, reward: 1100, current: user.referrals },
                  { count: 10, reward: 2750, current: user.referrals },
                  { count: 25, reward: 8250, current: user.referrals },
                  { count: 50, reward: 22000, current: user.referrals },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{milestone.count} referrals</span>
                    <div className="flex items-center">
                      {milestone.current >= milestone.count && (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      )}
                      <span className={`font-medium ${
                        milestone.current >= milestone.count ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        ৳{milestone.reward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Share on social media groups</li>
                <li>• Tell friends about the ৳550 bonus</li>
                <li>• Post on forums and communities</li>
                <li>• Create YouTube tutorials</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
