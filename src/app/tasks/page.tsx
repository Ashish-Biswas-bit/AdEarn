'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Twitter, 
  Smartphone,
  ExternalLink,
  CheckCircle,
  DollarSign,
  Clock,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Task {
  id: string
  type: 'facebook' | 'youtube' | 'instagram' | 'twitter' | 'app'
  title: string
  description: string
  action: string
  reward: number
  status: 'available' | 'pending' | 'completed'
  link: string
  estimatedTime: string
}

export default function TasksPage() {
  const { user, updateBalance } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      type: 'facebook',
      title: 'Like Facebook Page',
      description: 'Like our partner\'s Facebook page and stay connected',
      action: 'Like Page',
      reward: 55,
      status: 'available',
      link: 'https://facebook.com/example',
      estimatedTime: '1 min',
    },
    {
      id: '2',
      type: 'youtube',
      title: 'Subscribe YouTube Channel',
      description: 'Subscribe to our featured YouTube channel',
      action: 'Subscribe',
      reward: 82,
      status: 'available',
      link: 'https://youtube.com/example',
      estimatedTime: '2 min',
    },
    {
      id: '3',
      type: 'instagram',
      title: 'Follow on Instagram',
      description: 'Follow our brand partner on Instagram',
      action: 'Follow',
      reward: 44,
      status: 'available',
      link: 'https://instagram.com/example',
      estimatedTime: '1 min',
    },
    {
      id: '4',
      type: 'twitter',
      title: 'Retweet & Follow',
      description: 'Retweet the pinned tweet and follow the account',
      action: 'Retweet & Follow',
      reward: 66,
      status: 'available',
      link: 'https://twitter.com/example',
      estimatedTime: '2 min',
    },
    {
      id: '5',
      type: 'app',
      title: 'Download Shopping App',
      description: 'Download and install the shopping app, open it for 30 seconds',
      action: 'Download App',
      reward: 330,
      status: 'available',
      link: '#',
      estimatedTime: '5 min',
    },
    {
      id: '6',
      type: 'app',
      title: 'Try New Game',
      description: 'Download the mobile game and complete the tutorial',
      action: 'Download & Play',
      reward: 550,
      status: 'available',
      link: '#',
      estimatedTime: '10 min',
    },
    {
      id: '7',
      type: 'facebook',
      title: 'Join Facebook Group',
      description: 'Join our exclusive community group on Facebook',
      action: 'Join Group',
      reward: 38,
      status: 'available',
      link: 'https://facebook.com/groups/example',
      estimatedTime: '1 min',
    },
    {
      id: '8',
      type: 'youtube',
      title: 'Watch & Comment',
      description: 'Watch the full video and leave a genuine comment',
      action: 'Watch Video',
      reward: 110,
      status: 'available',
      link: 'https://youtube.com/watch?v=example',
      estimatedTime: '8 min',
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'facebook': return Facebook
      case 'youtube': return Youtube
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      case 'app': return Smartphone
      default: return ExternalLink
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'facebook': return 'bg-blue-500'
      case 'youtube': return 'bg-red-500'
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'twitter': return 'bg-sky-500'
      case 'app': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const startTask = (task: Task) => {
    window.open(task.link, '_blank')
    
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, status: 'pending' } : t
    ))
    
    toast.success('Task opened! Complete it and click verify.')
  }

  const verifyTask = (task: Task) => {
    const reward = user?.isPremium ? task.reward * 3 : task.reward
    updateBalance(reward)
    
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, status: 'completed' } : t
    ))
    
    toast.success(`Task completed! Earned ৳${reward.toFixed(0)}`)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Complete Tasks & Earn</h1>
          <p className="text-gray-600 mt-1">
            Complete social media tasks and app downloads to earn rewards
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-xl font-bold text-gray-900">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Earned from Tasks</p>
                <p className="text-xl font-bold text-gray-900">
                  ${tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + (user?.isPremium ? t.reward * 3 : t.reward), 0).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Available Tasks</p>
                <p className="text-xl font-bold text-gray-900">
                  {tasks.filter(t => t.status === 'available').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Categories */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Social Media Tasks */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Social Media Tasks
            </h2>
            <div className="space-y-4">
              {tasks.filter(t => t.type !== 'app').map((task) => {
                const Icon = getIcon(task.type)
                const colorClass = getColor(task.type)
                
                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl shadow-sm p-6 transition-all ${
                      task.status === 'completed' ? 'opacity-60' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className={`${colorClass} p-3 rounded-lg mr-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {task.estimatedTime}
                            <span className="mx-2">•</span>
                            <DollarSign className="h-4 w-4 mr-1" />
                            {user?.isPremium ? (task.reward * 3).toFixed(2) : task.reward.toFixed(2)}
                            {user?.isPremium && <span className="text-gold-500 ml-1">(3x)</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        {task.status === 'available' && (
                          <button
                            onClick={() => startTask(task)}
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            {task.action}
                          </button>
                        )}
                        {task.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startTask(task)}
                              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => verifyTask(task)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Verify
                            </button>
                          </div>
                        )}
                        {task.status === 'completed' && (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* App Download Tasks */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              App Downloads
            </h2>
            <div className="space-y-4">
              {tasks.filter(t => t.type === 'app').map((task) => {
                const Icon = getIcon(task.type)
                
                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl shadow-sm p-6 transition-all ${
                      task.status === 'completed' ? 'opacity-60' : 'hover:shadow-md'
                    }`}
                  >
                    <div className={`bg-green-500 p-3 rounded-lg w-fit mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.estimatedTime}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold text-green-600">
                        ${user?.isPremium ? (task.reward * 3).toFixed(2) : task.reward.toFixed(2)}
                        {user?.isPremium && <span className="text-xs text-gold-500 ml-1">(3x)</span>}
                      </span>
                      
                      {task.status === 'available' && (
                        <button
                          onClick={() => startTask(task)}
                          className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-700"
                        >
                          {task.action}
                        </button>
                      )}
                      {task.status === 'pending' && (
                        <button
                          onClick={() => verifyTask(task)}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700"
                        >
                          Verify
                        </button>
                      )}
                      {task.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">How it works:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click the task button to open the link</li>
                    <li>Complete the required action</li>
                    <li>Return and click &quot;Verify&quot; to claim reward</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
