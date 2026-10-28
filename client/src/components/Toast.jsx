import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export default function Toast({ toasts, setToasts }) {
    useEffect(() => {
        if (toasts.length === 0) return;

        const timer = setTimeout(() => {
            setToasts((prev) => prev.slice(1));
        }, 4000);

        return () => clearTimeout(timer);
    }, [toasts, setToasts]);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="fixed top-5 right-5 z-50 space-y-2.5 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => {
                const isSuccess = toast.type === 'success';
                return (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto p-[14px] rounded-[14px] border shadow-lg backdrop-blur-md flex items-start justify-between space-x-3 transition-all duration-300 transform translate-y-0 ${
                            isSuccess
                                ? 'bg-[#D1FADF]/90 border-[#6CE9A6] text-[#05603A]'
                                : 'bg-[#FEE4E2]/90 border-[#F7B4AE] text-[#B42318]'
                        }`}
                    >
                        <div className="flex items-start space-x-2.5">
                            {isSuccess ? (
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                            ) : (
                                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                            )}
                            <div>
                                <p className="text-[13px] font-[700] leading-tight">{toast.title}</p>
                                <p className="text-[12px] opacity-90 mt-0.5">{toast.message}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="opacity-60 hover:opacity-100 transition shrink-0"
                            aria-label="Close notification"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}