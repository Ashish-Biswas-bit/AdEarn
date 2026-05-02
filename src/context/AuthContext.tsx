'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  balance: number
  totalEarned: number
  referralCode: string
  isPremium: boolean
  premiumExpiry?: Date
  referrals: number
  referralEarnings: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, referralCode?: string) => Promise<void>
  logout: () => void
  updateBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - will be replaced with API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      balance: 16555,
      totalEarned: 49500,
      referralCode: 'USER123',
      isPremium: false,
      referrals: 5,
      referralEarnings: 5500,
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const register = async (name: string, email: string, password: string, referralCode?: string) => {
    // Mock register - will be replaced with API call
    const mockUser: User = {
      id: '2',
      name,
      email,
      balance: referralCode ? 550 : 0,
      totalEarned: referralCode ? 550 : 0,
      referralCode: `USER${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      isPremium: false,
      referrals: 0,
      referralEarnings: 0,
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balance: user.balance + amount,
        totalEarned: amount > 0 ? user.totalEarned + amount : user.totalEarned,
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateBalance,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
