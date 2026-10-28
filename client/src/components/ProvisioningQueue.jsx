import { useState } from 'react';
import { RotateCw, CheckCircle2, AlertCircle, Clock, Database } from 'lucide-react';

export default function ProvisioningQueue({ onRetry }) {
    const [queue, setQueue] = useState([
        { id: '1', employee: 'Nimal Perera', action: 'Provision', system: 'Google Workspace', status: 'Success' },
        { id: '2', employee: 'Sanduni Silva', action: 'Revoke', system: 'Slack', status: 'Pending' },
        { id: '3', employee: 'Kasun Fernando', action: 'Provision', system: 'GitHub', status: 'Failed' },
    ]);

    const handleRetryJob = (id, employee) => {
        setQueue((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'Pending' } : item))
        );
        if (onRetry) onRetry(employee);
    };

    return (
        <div className="glass-card p-[20px] flex flex-col justify-between min-h-[250px]">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[16px] font-[700] text-[#0E2F33]">Provisioning Queue</h3>
                    <button className="text-[13px] font-[700] text-[#147F87] hover:underline cursor-pointer">
                        View all
                    </button>
                </div>

                {queue.length === 0 ? (
                    <div className="py-10 text-center text-[#3F5C5F] text-[13px] flex flex-col items-center justify-center space-y-2">
                        <CheckCircle2 size={32} className="text-[#12B76A] opacity-80" />
                        <p className="font-[600]">No pending actions. Everything is up to date.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[14px]">
                            <thead>
                            <tr className="border-b border-[#0F505A]/12 text-[12px] font-[700] text-[#3F5C5F] uppercase tracking-[0.4px]">
                                <th className="py-2.5 px-1">Employee</th>
                                <th className="py-2.5 px-2">Action</th>
                                <th className="py-2.5 px-2">System</th>
                                <th className="py-2.5 px-2">Status</th>
                                <th className="py-2.5 px-1 text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#0F505A]/12">
                            {queue.map((row) => (
                                <tr key={row.id} className="hover:bg-white/40 transition-colors">
                                    <td className="py-[12px] px-1 font-[700] text-[#0E2F33]">{row.employee}</td>
                                    <td className="py-[12px] px-2 text-[#3F5C5F] font-[500]">{row.action}</td>
                                    <td className="py-[12px] px-2 text-[#3F5C5F] font-[500]">{row.system}</td>
                                    <td className="py-[12px] px-2">
                                        {row.status === 'Success' && (
                                            <span className="inline-flex items-center space-x-1 px-[10px] py-[3px] rounded-[999px] text-[12px] font-[700] bg-[#D1FADF] text-[#05603A]">
                          <CheckCircle2 size={13} />
                          <span>Success</span>
                        </span>
                                        )}
                                        {row.status === 'Pending' && (
                                            <span className="inline-flex items-center space-x-1 px-[10px] py-[3px] rounded-[999px] text-[12px] font-[700] bg-[#FEF0C7] text-[#93370D]">
                          <Clock size={13} />
                          <span>Pending</span>
                        </span>
                                        )}
                                        {row.status === 'Failed' && (
                                            <span className="inline-flex items-center space-x-1 px-[10px] py-[3px] rounded-[999px] text-[12px] font-[700] bg-[#FEE4E2] text-[#B42318]">
                          <AlertCircle size={13} />
                          <span>Failed</span>
                        </span>
                                        )}
                                    </td>
                                    <td className="py-[12px] px-1 text-right">
                                        {row.status === 'Failed' && (
                                            <button
                                                onClick={() => handleRetryJob(row.id, row.employee)}
                                                className="text-[13px] font-[700] text-[#147F87] hover:text-[#0F6A72] flex items-center justify-end space-x-1 ml-auto transition cursor-pointer"
                                            >
                                                <RotateCw size={13} />
                                                <span>Retry</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}