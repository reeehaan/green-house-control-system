import React, { useState, useEffect } from 'react';
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
} from 'recharts';

type LightDataPoint = {
time: string;
lux: number;
};

const MAX_LUX = 40000; // Updated max for tomatoes
const MIN_LUX = 20000;
const OPTIMAL_LUX_LOW = 25000;
const OPTIMAL_LUX_HIGH = 35000;

const LightControl: React.FC = () => {
const [lux, setLux] = useState(26000); // Initial in optimal range
const [data, setData] = useState<LightDataPoint[]>([]);
const [roofClosed, setRoofClosed] = useState(false);

useEffect(() => {
const interval = setInterval(() => {
    const now = new Date();
    const variation = Math.random() * 4000 - 2000; // ±2000 variation
    const newLux = Math.min(Math.max(lux + variation, 0), MAX_LUX);

    const newDataPoint: LightDataPoint = {
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    lux: Math.round(newLux),
    };

    setLux(newLux);
    setData((prev) => {
    const updated = [...prev, newDataPoint];
    return updated.length > 20 ? updated.slice(updated.length - 20) : updated;
    });
}, 500);

return () => clearInterval(interval);
}, [lux]);

const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setLux(Number(e.target.value));
};

const toggleRoof = () => setRoofClosed((prev) => !prev);

const radius = 70;
const stroke = 10;
const normalizedRadius = radius - stroke * 0.5;
const circumference = normalizedRadius * 2 * Math.PI;
const progress = (lux / MAX_LUX) * circumference;
const percentage = Math.round((lux / MAX_LUX) * 100);

    const getStatusDetails = () => {
    if (lux < MIN_LUX) {
        return {
        label: 'Too Low',
        color: 'bg-red-100 text-red-700 border-red-300',
        };
    }
    if (lux >= OPTIMAL_LUX_LOW && lux <= OPTIMAL_LUX_HIGH) {
        return {
        label: 'Optimal',
        color: 'bg-green-100 text-green-700 border-green-300',
        };
    }
    if (lux > OPTIMAL_LUX_HIGH) {
        return {
        label: 'Too High',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        };
    }
    return {
        label: 'Moderate',
        color: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    };

return (
<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20 mb-20">
    <h2 className="text-2xl font-semibold mb-6 text-green-900">
    Light Control System
    </h2>

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
    {/* Lux Meter */}
    <div className="flex flex-col items-center">
        <svg height={radius * 2} width={radius * 2}>
        <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
        />
        <circle
            stroke="#22c55e"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
        <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="24"
            fill="#16a34a"
            fontWeight="bold"
        >
            {percentage}%
        </text>
        </svg>
        <div className="mt-2 text-gray-700 font-medium">Light Level</div>
        <div className="text-sm mt-1 text-gray-500">
        {/* Light Status Box */}
            <div className={`mt-3 px-4 py-1 rounded-full border text-sm font-semibold ${getStatusDetails().color}`}>
            Light Status: {getStatusDetails().label}
            </div>
        </div>
    </div>

    {/* Slider Control */}
    <div className="flex flex-col flex-grow max-w-xl">
        <label htmlFor="luxRange" className="mb-2 font-medium text-gray-700">
        Adjust Light Intensity (Lux): {Math.round(lux)}
        </label>
        <input
        id="luxRange"
        type="range"
        min={0}
        max={MAX_LUX}
        value={lux}
        onChange={handleSliderChange}
        className="w-full h-4 bg-green-200 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: '#22c55e' }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
        <span>0</span>
        <span>{MAX_LUX}</span>
        </div>
    </div>

    {/* Roof Control */}
    <div className="flex flex-col items-center min-w-[140px]">
        <button
        onClick={toggleRoof}
        className={`px-6 py-2 rounded font-semibold transition ${
            roofClosed ? 'bg-gray-700 text-white' : 'bg-yellow-400 text-gray-900'
        } hover:opacity-90`}
        >
        {roofClosed ? 'Open Roof' : 'Close Roof'}
        </button>
        <div className="mt-2 text-gray-600 text-center">
        Roof is currently <strong>{roofClosed ? 'Closed' : 'Open'}</strong>
        </div>
    </div>
    </div>

    {/* Lux Graph */}
    <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
        <LineChart data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" minTickGap={20} />
        <YAxis domain={[0, MAX_LUX]} />
        <Tooltip />
        <Line
            type="monotone"
            dataKey="lux"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
        />
        </LineChart>
    </ResponsiveContainer>
    </div>
</div>
);
};

export default LightControl;
