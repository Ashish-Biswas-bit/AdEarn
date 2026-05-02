'use client'

import { WifiOff, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-8">
          <WifiOff className="h-12 w-12 text-zinc-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          You&apos;re Offline
        </h1>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          It seems you&apos;ve lost your internet connection. Some features may not be available while offline.
        </p>

        <div className="glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">
            What you can do:
          </h3>
          <ul className="text-zinc-400 text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>View your earnings balance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Check completed tasks history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Watch new ads</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Complete new tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Request withdrawals</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          disabled={!isOnline}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className="h-5 w-5" />
          {isOnline ? 'Try Again' : 'Waiting for connection...'}
        </button>
      </div>
    </div>
  )
}
