import { Download, Terminal } from 'lucide-react';

export default function AuditLog({ events = [] }) {
    const exportCSV = () => {
        if (events.length === 0) return;
        const headers = 'Timestamp,Message,Type\n';
        const rows = events.map((ev) => `"${ev.time}","${ev.msg}","${ev.type}"`).join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `identityflow_audit_log_${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getTagStyle = (type) => {
        switch (type) {
            case 'HIRED':
                return 'bg-[#134E48] text-[#5EEAD4] border-b border-[#147F87]';
            case 'EMAIL':
                return 'bg-[#1D3A5C] text-[#9CC7FF] border-b border-blue-500/40';
            case 'REVOKED':
                return 'bg-[#5C1D1D] text-[#FDA29B] border-b border-[#D92D20]/40';
            case 'WARNING':
                return 'bg-[#5C3F10] text-[#FEC84B] border-b border-[#DC6803]/40';
            default:
                return 'bg-slate-800 text-slate-300';
        }
    };

    return (
        <div className="rounded-[20px] p-[20px] bg-[#0C1826] text-white shadow-xl border border-slate-800/80 flex flex-col justify-between">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-[14px]">
                <div className="flex items-center space-x-2.5">
                    <Terminal size={20} className="text-[#5EEAD4]" />
                    <h3 className="text-[16px] font-[700] text-white tracking-tight">
                        Real-time Webhook Audit Log
                    </h3>
                </div>

                <div className="flex items-center space-x-3">
          <span className="flex items-center text-[12px] font-[700] text-[#6CE9A6] bg-[#12372F] px-[12px] py-[4px] rounded-[999px] border border-[#12B76A]/30">
            <span className="h-[7px] w-[7px] rounded-full bg-[#6CE9A6] animate-pulse mr-2"></span>
            Live Listening
          </span>

                    <button
                        onClick={exportCSV}
                        disabled={events.length === 0}
                        className="flex items-center space-x-1.5 text-[12px] font-[700] text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-[12px] py-[5px] rounded-[8px] border border-slate-700 transition disabled:opacity-40 cursor-pointer"
                    >
                        <Download size={14} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Log Output Stream */}
            <div className="bg-[#070E17] rounded-[14px] p-[16px] font-mono text-[13px] border border-slate-800/90 max-h-[280px] overflow-y-auto space-y-[8px]">
                {events.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 font-sans text-[13px]">
                        Waiting for events… Trigger a lifecycle action to see live logs.
                    </div>
                ) : (
                    events.slice(0, 50).map((ev, i) => (
                        <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-slate-800/40 last:border-0 gap-1 sm:gap-4"
                        >
                            <div className="flex items-start sm:items-center space-x-3 min-w-0">
                                <span className="text-[#5EEAD4] font-[600] shrink-0">{ev.time}</span>
                                <span className="text-slate-200 truncate">{ev.msg}</span>
                            </div>
                            <span
                                className={`px-[8px] py-[2px] rounded-[6px] text-[11px] font-[700] tracking-wider shrink-0 self-start sm:self-auto ${getTagStyle(
                                    ev.type
                                )}`}
                            >
                {ev.type}
              </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}