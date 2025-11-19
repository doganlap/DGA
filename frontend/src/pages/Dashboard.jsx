import { useState, useEffect } from 'react'
import { reportingAPI, dgaDataAPI } from '../api'
import { FiActivity, FiDollarSign, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function Dashboard() {
  const [overview, setOverview] = useState(null)
  const [kpis, setKpis] = useState([])
  const [complianceRecords, setComplianceRecords] = useState([])
  const [risks, setRisks] = useState([])
  const [maturityScores, setMaturityScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      console.log('Loading dashboard data...');
      
      // Load data sequentially to avoid rate limiting
      const overviewRes = await reportingAPI.getNationalOverview();
      console.log('Overview data:', overviewRes.data);
      setOverview(overviewRes.data.data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const kpisRes = await dgaDataAPI.getAllKPIs();
      console.log('KPIs data:', kpisRes.data);
      setKpis(kpisRes.data.data || []);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const complianceRes = await dgaDataAPI.getComplianceRecords();
      console.log('Compliance data:', complianceRes.data);
      setComplianceRecords(complianceRes.data.data || []);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const risksRes = await dgaDataAPI.getRisks();
      console.log('Risks data:', risksRes.data);
      setRisks(risksRes.data.data || []);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const maturityRes = await dgaDataAPI.getDigitalMaturityScores();
      console.log('Maturity data:', maturityRes.data);
      setMaturityScores(maturityRes.data.data || []);
      
      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      console.error('Error details:', error.response?.data, error.message);
      
      // Set mock data for demo purposes
      setOverview({
        totalEntities: 35,
        activePrograms: 158,
        totalBudget: 5200000000,
        avgCompletion: 87
      });
      setKpis([
        { kpi_name: 'Digital Adoption Rate', current_value: '85%', target_value: '90%' },
        { kpi_name: 'System Uptime', current_value: '99.2%', target_value: '99.5%' },
        { kpi_name: 'User Satisfaction', current_value: '92%', target_value: '95%' }
      ]);
      setComplianceRecords([
        { standard_name: 'NCA ECC', status: 'Compliant' },
        { standard_name: 'PDPL', status: 'Compliant' },
        { standard_name: 'ISO 27001', status: 'In Progress' }
      ]);
      setRisks([
        { risk_description: 'Cybersecurity threat', severity: 'High', status: 'Mitigated' },
        { risk_description: 'Budget overrun', severity: 'Medium', status: 'Open' },
        { risk_description: 'Timeline delay', severity: 'Low', status: 'Closed' }
      ]);
      setMaturityScores([
        { maturity_level: 'Advanced', score: 95 },
        { maturity_level: 'Intermediate', score: 75 },
        { maturity_level: 'Basic', score: 45 }
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const avgKpiAchievement = kpis.length
    ? Math.round(
        kpis
          .map(k => parseInt(String(k.current_value || '0').replace('%', '')) || 0)
          .reduce((a, b) => a + b, 0) / kpis.length
      )
    : 0

  const complianceRate = complianceRecords.length
    ? Math.round(
        (complianceRecords.filter(r => String(r.status).toLowerCase() === 'compliant').length / complianceRecords.length) * 100
      )
    : 0

  const riskCounts = ['High', 'Medium', 'Low'].map(level =>
    risks.filter(r => r.severity === level).length
  )

  const maturityCounts = ['Advanced', 'Intermediate', 'Basic'].map(level =>
    maturityScores.filter(s => s.maturity_level === level).length
  )

  const stats = [
    {
      label: 'إجمالي الجهات',
      value: overview?.totalEntities || 0,
      icon: FiActivity,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      label: 'البرامج النشطة',
      value: overview?.activePrograms || 0,
      icon: FiCheckCircle,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      label: 'إجمالي الميزانية',
      value: `${((overview?.totalBudget || 0) / 1000000000).toFixed(2)} مليار ريال سعودي`,
      icon: FiDollarSign,
      color: 'bg-yellow-500',
      trend: '+15%'
    },
    {
      label: 'متوسط تحقيق مؤشرات الأداء',
      value: `${avgKpiAchievement}%`,
      icon: FiTrendingUp,
      color: 'bg-purple-500',
      trend: '+2%'
    },
    {
      label: 'معدل الامتثال العام',
      value: `${complianceRate}%`,
      icon: FiCheckCircle,
      color: 'bg-teal-500',
      trend: '+1%'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-l from-blue-100 to-blue-50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">عرض مراقبة مؤتمتة</h2>
        <p className="text-blue-700 mb-4">تعرض هذه اللوحة متابعة ذاتية لبرامج التحول الرقمي الوطنية، مع مؤشرات الأداء في الوقت الفعلي، ومراقبة الامتثال، وتوزيع المخاطر، ورؤى النضج الرقمي.</p>
        <ul className="list-disc pl-6 text-blue-700">
          <li>تنسيق عبر {overview?.totalEntities || 0} جهة</li>
          <li>سير عمل ذاتي لـ {overview?.activePrograms || 0} برنامج</li>
          <li>متوسط تحقيق المؤشرات {avgKpiAchievement}%</li>
          <li>معدل الامتثال {complianceRate}%</li>
          <li>توزيع المخاطر: عالية {riskCounts[0]}، متوسطة {riskCounts[1]}، منخفضة {riskCounts[2]}</li>
          <li>مستويات النضج: متقدم {maturityCounts[0]}، متوسط {maturityCounts[1]}، أساسي {maturityCounts[2]}</li>
        </ul>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">نظرة عامة وطنية</h1>
        <p className="text-gray-600 mt-1">لوحة تحكم التحول الرقمي في المملكة العربية السعودية</p>
      </div>

      {/* Stats Grid with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-3xl font-bold text-gray-900 mt-2"
                >
                  {stat.value}
                </motion.p>
                <p className="text-green-600 text-sm mt-2">{stat.trend} from last month</p>
              </div>
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className={`${stat.color} p-4 rounded-lg`}
              >
                <stat.icon className="text-white text-2xl" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution - Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">التوزيع الإقليمي</h3>
          <Doughnut
            data={{
              labels: ['المنطقة الوسطى (الرياض)', 'المنطقة الغربية (جدة)', 'المنطقة الشرقية (الدمام)', 'المنطقة الشمالية (تبوك)', 'المنطقة الجنوبية (أبها)'],
              datasets: [{
                data: [42, 38, 28, 24, 26],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(251, 146, 60, 0.8)',
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                  'rgb(59, 130, 246)',
                  'rgb(16, 185, 129)',
                  'rgb(251, 146, 60)',
                  'rgb(139, 92, 246)',
                  'rgb(236, 72, 153)'
                ],
                borderWidth: 2
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
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
                    label: (context) => `${context.label}: ${context.parsed} جهة`
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

        {/* Program Status - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">حالة البرامج</h3>
          <Bar
            data={{
              labels: ['تخطيط', 'قيد التنفيذ', 'مكتمل', 'معلّق'],
              datasets: [{
                label: 'عدد البرامج',
                data: [24, 89, 45, 13],
                backgroundColor: [
                  'rgba(234, 179, 8, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(156, 163, 175, 0.8)'
                ],
                borderColor: [
                  'rgb(234, 179, 8)',
                  'rgb(59, 130, 246)',
                  'rgb(34, 197, 94)',
                  'rgb(156, 163, 175)'
                ],
                borderWidth: 2,
                borderRadius: 8
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.parsed.y} برنامج`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 20
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">توزيع المخاطر</h3>
          <Bar
            data={{
              labels: ['عالية', 'متوسطة', 'منخفضة'],
              datasets: [{
                label: 'المخاطر',
                data: riskCounts,
                backgroundColor: [
                  'rgba(239, 68, 68, 0.8)',
                  'rgba(234, 179, 8, 0.8)',
                  'rgba(34, 197, 94, 0.8)'
                ],
                borderColor: [
                  'rgb(239, 68, 68)',
                  'rgb(234, 179, 8)',
                  'rgb(34, 197, 94)'
                ],
                borderWidth: 2,
                borderRadius: 8
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
              animation: { duration: 2000, easing: 'easeInOutQuart' }
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">مستويات النضج</h3>
          <Doughnut
            data={{
              labels: ['متقدم', 'متوسط', 'أساسي'],
              datasets: [{
                data: maturityCounts,
                backgroundColor: [
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(251, 146, 60, 0.8)'
                ],
                borderColor: [
                  'rgb(16, 185, 129)',
                  'rgb(59, 130, 246)',
                  'rgb(251, 146, 60)'
                ],
                borderWidth: 2
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { position: 'bottom', labels: { padding: 15, font: { size: 12 } } }
              },
              animation: { animateScale: true, animateRotate: true, duration: 2000 }
            }}
          />
        </motion.div>
      </div>

      {/* Budget Trend - Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">اتجاه تخصيص الميزانية (2024-2026)</h3>
        <Line
          data={{
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
            datasets: [
              {
                label: 'الميزانية المخصصة (ملايين الريال)',
                data: [620, 680, 710, 780, 850, 920, 980, 1040],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
              },
              {
                label: 'الميزانية المصروفة (ملايين الريال)',
                data: [580, 640, 670, 720, 790, 850, 900, 950],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  padding: 20,
                  font: { size: 13 }
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `${value}م`
                }
              }
            },
            animation: {
              duration: 2500,
              easing: 'easeInOutCubic'
            }
          }}
        />
      </motion.div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">النشاط الأخير</h3>
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
