import React, { useState } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, Settings, 
  Search, Bell, Plus, Menu, X, Rocket
} from 'lucide-react';
import { MOCK_PROJECTS, RECENT_ACTIVITY, CURRENT_USER } from '../constants';
import ProjectCard from './ProjectCard';
import ActivityChart from './ActivityChart';
import AIAssistant from './AIAssistant';
import { ViewState } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewState>(ViewState.DASHBOARD);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const NavItem = ({ icon: Icon, label, tab }: { icon: any, label: string, tab: ViewState }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
        activeTab === tab 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              WorkspaceHQ
            </span>
          </div>

          <nav className="space-y-2 flex-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" tab={ViewState.DASHBOARD} />
            <NavItem icon={FolderKanban} label="Projects" tab={ViewState.PROJECTS} />
            <NavItem icon={Users} label="Team" tab={ViewState.SETTINGS} />
            <NavItem icon={Settings} label="Settings" tab={ViewState.SETTINGS} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <img src={CURRENT_USER.avatar} alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 truncate">{CURRENT_USER.name}</p>
                <p className="text-xs text-slate-500 truncate">{CURRENT_USER.role}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full mt-4 py-2 px-4 text-sm text-slate-500 hover:text-red-600 transition-colors text-center"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTab === ViewState.DASHBOARD ? 'Dashboard' : 
               activeTab === ViewState.PROJECTS ? 'All Projects' : 'Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm w-64 transition-all outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Stats Row */}
            {activeTab === ViewState.DASHBOARD && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Projects</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-slate-900">{MOCK_PROJECTS.length}</h3>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+2 this week</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Avg. Completion</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-slate-900">
                        {Math.round(MOCK_PROJECTS.reduce((acc, curr) => acc + curr.progress, 0) / MOCK_PROJECTS.length)}%
                      </h3>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">On track</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Upcoming Deadlines</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-slate-900">2</h3>
                      <span className="text-xs font-medium text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">Due soon</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Chart Section */}
                  <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-slate-900">Weekly Productivity</h3>
                      <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 text-slate-600 focus:ring-0">
                        <option>This Week</option>
                        <option>Last Week</option>
                      </select>
                    </div>
                    <ActivityChart />
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                      {RECENT_ACTIVITY.map(activity => (
                        <div key={activity.id} className="flex gap-3">
                          <img src={activity.user.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                          <div>
                            <p className="text-sm text-slate-800">
                              <span className="font-medium">{activity.user.name}</span> {activity.action} <span className="font-medium text-indigo-600">{activity.target}</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 text-sm text-indigo-600 font-medium hover:text-indigo-700">View all history</button>
                  </div>
                </div>
              </>
            )}

            {/* Projects Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {activeTab === ViewState.PROJECTS ? 'All Projects' : 'Active Projects'}
                </h2>
                {activeTab === ViewState.DASHBOARD && (
                  <button 
                    onClick={() => setActiveTab(ViewState.PROJECTS)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeTab === ViewState.PROJECTS 
                  ? MOCK_PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)
                  : MOCK_PROJECTS.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)
                }
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Dashboard;