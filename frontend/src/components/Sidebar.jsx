import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiDatabase, 
  FiBox, 
  FiDollarSign, 
  FiBarChart2, 
  FiUsers 
} from 'react-icons/fi'

function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/entities', label: 'Entities', icon: FiDatabase },
    { path: '/programs', label: 'Programs', icon: FiBox },
    { path: '/budget', label: 'Budget', icon: FiDollarSign },
    { path: '/reports', label: 'Reports', icon: FiBarChart2 },
    { path: '/users', label: 'Users', icon: FiUsers },
  ]

  return (
    <aside className="w-64 bg-dga-navy text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-dga-green">🏛️</span>
          DGA Platform
        </h1>
        <p className="text-sm text-gray-400 mt-1">Digital Government Authority</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-dga-green text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p>© 2025 DGA</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
