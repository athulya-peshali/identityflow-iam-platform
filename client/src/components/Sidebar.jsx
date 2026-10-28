import Logo from './Logo';
import { LayoutDashboard, Users, FileText, ShieldAlert, ShieldCheck, Settings } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'audit', label: 'Audit Logs', icon: FileText, badge: 3 },
        { id: 'security', label: 'Security', icon: ShieldAlert },
        { id: 'reviews', label: 'Access Reviews', icon: ShieldCheck },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-[248px] glass-sidebar p-[24px_16px] flex flex-col justify-between hidden md:flex shrink-0 h-screen sticky top-0">
            <div>
                {/* Reusable Logo */}
                <Logo />

                {/* Navigation */}
                <nav className="space-y-[6px]">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-[14px] py-[12px] rounded-[14px] text-[15px] font-[600] transition-all duration-200 ${
                                    isActive
                                        ? 'text-white shadow-[0_6px_16px_rgba(20,127,135,0.35)]'
                                        : 'text-[#3F5C5F] hover:bg-white/55'
                                }`}
                                style={
                                    isActive
                                        ? { background: 'linear-gradient(135deg, #147F87, #3797A3)' }
                                        : {}
                                }
                            >
                                <div className="flex items-center space-x-[12px]">
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </div>

                                {item.badge && (
                                    <span className="bg-[#D92D20] text-white text-[11px] font-[700] px-[8px] py-[2px] rounded-[999px]">
                    {item.badge}
                  </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* IAM Core Status Box */}
            <div className="glass-card p-[14px] flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-[800] text-[#3F5C5F] uppercase tracking-wider">IAM CORE</p>
                    <p className="text-[13px] font-[600] text-[#0E2F33] mt-[2px]">Firestore Sync Active</p>
                </div>
                <span className="h-[10px] w-[10px] rounded-full bg-[#12B76A] animate-pulse"></span>
            </div>
        </aside>
    );
}