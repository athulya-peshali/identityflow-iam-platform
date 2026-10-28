import { useEffect, useRef, useState } from 'react';
import { Search, Bell, User, LogOut, Shield, CheckCircle2 } from 'lucide-react';

export default function Header({ searchInput, setSearchInput }) {
    const searchInputRef = useRef(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header className="pt-[28px] pb-[20px] sticky top-0 z-20 backdrop-blur-md bg-white/20 border-b border-white/40">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[28px] font-[800] text-[#0E2F33] leading-tight tracking-tight">
                        IAM Control Dashboard
                    </h1>
                    <p className="text-[13px] font-[500] text-[#3F5C5F] mt-[2px]">
                        Enterprise Lifecycle Management & Automated Provisioning
                    </p>
                </div>

                <div className="flex items-center space-x-[16px]">
                    {/* Search Input */}
                    <div className="relative hidden sm:flex items-center">
                        <Search className="absolute left-[14px] text-[#3F5C5F]" size={18} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search employees, logs, actions…"
                            className="w-[340px] h-[46px] pl-[42px] pr-[60px] glass-card rounded-[14px] text-[14px] text-[#0E2F33] placeholder-[#3F5C5F] focus:outline-none focus:ring-2 focus:ring-[#147F87] transition-all"
                        />
                        <span className="absolute right-[12px] text-[11px] font-[700] text-[#3F5C5F] bg-white/70 px-[6px] py-[2px] rounded-[6px] border border-white/90 shadow-2xs pointer-events-none">
              Ctrl K
            </span>
                    </div>

                    {/* Notifications Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowUserMenu(false);
                            }}
                            aria-label="Notifications"
                            className="w-[46px] h-[46px] glass-card glass-card-interactive rounded-[14px] flex items-center justify-center text-[#3F5C5F] relative shrink-0 cursor-pointer"
                        >
                            <Bell size={20} />
                            <span className="absolute top-[10px] right-[10px] h-[8px] w-[8px] rounded-full bg-[#D92D20] ring-2 ring-white"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 glass-card bg-white/95 p-3 rounded-[16px] shadow-xl border border-white z-50 text-xs space-y-2">
                                <div className="flex justify-between font-bold text-[#0E2F33] border-b pb-2">
                                    <span>Notifications</span>
                                    <span className="text-[#147F87] font-semibold">Mark read</span>
                                </div>
                                <div className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2">
                                    <CheckCircle2 size={16} className="text-[#12B76A] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-[#0E2F33]">Firestore Sync Verified</p>
                                        <p className="text-[11px] text-[#3F5C5F]">All database triggers operational.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Menu Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowUserMenu(!showUserMenu);
                                setShowNotifications(false);
                            }}
                            className="w-[46px] h-[46px] rounded-[14px] bg-[#0F6A72] hover:bg-[#147F87] text-white font-[800] text-[15px] flex items-center justify-center shadow-sm shrink-0 transition cursor-pointer"
                            title="Athulya Herath"
                        >
                            AH
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 glass-card bg-white/95 p-2 rounded-[16px] shadow-xl border border-white z-50 text-xs font-semibold text-[#0E2F33] space-y-1">
                                <div className="px-3 py-2 border-b">
                                    <p className="font-bold text-sm">Athulya Herath</p>
                                    <p className="text-[11px] text-[#3F5C5F]">Administrator</p>
                                </div>
                                <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition">
                                    <User size={14} />
                                    <span>Profile Settings</span>
                                </button>
                                <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition">
                                    <Shield size={14} />
                                    <span>IAM Credentials</span>
                                </button>
                                <button className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 rounded-lg flex items-center space-x-2 transition">
                                    <LogOut size={14} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}