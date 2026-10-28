import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const datasets = {
    '6m': [
        { month: 'May', Joiners: 32, Movers: 12, Leavers: 8 },
        { month: 'Jun', Joiners: 45, Movers: 18, Leavers: 10 },
        { month: 'Jul', Joiners: 28, Movers: 10, Leavers: 14 },
        { month: 'Aug', Joiners: 52, Movers: 22, Leavers: 7 },
        { month: 'Sep', Joiners: 44, Movers: 15, Leavers: 11 },
        { month: 'Oct', Joiners: 58, Movers: 24, Leavers: 9 },
    ],
    '12m': [
        { month: 'Nov', Joiners: 25, Movers: 8, Leavers: 5 },
        { month: 'Dec', Joiners: 30, Movers: 10, Leavers: 6 },
        { month: 'Jan', Joiners: 40, Movers: 14, Leavers: 9 },
        { month: 'Feb', Joiners: 35, Movers: 11, Leavers: 8 },
        { month: 'Mar', Joiners: 48, Movers: 20, Leavers: 12 },
        { month: 'Apr', Joiners: 50, Movers: 21, Leavers: 10 },
        { month: 'May', Joiners: 32, Movers: 12, Leavers: 8 },
        { month: 'Jun', Joiners: 45, Movers: 18, Leavers: 10 },
        { month: 'Jul', Joiners: 28, Movers: 10, Leavers: 14 },
        { month: 'Aug', Joiners: 52, Movers: 22, Leavers: 7 },
        { month: 'Sep', Joiners: 44, Movers: 15, Leavers: 11 },
        { month: 'Oct', Joiners: 58, Movers: 24, Leavers: 9 },
    ],
    'ytd': [
        { month: 'Jan', Joiners: 40, Movers: 14, Leavers: 9 },
        { month: 'Feb', Joiners: 35, Movers: 11, Leavers: 8 },
        { month: 'Mar', Joiners: 48, Movers: 20, Leavers: 12 },
        { month: 'Apr', Joiners: 50, Movers: 21, Leavers: 10 },
        { month: 'May', Joiners: 32, Movers: 12, Leavers: 8 },
        { month: 'Jun', Joiners: 45, Movers: 18, Leavers: 10 },
        { month: 'Jul', Joiners: 28, Movers: 10, Leavers: 14 },
        { month: 'Aug', Joiners: 52, Movers: 22, Leavers: 7 },
        { month: 'Sep', Joiners: 44, Movers: 15, Leavers: 11 },
        { month: 'Oct', Joiners: 58, Movers: 24, Leavers: 9 },
    ],
};

export default function JmlChart() {
    const [timeframe, setTimeframe] = useState('6m');
    const [visibleSeries, setVisibleSeries] = useState({
        Joiners: true,
        Movers: true,
        Leavers: true,
    });

    const toggleSeries = (key) => {
        setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0E2F33] text-white p-[12px] rounded-[12px] shadow-lg text-[13px] border border-white/20">
                    <p className="font-[700] mb-[6px] border-b border-white/20 pb-[4px]">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between space-x-4 py-[2px]">
              <span className="flex items-center space-x-2">
                <span className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-slate-200">{entry.name}:</span>
              </span>
                            <span className="font-[700]">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card p-[20px] flex flex-col justify-between min-h-[290px]">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-[12px]">
                <div>
                    <h3 className="text-[16px] font-[700] text-[#0E2F33]">Joiner / Mover / Leaver</h3>
                    <p className="text-[13px] font-[500] text-[#3F5C5F]">Lifecycle events trend analysis</p>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Legend Toggles */}
                    <div className="flex items-center space-x-2 text-[12px] font-[600]">
                        <button
                            onClick={() => toggleSeries('Joiners')}
                            className={`flex items-center space-x-1.5 px-2 py-1 rounded-md transition ${
                                visibleSeries.Joiners ? 'opacity-100' : 'opacity-40 line-through'
                            }`}
                        >
                            <span className="w-2.5 h-2.5 rounded-xs bg-[#147F87]"></span>
                            <span className="text-[#3F5C5F]">Joiners</span>
                        </button>
                        <button
                            onClick={() => toggleSeries('Movers')}
                            className={`flex items-center space-x-1.5 px-2 py-1 rounded-md transition ${
                                visibleSeries.Movers ? 'opacity-100' : 'opacity-40 line-through'
                            }`}
                        >
                            <span className="w-2.5 h-2.5 rounded-xs bg-[#7C6FE0]"></span>
                            <span className="text-[#3F5C5F]">Movers</span>
                        </button>
                        <button
                            onClick={() => toggleSeries('Leavers')}
                            className={`flex items-center space-x-1.5 px-2 py-1 rounded-md transition ${
                                visibleSeries.Leavers ? 'opacity-100' : 'opacity-40 line-through'
                            }`}
                        >
                            <span className="w-2.5 h-2.5 rounded-xs bg-[#D92D20]"></span>
                            <span className="text-[#3F5C5F]">Leavers</span>
                        </button>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="flex bg-white/70 p-1 rounded-[10px] border border-white/90 shadow-2xs text-[12px] font-[600]">
                        {['6m', '12m', 'ytd'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-2.5 py-0.5 rounded-[7px] uppercase transition ${
                                    timeframe === t ? 'bg-[#147F87] text-white shadow-xs' : 'text-[#3F5C5F] hover:bg-slate-100'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart Canvas */}
            <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datasets[timeframe]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 80, 90, 0.12)" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#3F5C5F', fontSize: 12 }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#3F5C5F', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 127, 135, 0.05)' }} />
                        {visibleSeries.Joiners && <Bar dataKey="Joiners" fill="#147F87" radius={[5, 5, 0, 0]} animationDuration={600} />}
                        {visibleSeries.Movers && <Bar dataKey="Movers" fill="#7C6FE0" radius={[5, 5, 0, 0]} animationDuration={600} />}
                        {visibleSeries.Leavers && <Bar dataKey="Leavers" fill="#D92D20" radius={[5, 5, 0, 0]} animationDuration={600} />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}