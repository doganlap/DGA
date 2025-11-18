import { useState, useEffect } from 'react'
import { budgetAPI } from '../api'
import { FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi'

function Budget() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBudget()
  }, [])

  const loadBudget = async () => {
    try {
      const response = await budgetAPI.getOverview()
      setOverview(response.data.data)
    } catch (error) {
      console.error('Failed to load budget:', error)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Budget Overview</h1>
        <p className="text-gray-600 mt-1">National digital transformation budget tracking</p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Allocated</h3>
            <FiDollarSign className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            SAR {((overview?.totalAllocated || 0) / 1000000000).toFixed(2)}B
          </p>
          <p className="text-sm opacity-90 mt-2">Across all programs</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <FiTrendingUp className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            SAR {((overview?.totalSpent || 0) / 1000000000).toFixed(2)}B
          </p>
          <p className="text-sm opacity-90 mt-2">Year to date</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Utilization Rate</h3>
            <FiPieChart className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            {overview?.utilizationRate || 0}%
          </p>
          <p className="text-sm opacity-90 mt-2">Budget efficiency</p>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Budget Distribution</h3>
        <div className="space-y-4">
          {overview?.byRegion?.map((region) => (
            <div key={region.region} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{region.region} Region</span>
                <span className="font-bold text-gray-900">
                  SAR {(region.total / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(region.total / overview.totalAllocated) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Spending Categories</h3>
          <div className="space-y-3">
            {[
              { category: 'Infrastructure', amount: 850, percentage: 35 },
              { category: 'Software Licenses', amount: 620, percentage: 25 },
              { category: 'Consulting', amount: 480, percentage: 20 },
              { category: 'Staff Costs', amount: 320, percentage: 13 },
              { category: 'Training', amount: 180, percentage: 7 },
            ].map((item) => (
              <div key={item.category} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      SAR {item.amount}M ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-dga-green h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quarterly Trend</h3>
          <div className="space-y-3">
            {['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'].map((quarter, index) => (
              <div key={quarter} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-700">{quarter}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    SAR {(Math.random() * 500 + 200).toFixed(0)}M
                  </span>
                  <span className={`text-sm font-semibold ${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 15).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
