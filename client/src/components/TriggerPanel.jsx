import { useState } from 'react';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';

export default function TriggerPanel({ onHire, onTerminate, isLoading }) {
    const [name, setName] = useState('Alex Smith');
    const [dept, setDept] = useState('Engineering');
    const [role, setRole] = useState('Software Engineer');
    const [selectedSystems, setSelectedSystems] = useState(['Google Workspace', 'Slack', 'GitHub']);

    const availableSystems = ['Google Workspace', 'Slack', 'GitHub', 'AWS', 'Jira'];

    const toggleSystem = (sys) => {
        setSelectedSystems((prev) =>
            prev.includes(sys) ? prev.filter((s) => s !== sys) : [...prev, sys]
        );
    };

    const handleHireSubmit = () => {
        onHire({ name, dept, role, systems: selectedSystems });
    };

    const handleTerminateSubmit = () => {
        onTerminate({ name, dept, role, systems: selectedSystems });
    };

    return (
        <div className="glass-card p-[20px] flex flex-col justify-between min-h-[290px]">
            <div>
                <h3 className="text-[16px] font-[700] text-[#0E2F33]">Lifecycle Triggers</h3>
                <p className="text-[13px] font-[500] text-[#3F5C5F] mt-[2px]">
                    Simulate HR hooks for automated provisioning
                </p>

                {/* Form Inputs */}
                <div className="space-y-2.5 mt-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Employee Name"
                        className="w-full h-[44px] px-3.5 bg-white/70 border border-white/90 rounded-[12px] text-[14px] text-[#0E2F33] focus:outline-none focus:ring-2 focus:ring-[#147F87] transition"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            className="h-[44px] px-3 bg-white/70 border border-white/90 rounded-[12px] text-[14px] text-[#0E2F33] focus:outline-none focus:ring-2 focus:ring-[#147F87] transition"
                        >
                            <option value="Engineering">Engineering</option>
                            <option value="HR">Human Resources</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                        </select>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-[44px] px-3 bg-white/70 border border-white/90 rounded-[12px] text-[14px] text-[#0E2F33] focus:outline-none focus:ring-2 focus:ring-[#147F87] transition"
                        >
                            <option value="Software Engineer">Engineer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                        </select>
                    </div>

                    {/* Multi-select System Chips */}
                    <div>
            <span className="text-[11px] font-[700] text-[#3F5C5F] uppercase tracking-wider block mb-1">
              Target Systems
            </span>
                        <div className="flex flex-wrap gap-1.5">
                            {availableSystems.map((sys) => {
                                const active = selectedSystems.includes(sys);
                                return (
                                    <button
                                        key={sys}
                                        type="button"
                                        onClick={() => toggleSystem(sys)}
                                        className={`px-2.5 py-1 rounded-[999px] text-[11px] font-[700] transition ${
                                            active
                                                ? 'bg-[#147F87] text-white shadow-2xs'
                                                : 'bg-white/60 text-[#3F5C5F] hover:bg-white border border-slate-200/60'
                                        }`}
                                    >
                                        {sys}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 mt-4">
                    <button
                        onClick={handleHireSubmit}
                        disabled={isLoading}
                        className="w-full h-[52px] rounded-[14px] font-[700] text-[14px] text-white flex items-center justify-center space-x-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_18px_rgba(20,127,135,0.35)] cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #147F87, #3797A3)' }}
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                        <span>Hire Employee (Provision)</span>
                    </button>

                    <button
                        onClick={handleTerminateSubmit}
                        disabled={isLoading}
                        className="w-full h-[52px] rounded-[14px] font-[700] text-[14px] bg-[#FEE4E2] hover:bg-[#FECDCA] text-[#B42318] border-[1.5px] border-[#F7B4AE] flex items-center justify-center space-x-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <UserMinus size={18} />}
                        <span>Terminate Employee (Revoke)</span>
                    </button>
                </div>
            </div>

            <p className="text-[11px] text-[#3F5C5F] mt-3">
                <strong>Note:</strong> Revoke asks for confirmation before credentials are removed.
            </p>
        </div>
    );
}