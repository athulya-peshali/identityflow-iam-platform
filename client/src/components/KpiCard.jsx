import { ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function KpiCard({
                                    label,
                                    value,
                                    chipText,
                                    chipType = 'success',
                                    icon: Icon,
                                    iconBg,
                                    iconColor,
                                    sparkData,
                                    sparkColor,
                                    isProgress = false,
                                    progressVal = 0,
                                    onClick,
                                    staggerIndex = 0,
                                }) {
    const chipStyles = {
        success: 'bg-[#D1FADF] text-[#05603A]',
        warning: 'bg-[#FEF0C7] text-[#93370D]',
        danger: 'bg-[#FEE4E2] text-[#B42318]',
        purple: 'bg-[#E4E1FF] text-[#3B2FA0]',
    };

    return (
        <div
            onClick={onClick}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            onKeyDown={(e) => onClick && e.key === 'Enter' && onClick()}
            className={`glass-card p-[20px] flex flex-col justify-between transition-all duration-300 ${
                onClick
                    ? 'cursor-pointer glass-card-interactive focus:outline-none focus:ring-2 focus:ring-[#147F87]'
                    : ''
            }`}
            style={{
                animation: `fadeRise 300ms ease-out ${staggerIndex * 60}ms both`,
            }}
        >
            <div>
                <div className="flex items-center justify-between">
                    <span className="text-[14px] font-[600] text-[#3F5C5F]">{label}</span>
                    <div
                        className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: iconBg, color: iconColor }}
                    >
                        <Icon size={20} strokeWidth={2.2} />
                    </div>
                </div>

                <div className="text-[36px] font-[800] text-[#0E2F33] leading-none mt-[8px] tracking-tight">
                    {value}
                </div>

                <div className="mt-[8px]">
          <span className={`inline-block px-[10px] py-[3px] rounded-[999px] text-[12px] font-[700] ${chipStyles[chipType]}`}>
            {chipText}
          </span>
                </div>
            </div>

            <div className="mt-[14px]">
                {isProgress ? (
                    <div className="w-full bg-slate-200/80 h-[8px] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                                width: `${progressVal}%`,
                                background: 'linear-gradient(135deg, #147F87, #3797A3)',
                            }}
                        />
                    </div>
                ) : sparkData && sparkData.length > 0 ? (
                    <div className="h-[40px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                                <defs>
                                    <linearGradient id={`sparkGrad-${label.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={sparkColor} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={sparkColor} stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="v"
                                    stroke={sparkColor}
                                    strokeWidth={2}
                                    fill={`url(#sparkGrad-${label.replace(/\s+/g, '')})`}
                                    isAnimationActive={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : null}
            </div>
        </div>
    );
}