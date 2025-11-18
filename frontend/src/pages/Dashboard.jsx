import { useState, useEffect } from 'react'
import { reportingAPI } from '../api'
import { FiActivity, FiDollarSign, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'

function Dashboard() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await reportingAPI.getNationalOverview()
      setOverview(response.data.data)
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Entities',
      value: overview?.totalEntities || 0,
      icon: FiActivity,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      label: 'Active Programs',
      value: overview?.activePrograms || 0,
      icon: FiCheckCircle,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      label: 'Total Budget',
      value: `SAR ${((overview?.totalBudget || 0) / 1000000000).toFixed(2)}B`,
      icon: FiDollarSign,
      color: 'bg-yellow-500',
      trend: '+15%'
    },
    {
      label: 'Avg Completion',
      value: `${overview?.avgCompletion || 0}%`,
      icon: FiTrendingUp,
      color: 'bg-purple-500',
      trend: '+5%'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">National Overview</h1>
        <p className="text-gray-600 mt-1">Saudi Arabia Digital Transformation Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-green-600 text-sm mt-2">{stat.trend} from last month</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Regional Distribution</h3>
          <div className="space-y-4">
            {['Central', 'Western', 'Eastern', 'Northern', 'Southern'].map((region) => (
              <div key={region} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{region} Region</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {Math.floor(Math.random() * 50) + 20}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Program Status</h3>
          <div className="space-y-4">
            {[
              { status: 'Planning', count: 24, color: 'bg-yellow-500' },
              { status: 'In Progress', count: 89, color: 'bg-blue-500' },
              { status: 'Completed', count: 45, color: 'bg-green-500' },
              { status: 'On Hold', count: 13, color: 'bg-gray-500' },
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="font-medium text-gray-700">{item.status}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New program created', entity: 'Ministry of Health', time: '2 hours ago' },
            { action: 'Budget approved', entity: 'SDAIA', time: '5 hours ago' },
            { action: 'Project completed', entity: 'NEOM Authority', time: '1 day ago' },
            { action: 'User added', entity: 'Ministry of Interior', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.entity}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
