'use client'

import Link from 'next/link'
import { PlayCircle, Gift, Users, Crown, DollarSign, CheckCircle, Sparkles, ArrowRight, Star, Clock, Facebook, Youtube, Instagram, Twitter, X, Eye, ThumbsUp, MessageCircle, UserPlus, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import InstallPrompt from '@/components/InstallPrompt'

// Simple clsx implementation
function clsx(...classes: (string | undefined | null | false | string[])[]) {
  return classes.flat().filter(Boolean).join(' ')
}

export default function LandingPage() {
  const [animatedStats, setAnimatedStats] = useState({ users: 0, paid: 0, ads: 0 })
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [demoAdProgress, setDemoAdProgress] = useState(0)
  const [demoTaskCompleted, setDemoTaskCompleted] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        users: Math.min(prev.users + 5000, 500000),
        paid: Math.min(prev.paid + 25000, 2500000),
        ads: Math.min(prev.ads + 100000, 10000000)
      }))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
    return num + '+'
  }

  return (
    <div className={clsx('min-h-screen', 'bg-dark-900')}>
      {/* Animated Background */}
      <div className={clsx('fixed', 'inset-0', 'overflow-hidden', 'pointer-events-none')}>
        <div className={clsx('absolute', 'top-0', 'left-1/4', 'w-96', 'h-96', 'bg-primary-500/20', 'rounded-full', 'blur-3xl', 'animate-pulse-slow')} />
        <div className={clsx('absolute', 'bottom-0', 'right-1/4', 'w-96', 'h-96', 'bg-accent-purple/20', 'rounded-full', 'blur-3xl', 'animate-pulse-slow')} style={{ animationDelay: '1s' }} />
        <div className={clsx('absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-[800px]', 'h-[800px]', 'bg-gradient-radial', 'from-primary-500/10', 'via-transparent', 'to-transparent')} />
      </div>

      {/* Header */}
      <header className={clsx('fixed', 'top-0', 'w-full', 'z-50', 'glass-card', 'border-b-0')}>
        <div className={clsx('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-4', 'flex', 'justify-between', 'items-center')}>
          <Link href="/" className={clsx('flex', 'items-center', 'gap-2')}>
            <div className={clsx('w-10', 'h-10', 'rounded-xl', 'bg-gradient-to-br', 'from-primary-500', 'to-accent-purple', 'flex', 'items-center', 'justify-center')}>
              <DollarSign className={clsx('h-6', 'w-6', 'text-white')} />
            </div>
            <span className={clsx('text-2xl', 'font-bold', 'gradient-text')}>AdEarn</span>
          </Link>
          <div className={clsx('flex', 'items-center', 'gap-4')}>
            <Link
              href="/login"
              className={clsx('text-zinc-400', 'hover:text-white', 'font-medium', 'transition-colors', 'hidden', 'sm:block')}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={clsx('bg-primary-600', 'text-white', 'px-5', 'py-2.5', 'rounded-xl', 'font-semibold', 'hover:bg-primary-500', 'transition-all', 'hover:shadow-glow')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={clsx('relative', 'pt-32', 'pb-20', 'px-4')}>
        <div className={clsx('max-w-6xl', 'mx-auto', 'text-center')}>
          {/* Badge */}
          <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-primary-500/10', 'border', 'border-primary-500/20', 'mb-8')}>
            <Sparkles className={clsx('h-4', 'w-4', 'text-primary-400')} />
            <span className={clsx('text-sm', 'text-primary-300')}>Trusted by 500K+ users worldwide</span>
          </div>

          <h1 className={clsx('text-5xl', 'md:text-7xl', 'font-bold', 'text-white', 'mb-6', 'leading-tight')}>
            Earn Money by{' '}
            <span className="gradient-text">Watching Ads</span>
          </h1>
          
          <p className={clsx('text-xl', 'text-zinc-400', 'mb-10', 'max-w-2xl', 'mx-auto', 'leading-relaxed')}>
            Join millions earning real cash daily. Watch ads, complete tasks, refer friends, 
            and unlock premium features for 3x higher earnings.
          </p>

          {/* CTA Buttons */}
          <div className={clsx('flex', 'flex-col', 'sm:flex-row', 'justify-center', 'gap-4', 'mb-8')}>
            <Link
              href="/register"
              className={clsx('group', 'bg-primary-600', 'text-white', 'px-8', 'py-4', 'rounded-xl', 'font-semibold', 'text-lg', 'hover:bg-primary-500', 'transition-all', 'hover:shadow-glow-lg', 'inline-flex', 'items-center', 'justify-center', 'gap-2')}
            >
              Start Earning Now
              <ArrowRight className={clsx('h-5', 'w-5', 'group-hover:translate-x-1', 'transition-transform')} />
            </Link>
            <Link
              href="/login"
              className={clsx('glass-card', 'text-white', 'px-8', 'py-4', 'rounded-xl', 'font-semibold', 'text-lg', 'hover:bg-white/10', 'transition-all', 'inline-flex', 'items-center', 'justify-center')}
            >
              Already a Member
            </Link>
          </div>

          {/* Bonus Badge */}
          <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-gold-500/10', 'border', 'border-gold-500/20')}>
            <Gift className={clsx('h-4', 'w-4', 'text-gold-400')} />
            <span className="text-sm">
              <span className="text-zinc-400">Sign up bonus:</span>{' '}
              <span className={clsx('text-gold-400', 'font-bold')}>৳550</span>
              <span className="text-zinc-500"> with referral code</span>
            </span>
          </div>

          {/* Trust Indicators */}
          <div className={clsx('flex', 'flex-wrap', 'justify-center', 'gap-6', 'mt-12', 'text-zinc-500', 'text-sm')}>
            <div className={clsx('flex', 'items-center', 'gap-2')}>
              <CheckCircle className={clsx('h-4', 'w-4', 'text-green-500')} />
              <span>Instant Withdrawals</span>
            </div>
            <div className={clsx('flex', 'items-center', 'gap-2')}>
              <CheckCircle className={clsx('h-4', 'w-4', 'text-green-500')} />
              <span>No Hidden Fees</span>
            </div>
            <div className={clsx('flex', 'items-center', 'gap-2')}>
              <CheckCircle className={clsx('h-4', 'w-4', 'text-green-500')} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={clsx('relative', 'py-24', 'px-4')}>
        <div className={clsx('max-w-7xl', 'mx-auto')}>
          <div className={clsx('text-center', 'mb-16')}>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              How to <span className="gradient-text">Earn</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Multiple ways to earn money with our platform
            </p>
          </div>

          <div className={clsx('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6')}>
            {[
              {
                icon: PlayCircle,
                title: 'Watch Ads',
                description: 'Earn up to ৳55 per ad view from our premium AdMob inventory.',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-400',
              },
              {
                icon: Gift,
                title: 'Complete Tasks',
                description: 'Like pages, subscribe channels, download apps - get paid for engagement.',
                gradient: 'from-green-500/20 to-emerald-500/20',
                iconBg: 'bg-green-500/20',
                iconColor: 'text-green-400',
              },
              {
                icon: Users,
                title: 'Refer Friends',
                description: 'Earn 20% lifetime commission from every referral you bring.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                iconBg: 'bg-purple-500/20',
                iconColor: 'text-purple-400',
              },
              {
                icon: Crown,
                title: 'Go Premium',
                description: 'Unlock 3x earnings, instant withdrawals & exclusive high-paying offers.',
                gradient: 'from-gold-500/20 to-amber-500/20',
                iconBg: 'bg-gold-500/20',
                iconColor: 'text-gold-400',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={clsx('group', 'glass-card', 'p-8', 'hover-lift', 'gradient-border')}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <h4 className={clsx('text-xl', 'font-semibold', 'text-white', 'mb-3')}>
                    {feature.title}
                  </h4>
                  <p className={clsx('text-zinc-400', 'leading-relaxed')}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={clsx('relative', 'py-20', 'overflow-hidden')}>
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-r', 'from-primary-600/20', 'via-accent-purple/20', 'to-primary-600/20')} />
        <div className={clsx('absolute', 'inset-0', 'backdrop-blur-sm')} />
        
        <div className={clsx('relative', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className={clsx('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-8', 'md:gap-12')}>
            {[
              { value: formatNumber(animatedStats.paid), label: 'Paid to Users', prefix: '$' },
              { value: formatNumber(animatedStats.users), label: 'Active Users' },
              { value: formatNumber(animatedStats.ads), label: 'Ads Watched' },
              { value: '4.9', label: 'User Rating', suffix: '★' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-2')}>
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Options Detail */}
      <section className={clsx('py-24', 'px-4')}>
        <div className={clsx('max-w-7xl', 'mx-auto')}>
          <div className={clsx('text-center', 'mb-16')}>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              Multiple Ways to <span className="gradient-text">Earn</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Choose from a variety of earning methods that suit your preferences
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Ad Watching',
                earnings: '৳11 - ৳55',
                per: 'per ad',
                features: ['30-second video ads', 'Interactive ads', 'Banner ads', 'Daily unlimited views'],
                icon: PlayCircle,
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-400',
              },
              {
                title: 'Social Media Tasks',
                earnings: '৳28 - ৳220',
                per: 'per task',
                features: ['Facebook page likes', 'YouTube subscriptions', 'Instagram follows', 'Twitter retweets'],
                icon: Users,
                iconBg: 'bg-purple-500/20',
                iconColor: 'text-purple-400',
              },
              {
                title: 'App Downloads',
                earnings: '৳110 - ৳550',
                per: 'per download',
                features: ['Game apps', 'Shopping apps', 'Finance apps', 'Utility apps'],
                icon: Gift,
                iconBg: 'bg-green-500/20',
                iconColor: 'text-green-400',
              },
              {
                title: 'Referral Program',
                earnings: '20%',
                per: 'lifetime commission',
                features: ['Unique referral code', 'Real-time tracking', 'Bonus milestones', 'Unlimited referrals'],
                icon: Crown,
                iconBg: 'bg-gold-500/20',
                iconColor: 'text-gold-400',
              },
            ].map((option, index) => (
              <div
                key={index}
                className={clsx('glass-card', 'p-6', 'md:p-8', 'flex', 'flex-col', 'md:flex-row', 'md:items-center', 'justify-between', 'group', 'hover-lift')}
              >
                <div className="flex-1">
                  <div className={clsx('flex', 'items-center', 'gap-4', 'mb-4')}>
                    <div className={`w-12 h-12 rounded-xl ${option.iconBg} flex items-center justify-center`}>
                      <option.icon className={`h-6 w-6 ${option.iconColor}`} />
                    </div>
                    <h4 className={clsx('text-xl', 'font-semibold', 'text-white')}>
                      {option.title}
                    </h4>
                  </div>
                  <div className={clsx('flex', 'flex-wrap', 'gap-2')}>
                    {option.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={clsx('inline-flex', 'items-center', 'px-3', 'py-1.5', 'rounded-full', 'text-sm', 'bg-white/5', 'text-zinc-400', 'border', 'border-white/10')}
                      >
                        <CheckCircle className={clsx('h-3.5', 'w-3.5', 'mr-1.5', 'text-green-500')} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={clsx('mt-6', 'md:mt-0', 'md:ml-8', 'flex', 'items-center', 'gap-3')}>
                  <span className={clsx('text-2xl', 'md:text-3xl', 'font-bold', 'text-white')}>{option.earnings}</span>
                  <span className="text-zinc-500">{option.per}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className={clsx('py-24', 'px-4', 'relative', 'overflow-hidden')}>
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-primary-600/5', 'to-transparent')} />
        
        <div className={clsx('relative', 'max-w-7xl', 'mx-auto')}>
          <div className={clsx('text-center', 'mb-16')}>
            <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-green-500/10', 'border', 'border-green-500/20', 'mb-6')}>
              <Eye className={clsx('h-4', 'w-4', 'text-green-400')} />
              <span className={clsx('text-sm', 'text-green-300')}>Try Before You Join</span>
            </div>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              Experience How It <span className="gradient-text">Works</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Try our interactive demos below. Click on any task to see how easy it is to earn!
            </p>
          </div>

          <div className={clsx('grid', 'lg:grid-cols-2', 'gap-8')}>
            {/* Ad Watching Demo */}
            <div className={clsx('glass-card', 'p-8', 'relative', 'overflow-hidden')}>
              <div className={clsx('absolute', 'top-0', 'right-0', 'bg-blue-500/20', 'text-blue-400', 'px-4', 'py-2', 'rounded-bl-2xl', 'text-sm', 'font-medium')}>
                Demo Mode
              </div>
              
              <div className={clsx('flex', 'items-center', 'gap-4', 'mb-6')}>
                <div className={clsx('w-14', 'h-14', 'rounded-2xl', 'bg-blue-500/20', 'flex', 'items-center', 'justify-center')}>
                  <PlayCircle className={clsx('h-7', 'w-7', 'text-blue-400')} />
                </div>
                <div>
                  <h3 className={clsx('text-2xl', 'font-bold', 'text-white')}>Watch Ads</h3>
                  <p className={clsx('text-zinc-400')}>Earn ৳11 - ৳55 per view</p>
                </div>
              </div>

              <div className={clsx('bg-dark-800', 'rounded-2xl', 'p-6', 'mb-6')}>
                <div className={clsx('aspect-video', 'bg-gradient-to-br', 'from-blue-600', 'to-purple-600', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'mb-4', 'relative', 'overflow-hidden')}>
                  {activeDemo === 'ad' ? (
                    <>
                      <div className={clsx('absolute', 'inset-0', 'flex', 'items-center', 'justify-center')}>
                        <div className={clsx('text-center')}>
                          <PlayCircle className={clsx('h-16', 'w-16', 'text-white', 'mx-auto', 'mb-4', 'animate-pulse')} />
                          <p className={clsx('text-white', 'text-lg', 'font-semibold')}>Watching Ad...</p>
                          <p className={clsx('text-white/70', 'text-sm')}>{demoAdProgress}% completed</p>
                        </div>
                      </div>
                      <div className={clsx('absolute', 'bottom-0', 'left-0', 'right-0', 'h-1', 'bg-white/20')}>
                        <div 
                          className={clsx('h-full', 'bg-green-400', 'transition-all', 'duration-100')}
                          style={{ width: `${demoAdProgress}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={clsx('absolute', 'top-3', 'right-3', 'bg-black/50', 'text-white', 'px-2', 'py-1', 'rounded', 'text-xs')}>
                        <Clock className={clsx('h-3', 'w-3', 'inline', 'mr-1')} /> 0:30
                      </div>
                      <div className={clsx('text-center')}>
                        <p className={clsx('text-white', 'font-semibold', 'mb-2')}>Sample Advertisement</p>
                        <p className={clsx('text-white/70', 'text-sm')}>Premium Product Showcase</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className={clsx('flex', 'items-center', 'justify-between')}>
                  <div className={clsx('flex', 'items-center', 'gap-2')}>
                    <span className={clsx('text-zinc-400', 'text-sm')}>Reward:</span>
                    <span className={clsx('text-green-400', 'font-bold')}>৳28</span>
                  </div>
                  <span className={clsx('text-zinc-500', 'text-sm')}>30 seconds</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (activeDemo === 'ad') return
                  setActiveDemo('ad')
                  setDemoAdProgress(0)
                  const interval = setInterval(() => {
                    setDemoAdProgress(prev => {
                      if (prev >= 100) {
                        clearInterval(interval)
                        setTimeout(() => {
                          setShowLoginModal(true)
                          setActiveDemo(null)
                        }, 500)
                        return 100
                      }
                      return prev + 10
                    })
                  }, 300)
                }}
                disabled={activeDemo === 'ad'}
                className={clsx(
                  'w-full', 'py-4', 'rounded-xl', 'font-semibold', 'text-lg', 'transition-all',
                  activeDemo === 'ad' ? 'bg-green-500/20 text-green-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.02]'
                )}
              >
                {activeDemo === 'ad' ? 'Watching...' : 'Watch Demo Ad'}
              </button>
            </div>

            {/* Social Media Tasks Demo */}
            <div className={clsx('glass-card', 'p-8', 'relative', 'overflow-hidden')}>
              <div className={clsx('absolute', 'top-0', 'right-0', 'bg-purple-500/20', 'text-purple-400', 'px-4', 'py-2', 'rounded-bl-2xl', 'text-sm', 'font-medium')}>
                Demo Mode
              </div>
              
              <div className={clsx('flex', 'items-center', 'gap-4', 'mb-6')}>
                <div className={clsx('w-14', 'h-14', 'rounded-2xl', 'bg-purple-500/20', 'flex', 'items-center', 'justify-center')}>
                  <Share2 className={clsx('h-7', 'w-7', 'text-purple-400')} />
                </div>
                <div>
                  <h3 className={clsx('text-2xl', 'font-bold', 'text-white')}>Social Tasks</h3>
                  <p className={clsx('text-zinc-400')}>Earn ৳28 - ৳220 per task</p>
                </div>
              </div>

              <div className={clsx('space-y-3', 'mb-6')}>
                {[
                  { icon: Facebook, name: 'Like Facebook Page', reward: 55, color: 'bg-blue-600', time: '1 min', id: 'fb' },
                  { icon: Youtube, name: 'Subscribe Channel', reward: 82, color: 'bg-red-600', time: '2 min', id: 'yt' },
                  { icon: Instagram, name: 'Follow Account', reward: 44, color: 'bg-gradient-to-r from-purple-600 to-pink-600', time: '1 min', id: 'ig' },
                  { icon: Twitter, name: 'Retweet & Follow', reward: 66, color: 'bg-sky-500', time: '2 min', id: 'tw' },
                ].map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => {
                      if (demoTaskCompleted.includes(task.id)) return
                      setDemoTaskCompleted(prev => [...prev, task.id])
                      setTimeout(() => {
                        setShowLoginModal(true)
                        setDemoTaskCompleted(prev => prev.filter(id => id !== task.id))
                      }, 800)
                    }}
                    className={clsx(
                      'bg-dark-800', 'rounded-xl', 'p-4', 'flex', 'items-center', 'justify-between',
                      'cursor-pointer', 'transition-all', 'hover:bg-dark-700',
                      demoTaskCompleted.includes(task.id) && 'ring-2 ring-green-500/50'
                    )}
                  >
                    <div className={clsx('flex', 'items-center', 'gap-3')}>
                      <div className={clsx('w-10', 'h-10', 'rounded-lg', task.color, 'flex', 'items-center', 'justify-center')}>
                        <task.icon className={clsx('h-5', 'w-5', 'text-white')} />
                      </div>
                      <div>
                        <p className={clsx('text-white', 'font-medium', 'text-sm')}>{task.name}</p>
                        <p className={clsx('text-zinc-500', 'text-xs', 'flex', 'items-center')}>
                          <Clock className={clsx('h-3', 'w-3', 'mr-1')} /> {task.time}
                        </p>
                      </div>
                    </div>
                    <div className={clsx('text-right')}>
                      <p className={clsx('text-green-400', 'font-bold')}>৳{task.reward}</p>
                      {demoTaskCompleted.includes(task.id) ? (
                        <CheckCircle className={clsx('h-4', 'w-4', 'text-green-400', 'ml-auto')} />
                      ) : (
                        <p className={clsx('text-zinc-500', 'text-xs')}>Click to try</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={clsx('bg-purple-500/10', 'rounded-xl', 'p-4', 'mb-6')}>
                <p className={clsx('text-zinc-400', 'text-sm', 'text-center')}>
                  <ThumbsUp className={clsx('h-4', 'w-4', 'inline', 'mr-2', 'text-purple-400')} />
                  Complete simple social media tasks and get paid instantly!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={clsx('grid', 'grid-cols-3', 'gap-6', 'mt-12')}>
            {[
              { label: 'Demo Ad Reward', value: '৳28', icon: PlayCircle },
              { label: 'Avg Task Reward', value: '৳62', icon: Share2 },
              { label: 'Daily Potential', value: '৳1,650+', icon: DollarSign },
            ].map((stat, index) => (
              <div key={index} className={clsx('glass-card', 'p-6', 'text-center')}>
                <stat.icon className={clsx('h-6', 'w-6', 'text-primary-400', 'mx-auto', 'mb-3')} />
                <p className={clsx('text-2xl', 'font-bold', 'text-white', 'mb-1')}>{stat.value}</p>
                <p className={clsx('text-zinc-400', 'text-sm')}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className={clsx('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'p-4')}>
          <div 
            className={clsx('absolute', 'inset-0', 'bg-black/80', 'backdrop-blur-sm')}
            onClick={() => setShowLoginModal(false)}
          />
          <div className={clsx('relative', 'glass-card', 'p-8', 'max-w-md', 'w-full', 'text-center')}>
            <button
              onClick={() => setShowLoginModal(false)}
              className={clsx('absolute', 'top-4', 'right-4', 'text-zinc-400', 'hover:text-white')}
            >
              <X className={clsx('h-5', 'w-5')} />
            </button>
            
            <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-primary-500/20', 'flex', 'items-center', 'justify-center', 'mx-auto', 'mb-6')}>
              <Sparkles className={clsx('h-8', 'w-8', 'text-primary-400')} />
            </div>
            
            <h3 className={clsx('text-2xl', 'font-bold', 'text-white', 'mb-3')}>
              Great Job!
            </h3>
            <p className={clsx('text-zinc-400', 'mb-6')}>
              You&apos;ve completed the demo! Create an account now to start earning real money.
            </p>
            
            <div className={clsx('space-y-3')}>
              <Link
                href="/register"
                className={clsx('block', 'w-full', 'bg-primary-600', 'text-white', 'py-3', 'rounded-xl', 'font-semibold', 'hover:bg-primary-500', 'transition-colors')}
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className={clsx('block', 'w-full', 'glass-card', 'text-white', 'py-3', 'rounded-xl', 'font-semibold', 'hover:bg-white/10', 'transition-colors')}
              >
                Already Have Account? Login
              </Link>
            </div>
            
            <p className={clsx('text-zinc-500', 'text-sm', 'mt-4')}>
              Join 500,000+ users earning daily!
            </p>
          </div>
        </div>
      )}

      {/* Premium Section */}
      <section className={clsx('relative', 'py-24', 'px-4', 'overflow-hidden')}>
        {/* Background glow */}
        <div className={clsx('absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-[600px]', 'h-[600px]', 'bg-gold-500/10', 'rounded-full', 'blur-3xl')} />
        
        <div className={clsx('relative', 'max-w-4xl', 'mx-auto', 'text-center')}>
          <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-gold-500/10', 'border', 'border-gold-500/20', 'mb-8')}>
            <Crown className={clsx('h-4', 'w-4', 'text-gold-400')} />
            <span className={clsx('text-sm', 'text-gold-300')}>Premium Membership</span>
          </div>

          <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-6')}>
            Upgrade to <span className="text-gold-400">Premium</span>
          </h2>
          
          <p className={clsx('text-xl', 'text-zinc-400', 'mb-10', 'max-w-2xl', 'mx-auto', 'leading-relaxed')}>
            Unlock 3x higher earnings, instant withdrawals, exclusive high-paying offers, 
            and priority support. Premium members earn on average <span className={clsx('text-gold-400', 'font-semibold')}>৳5,500/day</span>!
          </p>

          {/* Pricing Cards */}
          <div className={clsx('grid', 'md:grid-cols-3', 'gap-6', 'mb-10')}>
            {[
              { plan: 'Monthly', price: '৳1,099', period: '/month', popular: false },
              { plan: 'Quarterly', price: '৳2,749', period: '/3 months', popular: true, save: '17%' },
              { plan: 'Yearly', price: '৳8,799', period: '/year', popular: false, save: '33%' },
            ].map((tier, index) => (
              <div
                key={index}
                className={`glass-card p-6 relative ${tier.popular ? 'border-gold-500/30' : ''}`}
              >
                {tier.popular && (
                  <div className={clsx('absolute', '-top-3', 'left-1/2', '-translate-x-1/2')}>
                    <span className={clsx('bg-gold-500', 'text-dark-900', 'px-3', 'py-1', 'rounded-full', 'text-xs', 'font-bold')}>POPULAR</span>
                  </div>
                )}
                {tier.save && (
                  <div className={clsx('absolute', 'top-4', 'right-4')}>
                    <span className={clsx('bg-green-500/20', 'text-green-400', 'px-2', 'py-1', 'rounded', 'text-xs', 'font-medium')}>Save {tier.save}</span>
                  </div>
                )}
                <h4 className={clsx('text-lg', 'font-semibold', 'text-white', 'mb-2')}>{tier.plan}</h4>
                <div className={clsx('flex', 'items-baseline', 'justify-center', 'gap-1', 'mb-6')}>
                  <span className={clsx('text-3xl', 'font-bold', 'text-white')}>{tier.price}</span>
                  <span className="text-zinc-500">{tier.period}</span>
                </div>
                <ul className={clsx('space-y-3', 'text-left', 'mb-6')}>
                  {['3x Earnings Multiplier', 'Instant Withdrawals', 'Premium Offers', 'Priority Support'].map((item, idx) => (
                    <li key={idx} className={clsx('flex', 'items-center', 'text-zinc-400', 'text-sm')}>
                      <CheckCircle className={clsx('h-4', 'w-4', 'mr-2', 'text-gold-500')} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full py-3 rounded-xl font-semibold transition-all ${
                    tier.popular
                      ? 'bg-gold-500 text-dark-900 hover:bg-gold-400'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={clsx('relative', 'py-20', 'px-4')}>
        <div className={clsx('max-w-4xl', 'mx-auto')}>
          <div className={clsx('glass-card', 'p-8', 'md:p-12', 'text-center', 'relative', 'overflow-hidden')}>
            <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-r', 'from-primary-500/20', 'to-accent-purple/20')} />
            <div className={clsx('relative', 'z-10')}>
              <h2 className={clsx('text-3xl', 'md:text-4xl', 'font-bold', 'text-white', 'mb-4')}>
                Ready to Start Earning?
              </h2>
              <p className={clsx('text-zinc-400', 'mb-8', 'max-w-xl', 'mx-auto')}>
                Join 500,000+ users already earning money on AdEarn. Sign up now and get a $5 bonus!
              </p>
              <Link
                href="/register"
                className={clsx('inline-flex', 'items-center', 'gap-2', 'bg-white', 'text-dark-900', 'px-8', 'py-4', 'rounded-xl', 'font-semibold', 'hover:bg-zinc-200', 'transition-all')}
              >
                Create Free Account
                <ArrowRight className={clsx('h-5', 'w-5')} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={clsx('border-t', 'border-white/10', 'py-12', 'px-4')}>
        <div className={clsx('max-w-7xl', 'mx-auto')}>
          <div className={clsx('grid', 'md:grid-cols-4', 'gap-8', 'mb-12')}>
            <div className="md:col-span-1">
              <Link href="/" className={clsx('flex', 'items-center', 'gap-2', 'mb-4')}>
                <div className={clsx('w-8', 'h-8', 'rounded-lg', 'bg-gradient-to-br', 'from-primary-500', 'to-accent-purple', 'flex', 'items-center', 'justify-center')}>
                  <DollarSign className={clsx('h-5', 'w-5', 'text-white')} />
                </div>
                <span className={clsx('text-xl', 'font-bold', 'gradient-text')}>AdEarn</span>
              </Link>
              <p className={clsx('text-zinc-500', 'text-sm')}>
                The most trusted platform for earning money online through ads and tasks.
              </p>
            </div>
            <div>
              <h5 className={clsx('font-semibold', 'text-white', 'mb-4')}>Quick Links</h5>
              <ul className={clsx('space-y-2', 'text-sm')}>
                <li><Link href="/login" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Login</Link></li>
                <li><Link href="/register" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Register</Link></li>
                <li><Link href="/premium" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Premium</Link></li>
              </ul>
            </div>
            <div>
              <h5 className={clsx('font-semibold', 'text-white', 'mb-4')}>Support</h5>
              <ul className={clsx('space-y-2', 'text-sm')}>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Help Center</a></li>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Contact Us</a></li>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>FAQs</a></li>
              </ul>
            </div>
            <div>
              <h5 className={clsx('font-semibold', 'text-white', 'mb-4')}>Legal</h5>
              <ul className={clsx('space-y-2', 'text-sm')}>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Terms of Service</a></li>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Privacy Policy</a></li>
                <li><a href="#" className={clsx('text-zinc-500', 'hover:text-white', 'transition-colors')}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className={clsx('pt-8', 'border-t', 'border-white/10', 'text-center', 'text-zinc-500', 'text-sm')}>
            <p>&copy; 2024 AdEarn. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  )
}
