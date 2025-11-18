function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">691 users across 158 government entities</p>
        </div>
        <button className="bg-dga-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
          + Add User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { role: 'DGA Admins', count: 51, color: 'bg-red-500' },
          { role: 'Regional Managers', count: 75, color: 'bg-blue-500' },
          { role: 'Program Directors', count: 150, color: 'bg-green-500' },
          { role: 'Financial Controllers', count: 100, color: 'bg-yellow-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-2xl">👤</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.role}</p>
          </div>
        ))}
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Users</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Roles</option>
              <option>DGA Admin</option>
              <option>Regional Manager</option>
              <option>Program Director</option>
              <option>Financial Controller</option>
              <option>Compliance Auditor</option>
              <option>Analytics Lead</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'Ahmed Al-Rashid', email: 'ahmed.rashid@moh.gov.sa', entity: 'Ministry of Health', role: 'Program Director', region: 'Central', status: 'Active' },
                { name: 'Fatima Al-Otaibi', email: 'f.otaibi@sdaia.gov.sa', entity: 'SDAIA', role: 'DGA Admin', region: 'Central', status: 'Active' },
                { name: 'Mohammed Al-Ghamdi', email: 'm.ghamdi@mol.gov.sa', entity: 'Ministry of Labor', role: 'Regional Manager', region: 'Western', status: 'Active' },
                { name: 'Sarah Al-Harbi', email: 's.harbi@moe.gov.sa', entity: 'Ministry of Education', role: 'Financial Controller', region: 'Central', status: 'Active' },
                { name: 'Khalid Al-Zahrani', email: 'k.zahrani@neom.sa', entity: 'NEOM Authority', role: 'Program Director', region: 'Northern', status: 'Active' },
              ].map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.entity}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.region}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-800 font-semibold text-sm">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
