import { useState, useEffect } from 'react'
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiTarget, FiAward, FiAlertTriangle } from 'react-icons/fi'
import { useLocale } from '../context/LocaleContext'

function MinistryKPIs({ entityId }) {
  const { locale } = useLocale()
  const isAr = locale === 'ar'
  const [kpis, setKpis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadKPIs()
  }, [entityId])

  const loadKPIs = async () => {
    try {
      setLoading(true)
      // Mock KPI data for demonstration
      const mockKPIs = [
        {
          kpi_id: '1',
          kpi_name: 'Service Delivery Efficiency',
          kpi_name_ar: 'كفاءة تقديم الخدمة',
          kpi_category: 'Efficiency',
          target_value: 95,
          actual_value: 87,
          unit: '%',
          status: 'At Risk',
          reporting_period_start: '2024-01-01',
          reporting_period_end: '2024-12-31'
        },
        {
          kpi_id: '2',
          kpi_name: 'Digital Adoption Rate',
          kpi_name_ar: 'معدل التبني الرقمي',
          kpi_category: 'Innovation',
          target_value: 80,
          actual_value: 92,
          unit: '%',
          status: 'On Track',
          reporting_period_start: '2024-01-01',
          reporting_period_end: '2024-12-31'
        },
        {
          kpi_id: '3',
          kpi_name: 'Citizen Satisfaction',
          kpi_name_ar: 'رضا المواطن',
          kpi_category: 'Quality',
          target_value: 85,
          actual_value: 78,
          unit: '%',
          status: 'At Risk',
          reporting_period_start: '2024-01-01',
          reporting_period_end: '2024-12-31'
        },
        {
          kpi_id: '4',
          kki_name: 'Cost Reduction',
          kpi_name_ar: 'تخفيض التكلفة',
          kpi_category: 'Efficiency',
          target_value: 15,
          actual_value: 22,
          unit: '%',
          status: 'On Track',
          reporting_period_start: '2024-01-01',
          reporting_period_end: '2024-12-31'
        }
      ]
      setKpis(mockKPIs)
    } catch (error) {
      console.error('Failed to load KPIs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-green-600 bg-green-100'
      case 'At Risk': return 'text-yellow-600 bg-yellow-100'
      case 'Off Track': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Track': return <FiTrendingUp className="w-4 h-4" />
      case 'At Risk': return <FiAlertTriangle className="w-4 h-4" />
      case 'Off Track': return <FiTrendingDown className="w-4 h-4" />
      default: return <FiBarChart2 className="w-4 h-4" />
    }
  }

  const getPerformanceColor = (actual, target) => {
    const percentage = (actual / target) * 100
    if (percentage >= 95) return 'text-green-600'
    if (percentage >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {isAr ? 'مؤشرات الأداء الرئيسية' : 'Key Performance Indicators'}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiBarChart2 className="w-4 h-4" />
          <span>{kpis.length} {isAr ? 'مؤشر' : 'KPIs'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.kpi_id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">
                  {isAr ? kpi.kpi_name_ar : kpi.kpi_name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr ? 'الفئة:' : 'Category:'} {kpi.kpi_category}
                </p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                {getStatusIcon(kpi.status)}
                <span>{kpi.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiTarget className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {isAr ? 'الهدف:' : 'Target:'}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  {kpi.target_value}{kpi.unit}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiAward className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {isAr ? 'الفعلي:' : 'Actual:'}
                  </span>
                </div>
                <span className={`font-bold ${getPerformanceColor(kpi.actual_value, kpi.target_value)}`}>
                  {kpi.actual_value}{kpi.unit}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    kpi.status === 'On Track' ? 'bg-green-500' :
                    kpi.status === 'At Risk' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((kpi.actual_value / kpi.target_value) * 100, 100)}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {isAr ? 'الأداء:' : 'Performance:'}
                </span>
                <span className={`text-xs font-medium ${getPerformanceColor(kpi.actual_value, kpi.target_value)}`}>
                  {((kpi.actual_value / kpi.target_value) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {kpis.filter(kpi => kpi.status === 'On Track').length}
            </div>
            <div className="text-xs text-gray-600">
              {isAr ? 'على المسار' : 'On Track'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {kpis.filter(kpi => kpi.status === 'At Risk').length}
            </div>
            <div className="text-xs text-gray-600">
              {isAr ? 'في خطر' : 'At Risk'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {kpis.filter(kpi => kpi.status === 'Off Track').length}
            </div>
            <div className="text-xs text-gray-600">
              {isAr ? 'خارج المسار' : 'Off Track'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinistryKPIs