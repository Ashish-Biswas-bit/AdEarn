'use client'

import { useEffect, useState } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream
    setIsIOS(isIOSDevice)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Show prompt after 5 seconds on iOS or if installable
    const timer = setTimeout(() => {
      if (!isInstalled) {
        setIsVisible(true)
      }
    }, 5000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      clearTimeout(timer)
    }
  }, [isInstalled])

  const handleInstall = async () => {
    if (!deferredPrompt && !isIOS) {
      // For browsers that don't support beforeinstallprompt
      alert('To install: Tap the menu (⋮) and select "Add to Home screen"')
      return
    }

    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    }
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  if (!isVisible || isInstalled) return null

  // Check if recently dismissed
  const dismissed = localStorage.getItem('installPromptDismissed')
  if (dismissed) {
    const dismissedTime = parseInt(dismissed)
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
    if (daysSinceDismissed < 7) return null // Don't show for 7 days after dismiss
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 glass-card p-4 z-50 animate-float">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center flex-shrink-0">
          {isIOS ? (
            <Smartphone className="h-6 w-6 text-white" />
          ) : (
            <Download className="h-6 w-6 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold mb-1">
            Install AdEarn App
          </h3>

          {isIOS ? (
            <p className="text-zinc-400 text-sm mb-3">
              Tap the share button and select &quot;Add to Home Screen&quot; to install
            </p>
          ) : (
            <p className="text-zinc-400 text-sm mb-3">
              Install our app for quick access and offline earning
            </p>
          )}

          {!isIOS && (
            <button
              onClick={handleInstall}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors w-full"
            >
              Install Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
