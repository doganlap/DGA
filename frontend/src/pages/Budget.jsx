import { useState, useEffect } from 'react'
import { budgetAPI } from '../api'
import { FiDollarSign, FiTrendingUp, FiPieChart, FiBarChart2, FiCalendar, FiBriefcase, FiAlertTriangle } from 'react-icons/fi'
import { useLocale } from '../context/LocaleContext'
import { motion } from 'framer-motion'
import { Bar, Line, Pie } from 'react-chartjs-2'

function Budget() {
  const { locale } = useLocale()
  const isAr = locale === 'ar'
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [budgetStats, setBudgetStats] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    loadBudget()
  }, [])

  const loadBudget = async () => {
    try {
      const response = await budgetAPI.getOverview()
      const budgetData = response.data.data
      setOverview(budgetData)
      
      // Calculate detailed budget statistics
      const stats = {
        totalAllocated: budgetData.totalAllocated || 0,
        totalSpent: budgetData.totalSpent || 0,
        utilizationRate: budgetData.utilizationRate || 0,
        byRegion: budgetData.byRegion || [],
        byCategory: budgetData.byCategory || [],
        quarterlyData: budgetData.quarterlyData || [],
        // Additional detailed stats
        totalRemaining: (budgetData.totalAllocated || 0) - (budgetData.totalSpent || 0),
        remainingPercentage: budgetData.totalAllocated ? 
          Math.round(((budgetData.totalAllocated - budgetData.totalSpent) / budgetData.totalAllocated) * 100) : 0,
        // Risk indicators
        overspendRegions: (budgetData.byRegion || []).filter(r => 
          (r.spent || 0) > (r.allocated || 0) * 0.9
        ).length,
        underspendRegions: (budgetData.byRegion || []).filter(r => 
          (r.spent || 0) < (r.allocated || 0) * 0.5
        ).length
      }
      
      setBudgetStats(stats)
    } catch (error) {
      console.error('Failed to load budget:', error)
      // Set mock data for demo
      const mockStats = {
        totalAllocated: 5200000000,
        totalSpent: 4530000000,
        utilizationRate: 87,
        totalRemaining: 670000000,
        remainingPercentage: 13,
        overspendRegions: 1,
        underspendRegions: 2,
        byRegion: [
          { region: 'Central', allocated: 2000000000, spent: 1800000000 },
          { region: 'Western', allocated: 1500000000, spent: 1300000000 },
          { region: 'Eastern', allocated: 1000000000, spent: 900000000 },
          { region: 'Northern', allocated: 500000000, spent: 400000000 },
          { region: 'Southern', allocated: 200000000, spent: 130000000 }
        ],
        byCategory: [
          { category: 'Infrastructure', allocated: 2500000000, spent: 2200000000 },
          { category: 'Software Licenses', allocated: 1200000000, spent: 1100000000 },
          { category: 'Consulting', allocated: 800000000, spent: 700000000 },
          { category: 'Staff Costs', allocated: 500000000, spent: 400000000 },
          { category: 'Training', allocated: 200000000, spent: 130000000 }
        ]
      }
      setBudgetStats(mockStats)
      setOverview(mockStats)
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
        <h1 className="text-3xl font-bold text-gray-900">{isAr ? 'نظرة عامة على الميزانية' : 'Budget Overview'}</h1>
        <p className="text-gray-600 mt-1">{isAr ? 'متابعة ميزانية التحول الرقمي الوطنية' : 'National digital transformation budget tracking'}</p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{isAr ? 'إجمالي المخصص' : 'Total Allocated'}</h3>
            <FiDollarSign className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            {isAr ? 'ريال' : 'SAR'} {((overview?.totalAllocated || 0) / 1000000000).toFixed(2)}{isAr ? 'مليار' : 'B'}
          </p>
            <p className="text-sm opacity-90 mt-2">{isAr ? 'عبر جميع البرامج' : 'Across all programs'}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{isAr ? 'إجمالي المصروف' : 'Total Spent'}</h3>
            <FiTrendingUp className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            {isAr ? 'ريال' : 'SAR'} {((overview?.totalSpent || 0) / 1000000000).toFixed(2)}{isAr ? 'مليار' : 'B'}
          </p>
            <p className="text-sm opacity-90 mt-2">{isAr ? 'منذ بداية السنة' : 'Year to date'}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{isAr ? 'معدل الاستفادة' : 'Utilization Rate'}</h3>
            <FiPieChart className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            {overview?.utilizationRate || 0}%
          </p>
            <p className="text-sm opacity-90 mt-2">{isAr ? 'كفاءة الميزانية' : 'Budget efficiency'}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{isAr ? 'المتبقي' : 'Remaining'}</h3>
            <FiBarChart2 className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold">
            {isAr ? 'ريال' : 'SAR'} {((budgetStats?.totalRemaining || 0) / 1000000000).toFixed(2)}{isAr ? 'مليار' : 'B'}
          </p>
            <p className="text-sm opacity-90 mt-2">{budgetStats?.remainingPercentage || 0}% {isAr ? 'من الميزانية' : 'of budget'}</p>
        </div>
      </div>

      {/* Budget Risk Indicators */}
      {budgetStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-800">{isAr ? 'مناطق الإنفاق المرتفع' : 'High Spending Regions'}</h3>
              <FiAlertTriangle className="text-3xl text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-700">{budgetStats.overspendRegions}</p>
            <p className="text-sm text-red-600 mt-2">{isAr ? 'منطقة تتجاوز 90% من الميزانية' : 'Regions exceeding 90% of budget'}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-800">{isAr ? 'مناطق الإنفاق المنخفض' : 'Low Spending Regions'}</h3>
              <FiBarChart2 className="text-3xl text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-700">{budgetStats.underspendRegions}</p>
            <p className="text-sm text-yellow-600 mt-2">{isAr ? 'منطقة أقل من 50% من الميزانية' : 'Regions under 50% of budget'}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">{isAr ? 'المناطق المثالية' : 'Optimal Regions'}</h3>
              <FiTrendingUp className="text-3xl text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700">{5 - (budgetStats.overspendRegions + budgetStats.underspendRegions)}</p>
            <p className="text-sm text-green-600 mt-2">{isAr ? 'منطقة ضمن النطاق المستهدف' : 'Regions within target range'}</p>
          </div>
        </div>
      )}

      {/* Regional Breakdown with Detailed Analysis */}
      {budgetStats && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{isAr ? 'توزيع الميزانية حسب المنطقة' : 'Regional Budget Distribution'}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{isAr ? 'تحليل المناطق' : 'Regional Analysis'}</h4>
              <div className="space-y-4">
                {budgetStats.byRegion.map((region) => {
                  const utilizationRate = region.allocated ? Math.round((region.spent / region.allocated) * 100) : 0
                  const status = utilizationRate > 90 ? 'high' : utilizationRate < 50 ? 'low' : 'optimal'
                  
                  return (
                    <div key={region.region} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setSelectedRegion(region)}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          {isAr ? 
                            (region.region === 'Central' ? 'الوسطى' : 
                             region.region === 'Western' ? 'الغربية' : 
                             region.region === 'Eastern' ? 'الشرقية' : 
                             region.region === 'Northern' ? 'الشمالية' : 'الجنوبية') : 
                            region.region} {isAr ? 'منطقة' : 'Region'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          status === 'high' ? 'bg-red-100 text-red-700' :
                          status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {status === 'high' ? (isAr ? 'مرتفع' : 'High') :
                           status === 'low' ? (isAr ? 'منخفض' : 'Low') :
                           (isAr ? 'مثالي' : 'Optimal')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{isAr ? 'مخصص:' : 'Allocated:'} SAR {(region.allocated/1e6).toFixed(1)}M</span>
                        <span>{isAr ? 'مصروف:' : 'Spent:'} SAR {(region.spent/1e6).toFixed(1)}M</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            status === 'high' ? 'bg-red-500' :
                            status === 'low' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${utilizationRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {isAr ? 'معدل الاستفادة:' : 'Utilization Rate:'} {utilizationRate}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{isAr ? 'ملخص الميزانية' : 'Budget Summary'}</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'إجمالي المخصص:' : 'Total Allocated:'}</span>
                  <span className="font-bold text-blue-600">SAR {((budgetStats.totalAllocated || 0)/1e9).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'إجمالي المصروف:' : 'Total Spent:'}</span>
                  <span className="font-bold text-green-600">SAR {((budgetStats.totalSpent || 0)/1e9).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'المتبقي:' : 'Remaining:'}</span>
                  <span className="font-bold text-orange-600">SAR {((budgetStats.totalRemaining || 0)/1e9).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'معدل الاستفادة:' : 'Utilization Rate:'}</span>
                  <span className="font-bold text-purple-600">{budgetStats.utilizationRate}%</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'مناطق مرتفعة:' : 'High Spending:'}</span>
                  <span className="font-bold text-red-600">{budgetStats.overspendRegions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'مناطق منخفضة:' : 'Low Spending:'}</span>
                  <span className="font-bold text-yellow-600">{budgetStats.underspendRegions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{isAr ? 'مناطق مثالية:' : 'Optimal Regions:'}</span>
                  <span className="font-bold text-green-600">{5 - (budgetStats.overspendRegions + budgetStats.underspendRegions)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regional Detail Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isAr ? 
                    (selectedRegion.region === 'Central' ? 'منطقة الوسطى' : 
                     selectedRegion.region === 'Western' ? 'منطقة الغربية' : 
                     selectedRegion.region === 'Eastern' ? 'منطقة الشرقية' : 
                     selectedRegion.region === 'Northern' ? 'منطقة الشمالية' : 'منطقة الجنوبية') : 
                    `${selectedRegion.region} Region`} - {isAr ? 'تفاصيل الميزانية' : 'Budget Details'}
                </h2>
                <button 
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Budget Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">SAR {(selectedRegion.allocated/1e6).toFixed(1)}M</div>
                  <div className="text-sm text-blue-700">{isAr ? 'الميزانية المخصصة' : 'Allocated Budget'}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">SAR {(selectedRegion.spent/1e6).toFixed(1)}M</div>
                  <div className="text-sm text-green-700">{isAr ? 'المصروف' : 'Spent Budget'}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">SAR {((selectedRegion.allocated - selectedRegion.spent)/1e6).toFixed(1)}M</div>
                  <div className="text-sm text-orange-700">{isAr ? 'المتبقي' : 'Remaining Budget'}</div>
                </div>
              </div>

              {/* Utilization Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{isAr ? 'تحليل الاستفادة' : 'Utilization Analysis'}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{isAr ? 'معدل الاستفادة:' : 'Utilization Rate:'}</span>
                    <span className="font-bold">
                      {Math.round((selectedRegion.spent / selectedRegion.allocated) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(selectedRegion.spent / selectedRegion.allocated) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {isAr ? 'الاستفادة' : 'Utilization'}: {Math.round((selectedRegion.spent / selectedRegion.allocated) * 100)}% | 
                    {isAr ? 'المتبقي' : 'Remaining'}: {Math.round(((selectedRegion.allocated - selectedRegion.spent) / selectedRegion.allocated) * 100)}%
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{isAr ? 'تقييم المخاطر' : 'Risk Assessment'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${
                    (selectedRegion.spent / selectedRegion.allocated) > 0.9 ? 'bg-red-50 border border-red-200' :
                    (selectedRegion.spent / selectedRegion.allocated) < 0.5 ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-green-50 border border-green-200'
                  }`}>
                    <div className="text-sm font-semibold mb-2">
                      {(selectedRegion.spent / selectedRegion.allocated) > 0.9 ? 
                        (isAr ? 'تحذير: إنفاق مرتفع' : 'Warning: High Spending') :
                      (selectedRegion.spent / selectedRegion.allocated) < 0.5 ? 
                        (isAr ? 'ملاحظة: إنفاق منخفض' : 'Note: Low Spending') :
                        (isAr ? 'ممتاز: إنفاق مثالي' : 'Excellent: Optimal Spending')}
                    </div>
                    <div className="text-xs text-gray-600">
                      {(selectedRegion.spent / selectedRegion.allocated) > 0.9 ? 
                        (isAr ? 'تجاوزت المنطقة 90% من ميزانيتها المخصصة' : 'Region has exceeded 90% of allocated budget') :
                      (selectedRegion.spent / selectedRegion.allocated) < 0.5 ? 
                        (isAr ? 'لم تستخدم المنطقة سوى أقل من 50% من ميزانيتها' : 'Region has used less than 50% of budget') :
                        (isAr ? 'المنطقة ضمن النطاق المستهدف للإنفاق' : 'Region is within target spending range')}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold mb-2">{isAr ? 'توصيات' : 'Recommendations'}</div>
                    <div className="text-xs text-gray-600">
                      {(selectedRegion.spent / selectedRegion.allocated) > 0.8 ? 
                        (isAr ? 'راجع خطط الإنفاق وحدد الأولويات' : 'Review spending plans and prioritize') :
                      (selectedRegion.spent / selectedRegion.allocated) < 0.3 ? 
                        (isAr ? 'تسريع تنفيذ المشاريع المخططة' : 'Accelerate implementation of planned projects') :
                        (isAr ? 'مواصلة الإنفاق حسب الخطة' : 'Continue spending according to plan')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Budget Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Categories - Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{isAr ? 'الميزانية حسب الفئة' : 'Budget by Category'}</h3>
          <Pie
            data={{
              labels: [isAr ? 'البنية التحتية' : 'Infrastructure', isAr ? 'تراخيص البرمجيات' : 'Software Licenses', isAr ? 'الاستشارات' : 'Consulting', isAr ? 'تكاليف الموظفين' : 'Staff Costs', isAr ? 'التدريب' : 'Training'],
              datasets: [{
                data: [850, 620, 480, 320, 180],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(251, 146, 60, 0.8)',
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(236, 72, 153, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 15,
                    font: { size: 12 }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${isAr ? 'ريال' : 'SAR'} ${context.parsed}${isAr ? 'م' : 'M'}`
                  }
                }
              },
              animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000
              }
            }}
          />
        </motion.div>

        {/* Quarterly Spending Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{isAr ? 'اتجاه الإنفاق ربع السنوي' : 'Quarterly Spending Trend'}</h3>
          <Line
            data={{
              labels: [isAr ? 'الربع 1 2024' : 'Q1 2024', isAr ? 'الربع 2 2024' : 'Q2 2024', isAr ? 'الربع 3 2024' : 'Q3 2024', isAr ? 'الربع 4 2024' : 'Q4 2024'],
              datasets: [
                {
                  label: isAr ? 'المخصص' : 'Allocated',
                  data: [1200, 1350, 1100, 1400],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.4
                },
                {
                  label: isAr ? 'المصروف' : 'Spent',
                  data: [1000, 1180, 950, 1250],
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  tension: 0.4
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    padding: 15,
                    font: { size: 12 }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${isAr ? 'ريال' : 'SAR'} ${context.parsed.y}${isAr ? 'م' : 'M'}`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value}${isAr ? 'م' : 'M'}`
                  }
                }
              },
              animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Budget