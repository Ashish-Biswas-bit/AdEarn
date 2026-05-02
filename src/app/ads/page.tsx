'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { PlayCircle, Clock, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface Ad {
  id: string
  type: 'video' | 'banner' | 'interstitial'
  title: string
  description: string
  duration: number
  reward: number
  status: 'available' | 'watching' | 'completed'
  thumbnail?: string
}

export default function AdsPage() {
  const { user, updateBalance } = useAuth()
  const [ads, setAds] = useState<Ad[]>([
    {
      id: '1',
      type: 'video',
      title: 'Product Showcase',
      description: 'Watch this 30-second video about our featured product',
      duration: 30,
      reward: 28,
      status: 'available',
    },
    {
      id: '2',
      type: 'video',
      title: 'App Promotion',
      description: 'Learn about the latest mobile app',
      duration: 15,
      reward: 17,
      status: 'available',
    },
    {
      id: '3',
      type: 'banner',
      title: 'Banner Ad View',
      description: 'View this banner for 10 seconds',
      duration: 10,
      reward: 11,
      status: 'available',
    },
    {
      id: '4',
      type: 'interstitial',
      title: 'Interactive Ad',
      description: 'Engage with this interactive advertisement',
      duration: 20,
      reward: 38,
      status: 'available',
    },
    {
      id: '5',
      type: 'video',
      title: 'Game Trailer',
      description: 'Watch the new game trailer',
      duration: 45,
      reward: 55,
      status: 'available',
    },
    {
      id: '6',
      type: 'video',
      title: 'Tech Review',
      description: 'Quick tech gadget review',
      duration: 25,
      reward: 22,
      status: 'available',
    },
  ])
  const [watchingAd, setWatchingAd] = useState<Ad | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [dailyCount, setDailyCount] = useState(7)
  const maxDailyAds = user?.isPremium ? 100 : 50

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (watchingAd && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (watchingAd && countdown === 0) {
      completeAd(watchingAd)
    }
    return () => clearTimeout(timer)
  }, [watchingAd, countdown])

  const watchAd = (ad: Ad) => {
    if (dailyCount >= maxDailyAds) {
      toast.error('Daily ad limit reached. Upgrade to premium for more!')
      return
    }
    
    setWatchingAd(ad)
    setCountdown(ad.duration)
    
    setAds(ads.map(a => 
      a.id === ad.id ? { ...a, status: 'watching' } : a
    ))
  }

  const completeAd = (ad: Ad) => {
    const reward = user?.isPremium ? ad.reward * 3 : ad.reward
    updateBalance(reward)
    setDailyCount(dailyCount + 1)
    
    setAds(ads.map(a => 
      a.id === ad.id ? { ...a, status: 'completed' } : a
    ))
    
    setWatchingAd(null)
    toast.success(`Earned ৳${reward.toFixed(0)}!`)
  }

  const skipAd = () => {
    if (watchingAd) {
      setAds(ads.map(a => 
        a.id === watchingAd.id ? { ...a, status: 'available' } : a
      ))
      setWatchingAd(null)
      setCountdown(0)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Watch Ads & Earn</h1>
          <p className="text-gray-600 mt-1">
            Watch advertisements and earn money for each view
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <PlayCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Ads Watched Today</p>
                <p className="text-xl font-bold text-gray-900">{dailyCount}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Earned Today</p>
                <p className="text-xl font-bold text-gray-900">৳{(dailyCount * 28).toFixed(0)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Daily Limit</p>
                <p className="text-xl font-bold text-gray-900">{maxDailyAds}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gold-50 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-gold-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-xl font-bold text-gray-900">{maxDailyAds - dailyCount}</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Daily Progress</span>
              <span className="text-gray-900">{Math.round((dailyCount / maxDailyAds) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${(dailyCount / maxDailyAds) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ad Watching Overlay */}
        {watchingAd && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {watchingAd.title}
                </h3>
                <p className="text-gray-600">{watchingAd.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {countdown}s
                </div>
                <p className="text-sm text-gray-500">Keep watching to earn</p>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-primary-500 h-3 rounded-full transition-all"
                  style={{ width: `${((watchingAd.duration - countdown) / watchingAd.duration) * 100}%` }}
                />
              </div>
              
              <button
                onClick={skipAd}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Skip (No reward)
              </button>
            </div>
          </div>
        )}

        {/* Available Ads Grid */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Available Ads ({ads.filter(a => a.status === 'available').length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.filter(ad => ad.status !== 'completed').map((ad) => (
            <div
              key={ad.id}
              className={`bg-white rounded-xl shadow-sm p-6 transition-all ${
                ad.status === 'watching' 
                  ? 'ring-2 ring-primary-500' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  ad.type === 'video' ? 'bg-blue-50' :
                  ad.type === 'banner' ? 'bg-green-50' :
                  'bg-purple-50'
                }`}>
                  <PlayCircle className={`h-6 w-6 ${
                    ad.type === 'video' ? 'text-blue-600' :
                    ad.type === 'banner' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ad.status === 'available' ? 'bg-green-100 text-green-700' :
                  ad.status === 'watching' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {ad.status === 'available' ? 'Ready' :
                   ad.status === 'watching' ? 'Watching' :
                   'Completed'}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{ad.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {ad.duration} seconds
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ৳{user?.isPremium ? (ad.reward * 3).toFixed(0) : ad.reward.toFixed(0)}
                  {user?.isPremium && <span className="text-gold-500 ml-1">(3x)</span>}
                </span>
              </div>
              
              <button
                onClick={() => watchAd(ad)}
                disabled={ad.status !== 'available' || dailyCount >= maxDailyAds}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  ad.status === 'available' && dailyCount < maxDailyAds
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {ad.status === 'available' 
                  ? dailyCount >= maxDailyAds 
                    ? 'Limit Reached' 
                    : 'Watch & Earn'
                  : ad.status === 'watching' 
                    ? 'Watching...' 
                    : 'Completed'}
              </button>
            </div>
          ))}
        </div>

        {/* Completed Ads */}
        {ads.filter(ad => ad.status === 'completed').length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
              Completed ({ads.filter(a => a.status === 'completed').length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.filter(ad => ad.status === 'completed').map((ad) => (
                <div
                  key={ad.id}
                  className="bg-gray-100 rounded-xl p-6 opacity-60"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-semibold text-gray-700">{ad.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Earned: ${user?.isPremium ? (ad.reward * 3).toFixed(2) : ad.reward.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* AdMob Integration Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">AdMob Integration</h4>
              <p className="text-sm text-blue-700">
                This platform is integrated with Google AdMob to serve high-quality advertisements. 
                Backend integration with AdMob SDK is required for production use. Contact your 
                developer to configure AdMob ad units and implement the server-side verification 
                system.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
