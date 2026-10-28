import { ChevronRight } from 'lucide-react';

export default function SecurityAlerts({ onAlertClick }) {
    const alerts = [
        {
            id: 'orphaned',
            count: 4,
            title: 'Orphaned accounts after termination',
            bg: 'bg-[#FEE4E2]',
            text: 'text-[#B42318]',
            border: 'border-[#F7B4AE]',
        },
        {
            id: 'dormant',
            count: 11,
            title: 'Dormant accounts (90+ days)',
            bg: 'bg-[#FEF0C7]',
            text: 'text-[#93370D]',
            border: 'border-[#FEDF89]',
        },
        {
            id: 'privileged',
            count: 7,
            title: 'Privileged accounts to review',
            bg: 'bg-[#E4E1FF]',
            text: 'text-[#3B2FA0]',
            border: 'border-[#C7C2FF]',
        },
    ];

    return (
        <div className="glass-card p-[20px] flex flex-col justify-between min-h-[250px]">
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-[16px] font-[700] text-[#0E2F33]">Security Alerts</h3>
                        <p className="text-[13px] font-[500] text-[#3F5C5F]">Needs review</p>
                    </div>
                    <span className="text-[11px] font-[600] text-[#3F5C5F]">Last checked 2 mins ago</span>
                </div>

                <div className="space-y-[10px] mt-3.5">
                    {alerts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onAlertClick && onAlertClick(item.id)}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => e.key === 'Enter' && onAlertClick && onAlertClick(item.id)}
                            className={`p-[12px] rounded-[12px] ${item.bg} border ${item.border} flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-[#147F87]`}
                        >
                            <div className="flex items-center space-x-3">
                <span className={`text-[20px] font-[800] ${item.text} min-w-[24px]`}>
                  {item.count}
                </span>
                                <span className="text-[13px] font-[700] text-[#0E2F33] leading-snug">
                  {item.title}
                </span>
                            </div>
                            <ChevronRight size={18} className={`${item.text} shrink-0 opacity-80`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}