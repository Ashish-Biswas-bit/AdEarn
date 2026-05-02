'use client'

import Link from 'next/link'
import { PlayCircle, Gift, Users, Crown, DollarSign, CheckCircle, Sparkles, ArrowRight, Star, Clock, Facebook, Youtube, Instagram, Twitter, X, Eye, ThumbsUp, MessageCircle, UserPlus, Share2, ClipboardList, CheckCircle2, Wallet, MousePointerClick } from 'lucide-react'
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

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
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
      <section className={clsx('relative', 'pt-32', 'pb-20', 'px-4', 'overflow-hidden')}>
        {/* Animated Floating Elements */}
        <div className={clsx('absolute', 'inset-0', 'overflow-hidden', 'pointer-events-none')}>
          {/* Floating Coins */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={clsx('absolute', 'animate-float', 'opacity-30')}
              style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            >
              <div className={clsx('w-12', 'h-12', 'rounded-full', 'bg-gradient-to-br', 'from-yellow-400', 'to-yellow-600', 'flex', 'items-center', 'justify-center', 'shadow-lg')}>
                <span className={clsx('text-yellow-900', 'font-bold', 'text-lg')}>৳</span>
              </div>
            </div>
          ))}
          {/* Floating Dollar Bills */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`bill-${i}`}
              className={clsx('absolute', 'animate-float-slow', 'opacity-20')}
              style={{
                right: `${5 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.8}s`
              }}
            >
              <div className={clsx('w-20', 'h-10', 'rounded', 'bg-gradient-to-r', 'from-green-400', 'to-emerald-500', 'flex', 'items-center', 'justify-center', 'transform', 'rotate-12')}>
                <span className={clsx('text-white', 'font-bold', 'text-xs')}>৳100</span>
              </div>
            </div>
          ))}
          {/* Animated Rings */}
          <div className={clsx('absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2')}>
            <div className={clsx('w-[600px]', 'h-[600px]', 'border', 'border-primary-500/20', 'rounded-full', 'animate-spin-slow')} />
            <div className={clsx('absolute', 'inset-0', 'w-[500px]', 'h-[500px]', 'm-auto', 'border', 'border-accent-purple/20', 'rounded-full', 'animate-spin-reverse')} />
            <div className={clsx('absolute', 'inset-0', 'w-[400px]', 'h-[400px]', 'm-auto', 'border', 'border-gold-500/20', 'rounded-full', 'animate-spin-slow')} style={{ animationDuration: '15s' }} />
          </div>
          {/* Glowing Orbs */}
          <div className={clsx('absolute', 'top-20', 'left-20', 'w-32', 'h-32', 'bg-primary-500/30', 'rounded-full', 'blur-3xl', 'animate-pulse')} />
          <div className={clsx('absolute', 'bottom-20', 'right-20', 'w-40', 'h-40', 'bg-accent-purple/30', 'rounded-full', 'blur-3xl', 'animate-pulse')} style={{ animationDelay: '1s' }} />
        </div>

        <div className={clsx('max-w-6xl', 'mx-auto', 'text-center', 'relative', 'z-10')}>
          {/* Badge */}
          <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-primary-500/10', 'border', 'border-primary-500/20', 'mb-8', 'animate-fade-in-up')}>
            <Sparkles className={clsx('h-4', 'w-4', 'text-primary-400', 'animate-pulse')} />
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

          {/* Live Earnings Dashboard Preview */}
          <div className={clsx('mt-12', 'relative', 'max-w-3xl', 'mx-auto')}>
            <div className={clsx('glass-card', 'p-1', 'rounded-2xl', 'relative', 'overflow-hidden')}>
              {/* Animated gradient border */}
              <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-r', 'from-primary-500', 'via-accent-purple', 'to-primary-500', 'animate-pulse', 'opacity-50')} />
              
              <div className={clsx('relative', 'bg-dark-800', 'rounded-xl', 'p-6', 'overflow-hidden')}>
                {/* Header */}
                <div className={clsx('flex', 'items-center', 'justify-between', 'mb-6')}>
                  <div className={clsx('flex', 'items-center', 'gap-3')}>
                    <div className={clsx('w-3', 'h-3', 'rounded-full', 'bg-red-500')} />
                    <div className={clsx('w-3', 'h-3', 'rounded-full', 'bg-yellow-500')} />
                    <div className={clsx('w-3', 'h-3', 'rounded-full', 'bg-green-500')} />
                  </div>
                  <div className={clsx('text-zinc-500', 'text-sm')}>Live Dashboard Preview</div>
                </div>
                
                {/* Stats Grid */}
                <div className={clsx('grid', 'grid-cols-3', 'gap-4', 'mb-6')}>
                  <div className={clsx('bg-dark-700/50', 'rounded-lg', 'p-4', 'text-center')}>
                    <p className={clsx('text-zinc-400', 'text-xs', 'mb-1')}>Current Balance</p>
                    <p className={clsx('text-2xl', 'font-bold', 'text-white')}>
                      ৳<span className="animate-pulse">2,450</span>
                    </p>
                  </div>
                  <div className={clsx('bg-dark-700/50', 'rounded-lg', 'p-4', 'text-center')}>
                    <p className={clsx('text-zinc-400', 'text-xs', 'mb-1')}>Today Earned</p>
                    <p className={clsx('text-2xl', 'font-bold', 'text-green-400')}>৳385</p>
                  </div>
                  <div className={clsx('bg-dark-700/50', 'rounded-lg', 'p-4', 'text-center')}>
                    <p className={clsx('text-zinc-400', 'text-xs', 'mb-1')}>Ads Watched</p>
                    <p className={clsx('text-2xl', 'font-bold', 'text-primary-400')}>47</p>
                  </div>
                </div>
                
                {/* Live Activity Feed */}
                <div className={clsx('space-y-2')}>
                  <p className={clsx('text-zinc-500', 'text-xs', 'mb-3')}>Live Activity</p>
                  {[
                    { action: 'Watched Ad', amount: '+৳28', time: '2s ago', color: 'text-green-400' },
                    { action: 'Completed Task', amount: '+৳55', time: '15s ago', color: 'text-green-400' },
                    { action: 'Referral Bonus', amount: '+৳110', time: '1m ago', color: 'text-primary-400' },
                    { action: 'Watched Ad', amount: '+৳28', time: '2m ago', color: 'text-green-400' },
                  ].map((item, i) => (
                    <div key={i} className={clsx('flex', 'items-center', 'justify-between', 'bg-dark-700/30', 'rounded-lg', 'px-4', 'py-2', 'animate-fade-in-up')} style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className={clsx('flex', 'items-center', 'gap-3')}>
                        <div className={clsx('w-2', 'h-2', 'rounded-full', 'bg-green-500', 'animate-pulse')} />
                        <span className={clsx('text-zinc-300', 'text-sm')}>{item.action}</span>
                      </div>
                      <div className={clsx('flex', 'items-center', 'gap-4')}>
                        <span className={clsx('font-bold', item.color)}>{item.amount}</span>
                        <span className={clsx('text-zinc-500', 'text-xs')}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Play Button Overlay */}
                <div className={clsx('absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black/40', 'opacity-0', 'hover:opacity-100', 'transition-opacity', 'cursor-pointer')}>
                  <div className={clsx('w-16', 'h-16', 'rounded-full', 'bg-primary-600', 'flex', 'items-center', 'justify-center', 'shadow-lg', 'transform', 'hover:scale-110', 'transition-transform')}>
                    <PlayCircle className={clsx('h-8', 'w-8', 'text-white')} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating notification badges */}
            <div className={clsx('absolute', '-top-4', '-right-4', 'bg-green-500', 'text-white', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'font-bold', 'animate-bounce')}>
              +৳28
            </div>
            <div className={clsx('absolute', '-bottom-4', '-left-4', 'bg-primary-500', 'text-white', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'font-bold', 'animate-bounce')} style={{ animationDelay: '0.5s' }}>
              Live!
            </div>
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
          <div className={clsx('text-center', 'mb-16', 'reveal')}>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              How to <span className="gradient-text">Earn</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Multiple ways to earn money with our platform
            </p>
          </div>

          <div className={clsx('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'stagger-children')}>
            {[
              {
                icon: PlayCircle,
                title: 'Watch Ads',
                description: 'Earn up to ৳55 per ad view from our premium AdMob inventory.',
              },
              {
                icon: Gift,
                title: 'Complete Tasks',
                description: 'Like pages, subscribe channels, download apps - get paid for engagement.',
              },
              {
                icon: Users,
                title: 'Refer Friends',
                description: 'Earn 20% lifetime commission from every referral you bring.',
              },
              {
                icon: Crown,
                title: 'Go Premium',
                description: 'Unlock 3x earnings, instant withdrawals & exclusive high-paying offers.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={clsx('group', 'glass-card', 'p-8', 'hover-lift', 'gradient-border')}
              >
                <div className="relative">
                  <div className={clsx('card-icon', 'group-hover:scale-110')}>
                    <feature.icon />
                  </div>
                  <h4 className={clsx('card-title')}>
                    {feature.title}
                  </h4>
                  <p className={clsx('card-description')}>{feature.description}</p>
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
          <div className={clsx('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-8', 'md:gap-12', 'stagger-children')}>
            {[
              { value: formatNumber(animatedStats.paid), label: 'Paid to Users', prefix: '৳' },
              { value: formatNumber(animatedStats.users), label: 'Active Users' },
              { value: formatNumber(animatedStats.ads), label: 'Ads Watched' },
              { value: '4.9', label: 'User Rating', suffix: '★' },
            ].map((stat, index) => (
              <div key={index} className={clsx('text-center', 'reveal')}>
                <div className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-2')}>
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={clsx('py-24', 'px-4', 'relative', 'overflow-hidden')}>
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-primary-600/5', 'to-transparent')} />
        
        <div className={clsx('relative', 'max-w-6xl', 'mx-auto')}>
          <div className={clsx('text-center', 'mb-16', 'reveal')}>
            <div className={clsx('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'bg-primary-500/10', 'border', 'border-primary-500/20', 'mb-6')}>
              <MousePointerClick className={clsx('h-4', 'w-4', 'text-primary-400')} />
              <span className={clsx('text-sm', 'text-primary-300')}>Simple 3-Step Process</span>
            </div>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Start earning in minutes with our simple and straightforward process
            </p>
          </div>

          <div className={clsx('grid', 'md:grid-cols-3', 'gap-8', 'relative', 'stagger-children')}>
            {/* Connecting Line (Desktop) */}
            <div className={clsx('hidden', 'md:block', 'absolute', 'top-24', 'left-[20%]', 'right-[20%]', 'h-0.5', 'bg-gradient-to-r', 'from-primary-500/30', 'via-primary-500', 'to-primary-500/30')} />

            {[
              {
                step: '1',
                icon: ClipboardList,
                title: 'Choose an Offer',
                description: 'Browse hundreds of available offers, ads, and tasks. Pick the ones that interest you.',
              },
              {
                step: '2',
                icon: CheckCircle2,
                title: 'Complete Tasks',
                description: 'Watch ads, like posts, download apps, or complete surveys in seconds.',
              },
              {
                step: '3',
                icon: Wallet,
                title: 'Get Paid',
                description: 'Earn instant rewards. Withdraw anytime via bKash, Nagad, or bank.',
              },
            ].map((item, index) => (
              <div key={index} className={clsx('relative', 'group')}>
                <div className={clsx('glass-card', 'p-8', 'text-center', 'relative', 'z-10', 'hover-lift')}>
                  {/* Step Number Badge */}
                  <div className={clsx('absolute', '-top-4', 'left-1/2', '-translate-x-1/2', 'bg-primary-500', 'text-white', 'w-8', 'h-8', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-sm', 'font-bold', 'shadow-lg')}>
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={clsx('card-icon', 'mx-auto', 'mt-4')}>
                    <item.icon />
                  </div>
                  
                  {/* Content */}
                  <h3 className={clsx('card-title')}>{item.title}</h3>
                  <p className={clsx('card-description')}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Options Detail */}
      <section className={clsx('py-24', 'px-4')}>
        <div className={clsx('max-w-7xl', 'mx-auto')}>
          <div className={clsx('text-center', 'mb-16', 'reveal')}>
            <h2 className={clsx('text-4xl', 'md:text-5xl', 'font-bold', 'text-white', 'mb-4')}>
              Multiple Ways to <span className="gradient-text">Earn</span>
            </h2>
            <p className={clsx('text-zinc-400', 'text-lg', 'max-w-2xl', 'mx-auto')}>
              Choose from a variety of earning methods that suit your preferences
            </p>
          </div>

          <div className={clsx('space-y-4', 'stagger-children')}>
            {[
              {
                title: 'Ad Watching',
                earnings: '৳11 - ৳55',
                per: 'per ad',
                features: ['30-second video ads', 'Interactive ads', 'Banner ads', 'Daily unlimited views'],
                icon: PlayCircle,
              },
              {
                title: 'Social Media Tasks',
                earnings: '৳28 - ৳220',
                per: 'per task',
                features: ['Facebook page likes', 'YouTube subscriptions', 'Instagram follows', 'Twitter retweets'],
                icon: Users,
              },
              {
                title: 'App Downloads',
                earnings: '৳110 - ৳550',
                per: 'per download',
                features: ['Game apps', 'Shopping apps', 'Finance apps', 'Utility apps'],
                icon: Gift,
              },
              {
                title: 'Premium Rewards',
                earnings: '৳550 - ৳1,650',
                per: 'daily potential',
                features: ['3x earnings boost', 'Instant withdrawals', 'Premium offers', 'Priority support'],
                icon: Crown,
              },
            ].map((option, index) => (
              <div
                key={index}
                className={clsx('glass-card', 'p-6', 'md:p-8', 'flex', 'flex-col', 'md:flex-row', 'md:items-center', 'justify-between', 'group', 'hover-lift')}
              >
                <div className="flex-1">
                  <div className={clsx('flex', 'items-center', 'gap-4', 'mb-4')}>
                    <div className={clsx('card-icon', 'w-12', 'h-12', 'm-0')}>
                      <option.icon />
                    </div>
                    <h4 className={clsx('card-title', 'm-0')}>
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
          <div className={clsx('text-center', 'mb-16', 'reveal')}>
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

          <div className={clsx('grid', 'lg:grid-cols-2', 'gap-8', 'stagger-children')}>
            {/* Ad Watching Demo */}
            <div className={clsx('glass-card', 'p-8', 'relative', 'overflow-hidden')}>
              <div className={clsx('absolute', 'top-0', 'right-0', 'bg-blue-500/20', 'text-blue-400', 'px-4', 'py-2', 'rounded-bl-2xl', 'text-sm', 'font-medium')}>
                Demo Mode
              </div>
              
              <div className={clsx('flex', 'items-center', 'gap-4', 'mb-6')}>
                <div className={clsx('card-icon', 'm-0')}>
                  <PlayCircle />
                </div>
                <div>
                  <h3 className={clsx('card-title', 'm-0')}>Watch Ads</h3>
                  <p className={clsx('text-zinc-400', 'text-sm')}>Earn ৳11 - ৳55 per view</p>
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
                <div className={clsx('card-icon', 'm-0')}>
                  <Share2 />
                </div>
                <div>
                  <h3 className={clsx('card-title', 'm-0')}>Social Tasks</h3>
                  <p className={clsx('text-zinc-400', 'text-sm')}>Earn ৳28 - ৳220 per task</p>
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

      {/* Trustpilot Reviews Section */}
      <section className={clsx('py-20', 'px-4', 'relative', 'overflow-hidden')}>
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-dark-800', 'to-transparent')} />
        
        <div className={clsx('relative', 'max-w-6xl', 'mx-auto')}>
          {/* Trustpilot Header */}
          <div className={clsx('text-center', 'mb-12', 'reveal')}>
            <div className={clsx('inline-flex', 'items-center', 'gap-3', 'mb-6')}>
              <div className={clsx('flex', 'items-center', 'gap-1', 'bg-green-500', 'px-4', 'py-2', 'rounded-full')}>
                <svg viewBox="0 0 24 24" className={clsx('w-5', 'h-5')} fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className={clsx('text-white', 'font-bold', 'text-sm')}>Trustpilot</span>
              </div>
              <div className={clsx('flex', 'items-center', 'gap-1')}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className={clsx('w-5', 'h-5')} fill="#00b67a">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className={clsx('text-zinc-400', 'text-sm')}><span className={clsx('text-white', 'font-semibold')}>4.8</span> out of 5</span>
            </div>
            <h2 className={clsx('text-3xl', 'md:text-4xl', 'font-bold', 'text-white', 'mb-3')}>
              Trusted by <span className="gradient-text">500,000+</span> Users
            </h2>
            <p className={clsx('text-zinc-400')}>See what our community is saying about their earnings</p>
          </div>

          {/* Reviews Grid */}
          <div className={clsx('grid', 'md:grid-cols-3', 'gap-6', 'stagger-children')}>
            {[
              {
                name: 'Rahim Ahmed',
                location: 'Dhaka, Bangladesh',
                rating: 5,
                date: '2 days ago',
                text: 'Best earning app I have ever used! I make ৳1,500-2,000 daily just by watching ads during my commute. Withdrawals to bKash are instant!',
                verified: true,
                earnings: '৳45,000+ earned',
              },
              {
                name: 'Fatima Begum',
                location: 'Chittagong, Bangladesh',
                rating: 5,
                date: '1 week ago',
                text: 'The social media tasks are so easy! I complete them while watching TV. Premium membership doubled my earnings within the first month.',
                verified: true,
                earnings: '৳28,000+ earned',
              },
              {
                name: 'Kamrul Hasan',
                location: 'Sylhet, Bangladesh',
                rating: 5,
                date: '2 weeks ago',
                text: 'Customer support is excellent. Had an issue with a task verification and they resolved it within hours. Highly recommend!',
                verified: true,
                earnings: '৳62,000+ earned',
              },
              {
                name: 'Nasrin Jahan',
                location: 'Rajshahi, Bangladesh',
                rating: 4,
                date: '3 weeks ago',
                text: 'Great platform for students! I use the money for my tuition fees. The referral program is also very generous.',
                verified: true,
                earnings: '৳15,000+ earned',
              },
              {
                name: 'Mohammad Ali',
                location: 'Khulna, Bangladesh',
                rating: 5,
                date: '1 month ago',
                text: 'Finally a legitimate earning app that actually pays! I have withdrawn 5 times already, all processed within minutes.',
                verified: true,
                earnings: '৳38,000+ earned',
              },
              {
                name: 'Shabina Rahman',
                location: 'Barisal, Bangladesh',
                rating: 5,
                date: '1 month ago',
                text: 'Love the variety of tasks! The app download offers pay really well. My whole family is using it now.',
                verified: true,
                earnings: '৳52,000+ earned',
              },
            ].map((review, index) => (
              <div key={index} className={clsx('glass-card', 'p-6', 'relative', 'hover-lift')}>
                {/* Rating Stars */}
                <div className={clsx('flex', 'items-center', 'gap-1', 'mb-4')}>
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      viewBox="0 0 24 24" 
                      className={clsx('w-4', 'h-4')} 
                      fill={i < review.rating ? '#00b67a' : '#374151'}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span className={clsx('text-zinc-500', 'text-xs', 'ml-2')}>{review.date}</span>
                </div>

                {/* Review Text */}
                <p className={clsx('text-zinc-300', 'text-sm', 'leading-relaxed', 'mb-4')}>
                  "{review.text}"
                </p>

                {/* User Info */}
                <div className={clsx('flex', 'items-center', 'justify-between')}>
                  <div>
                    <div className={clsx('flex', 'items-center', 'gap-2')}>
                      <span className={clsx('text-white', 'font-semibold', 'text-sm')}>{review.name}</span>
                      {review.verified && (
                        <svg viewBox="0 0 24 24" className={clsx('w-4', 'h-4')} fill="#00b67a">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                    <p className={clsx('text-zinc-500', 'text-xs')}>{review.location}</p>
                  </div>
                  <div className={clsx('bg-green-500/10', 'border', 'border-green-500/20', 'px-2', 'py-1', 'rounded')}>
                    <span className={clsx('text-green-400', 'text-xs', 'font-semibold')}>{review.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Link */}
          <div className={clsx('text-center', 'mt-8')}>
            <button className={clsx('inline-flex', 'items-center', 'gap-2', 'text-zinc-400', 'hover:text-white', 'transition-colors')}>
              <span>Show all 2,847 reviews</span>
              <ArrowRight className={clsx('h-4', 'w-4')} />
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Partners & Payment Methods */}
      <section className={clsx('py-16', 'px-4', 'border-y', 'border-white/5')}>
        <div className={clsx('max-w-6xl', 'mx-auto')}>
          <p className={clsx('text-center', 'text-zinc-500', 'text-sm', 'mb-8', 'uppercase', 'tracking-wider')}>
            Trusted Partners & Payment Methods
          </p>
          
          {/* Payment Methods */}
          <div className={clsx('flex', 'flex-wrap', 'justify-center', 'items-center', 'gap-6', 'md:gap-10', 'mb-10')}>
            {/* bKash */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-70', 'hover:opacity-100')}>
              <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-pink-500', 'flex', 'items-center', 'justify-center', 'shadow-lg', 'shadow-pink-500/20')}>
                <svg viewBox="0 0 24 24" className={clsx('w-10', 'h-10')} fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-400', 'group-hover:text-pink-400', 'font-semibold', 'text-sm', 'transition-colors')}>bKash</span>
            </div>
            
            {/* Nagad */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-70', 'hover:opacity-100')}>
              <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-orange-500', 'flex', 'items-center', 'justify-center', 'shadow-lg', 'shadow-orange-500/20')}>
                <svg viewBox="0 0 24 24" className={clsx('w-10', 'h-10')} fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-400', 'group-hover:text-orange-400', 'font-semibold', 'text-sm', 'transition-colors')}>Nagad</span>
            </div>
            
            {/* Bank Transfer */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-70', 'hover:opacity-100')}>
              <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-green-600', 'flex', 'items-center', 'justify-center', 'shadow-lg', 'shadow-green-500/20')}>
                <svg viewBox="0 0 24 24" className={clsx('w-10', 'h-10')} fill="white">
                  <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zm6 0v7h3v-7h-3zM2 22h20v-3H2v3zm2-5h16v-2H4v2zM2 4l10-3 10 3v6H2V4z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-400', 'group-hover:text-green-400', 'font-semibold', 'text-sm', 'transition-colors')}>Bank Transfer</span>
            </div>
            
            {/* Rocket */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-70', 'hover:opacity-100')}>
              <div className={clsx('w-16', 'h-16', 'rounded-2xl', 'bg-blue-600', 'flex', 'items-center', 'justify-center', 'shadow-lg', 'shadow-blue-500/20')}>
                <svg viewBox="0 0 24 24" className={clsx('w-10', 'h-10')} fill="white">
                  <path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm0 17c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-1-12h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-400', 'group-hover:text-blue-400', 'font-semibold', 'text-sm', 'transition-colors')}>Rocket</span>
            </div>
          </div>
          
          {/* Partner Platforms */}
          <div className={clsx('flex', 'flex-wrap', 'justify-center', 'items-center', 'gap-6', 'md:gap-10')}>
            {/* Facebook */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-60', 'hover:opacity-100')}>
              <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-blue-600', 'flex', 'items-center', 'justify-center')}>
                <svg viewBox="0 0 24 24" className={clsx('w-7', 'h-7')} fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-500', 'group-hover:text-blue-400', 'font-medium', 'text-sm', 'transition-colors')}>Facebook</span>
            </div>
            
            {/* YouTube */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-60', 'hover:opacity-100')}>
              <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-red-600', 'flex', 'items-center', 'justify-center')}>
                <svg viewBox="0 0 24 24" className={clsx('w-7', 'h-7')} fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-500', 'group-hover:text-red-400', 'font-medium', 'text-sm', 'transition-colors')}>YouTube</span>
            </div>
            
            {/* Instagram */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-60', 'hover:opacity-100')}>
              <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-gradient-to-br', 'from-purple-600', 'via-pink-600', 'to-yellow-400', 'flex', 'items-center', 'justify-center')}>
                <svg viewBox="0 0 24 24" className={clsx('w-7', 'h-7')} fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-500', 'group-hover:text-pink-400', 'font-medium', 'text-sm', 'transition-colors')}>Instagram</span>
            </div>
            
            {/* Twitter/X */}
            <div className={clsx('group', 'flex', 'flex-col', 'items-center', 'gap-2', 'transition-all', 'opacity-60', 'hover:opacity-100')}>
              <div className={clsx('w-12', 'h-12', 'rounded-xl', 'bg-sky-500', 'flex', 'items-center', 'justify-center')}>
                <svg viewBox="0 0 24 24" className={clsx('w-7', 'h-7')} fill="white">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span className={clsx('text-zinc-500', 'group-hover:text-sky-400', 'font-medium', 'text-sm', 'transition-colors')}>Twitter</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={clsx('relative', 'py-20', 'px-4')}>
        <div className={clsx('max-w-4xl', 'mx-auto', 'reveal')}>
          <div className={clsx('glass-card', 'p-8', 'md:p-12', 'text-center', 'relative', 'overflow-hidden', 'animate-glow-pulse')}>
            <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-r', 'from-primary-500/20', 'to-accent-purple-500/20')} />
            <div className={clsx('relative', 'z-10')}>
              <h2 className={clsx('text-3xl', 'md:text-4xl', 'font-bold', 'text-white', 'mb-4')}>
                Ready to Start Earning?
              </h2>
              <p className={clsx('text-zinc-400', 'mb-8', 'max-w-xl', 'mx-auto')}>
                Join 500,000+ users already earning money on AdEarn. Sign up now and get a ৳550 bonus!
              </p>
              <Link
                href="/register"
                className={clsx('inline-flex', 'items-center', 'gap-2', 'bg-white', 'text-dark-900', 'px-8', 'py-4', 'rounded-xl', 'font-semibold', 'hover:bg-zinc-200', 'transition-all', 'hover:scale-105')}
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
