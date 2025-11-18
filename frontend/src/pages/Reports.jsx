function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Digital Transformation KPIs and Compliance Reports</p>
      </div>

      {/* Quick Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="text-lg font-bold text-gray-900">Performance Dashboard</h3>
          <p className="text-gray-600 text-sm mt-2">Real-time KPI tracking across all government entities</p>
          <div className="mt-4 text-primary-600 font-semibold">View Report →</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="text-lg font-bold text-gray-900">Budget Utilization</h3>
          <p className="text-gray-600 text-sm mt-2">SAR 2.48B digital transformation fund analysis</p>
          <div className="mt-4 text-primary-600 font-semibold">View Report →</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-gray-900">Compliance Audit</h3>
          <p className="text-gray-600 text-sm mt-2">NCA ECC & PDPL compliance status reports</p>
          <div className="mt-4 text-primary-600 font-semibold">View Report →</div>
        </div>
      </div>

      {/* Report Categories */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Reports</h2>
        <div className="space-y-4">
          {[
            { category: 'Executive Summary', count: 12, desc: 'High-level overview for leadership' },
            { category: 'Program Progress', count: 171, desc: 'Detailed status of all digital programs' },
            { category: 'Regional Performance', count: 5, desc: 'Regional comparison and insights' },
            { category: 'Ministry Reports', count: 158, desc: 'Individual entity performance metrics' },
            { category: 'Vision 2030 Alignment', count: 8, desc: 'Strategic objective tracking' },
            { category: 'Risk & Issues Log', count: 43, desc: 'Active risks and mitigation plans' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{report.category}</h4>
                <p className="text-sm text-gray-600 mt-1">{report.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {report.count} reports
                </span>
                <button className="text-primary-600 font-semibold">Generate →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports
