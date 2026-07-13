import { useState, useEffect } from 'react';
import { dashboardStats, initialProjects, clientsData, invoicesData } from './mockData';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [projects, setProjects] = useState(initialProjects);

  // Sync dark mode state with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Kanban logic to move projects to the next stage
  const moveProject = (projectId, currentStatus) => {
    const statusFlow = ['To Do', 'In Progress', 'Review', 'Done'];
    const nextStatusIndex = statusFlow.indexOf(currentStatus) + 1;
    
    if (nextStatusIndex < statusFlow.length) {
      const nextStatus = statusFlow[nextStatusIndex];
      setProjects(projects.map(p => p.id === projectId ? { ...p, status: nextStatus } : p));
    }
  };

  const navItems = ['Dashboard', 'Kanban Board', 'Clients', 'Invoices'];
  const kanbanColumns = ['To Do', 'In Progress', 'Review', 'Done'];

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-r border-gray-200 dark:border-slate-700/50 p-6 flex-shrink-0">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Tracker
            </h1>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 shadow-sm transition-shadow hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer text-gray-900 dark:text-gray-100"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => setCurrentView(item)}
                className={`text-left px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                  currentView === item 
                    ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]' 
                    : 'bg-gray-100 dark:bg-slate-800 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] text-gray-800 dark:text-gray-200'
                } block w-full`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-700">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Ranjeet Vishwakarma</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Freelance Developer</p>
          <button className="w-full py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white transition-shadow hover:shadow-[0_0_15px_rgba(37,99,235,0.7)] cursor-pointer">
            + New Project
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentView}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentView === 'Dashboard' ? 'Welcome back, here is your project status.' : `Manage your ${currentView.toLowerCase()} here.`}
          </p>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {currentView === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{stat.value}</p>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${
                  stat.isPositive === true ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' : 
                  stat.isPositive === false ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400' : 
                  'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
                }`}>
                  {stat.trend}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 2. KANBAN BOARD VIEW */}
        {currentView === 'Kanban Board' && (
          <div className="flex gap-6 h-[calc(100vh-200px)] overflow-x-auto pb-4">
            {kanbanColumns.map(column => (
              <div key={column} className="flex-1 min-w-[280px] bg-gray-100/50 dark:bg-slate-800/30 rounded-2xl p-4 border border-gray-200 dark:border-slate-700/50">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4 px-2">{column}</h3>
                <div className="flex flex-col gap-4">
                  {projects.filter(p => p.status === column).map(project => (
                    <div key={project.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">{project.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Due: {project.dueDate}</span>
                      </div>
                      {/* Action button permanently visible, hover changes shadow only */}
                      {column !== 'Done' && (
                        <button 
                          onClick={() => moveProject(project.id, project.status)}
                          className="mt-4 w-full py-2 bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-400 rounded-lg text-sm font-semibold transition-shadow hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] cursor-pointer border border-blue-100 dark:border-slate-600"
                        >
                          Move Forward →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CLIENTS VIEW */}
        {currentView === 'Clients' && (
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-750/50 border-b border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300">
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Active Projects</th>
                  <th className="p-4 font-medium">Total Billed</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 dark:border-slate-700/50 transition-shadow hover:shadow-[0_0_10px_rgba(168,85,247,0.15)] bg-transparent">
                    <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{client.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{client.email}</td>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{client.activeProjects}</td>
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{client.totalBilled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. INVOICES VIEW */}
        {currentView === 'Invoices' && (
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-750/50 border-b border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300">
                  <th className="p-4 font-medium">Invoice ID</th>
                  <th className="p-4 font-medium">Client</th>
                  <th className="p-4 font-medium">Date Issued</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoicesData.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 dark:border-slate-700/50 transition-shadow hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] bg-transparent">
                    <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{invoice.id}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{invoice.client}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{invoice.date}</td>
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{invoice.amount}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800' : 
                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800' : 
                        'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;