export default function Logo() {
    return (
        <div className="flex items-center space-x-[10px] mb-[28px]">
            {/* 38x38 Shield Icon Box */}
            <div
                className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #147F87, #3797A3)' }}
            >
                <svg
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
                </svg>
            </div>

            {/* Wordmark Text */}
            <span className="text-[20px] font-[800] text-[#0F6A72] tracking-tight">
        IdentityFlow
      </span>
        </div>
    );
}