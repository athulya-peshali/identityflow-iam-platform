import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, employeeName, targetSystems }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="glass-card p-6 max-w-md w-full shadow-2xl space-y-4 bg-white/90 border border-white"
            >
                <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-[#3F5C5F] hover:bg-slate-100 transition"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div>
                    <h3 id="modal-title" className="text-lg font-bold text-[#0E2F33]">
                        Revoke Access for {employeeName}?
                    </h3>
                    <p className="text-xs text-[#3F5C5F] mt-1 leading-relaxed">
                        This operation will trigger revocation across active target systems. Access to the following platforms will be immediately disabled:
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 py-1">
                    {targetSystems.map((sys) => (
                        <span key={sys} className="px-2.5 py-1 bg-slate-100 text-[#0E2F33] border border-slate-200 text-xs font-semibold rounded-lg">
              {sys}
            </span>
                    ))}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 h-[44px] rounded-[14px] border border-slate-200 bg-white hover:bg-slate-50 text-[#0E2F33] font-semibold text-xs transition focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[44px] rounded-[14px] bg-[#D92D20] hover:bg-[#B42318] text-white font-semibold text-xs transition shadow-md shadow-[#D92D20]/20 focus:outline-none focus:ring-2 focus:ring-[#D92D20]"
                    >
                        Revoke Access
                    </button>
                </div>
            </div>
        </div>
    );
}