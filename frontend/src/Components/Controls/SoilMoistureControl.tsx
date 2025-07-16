import React, { useEffect, useState } from 'react';
import {
LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

type MoistureDataPoint = {
time: string;
moisture: number;
};

type Plant = {
id: string;
name: string;
moisture: number;
history: MoistureDataPoint[];
};

const generateRandomMoisture = (prev: number) =>
Math.min(Math.max(prev + (Math.random() * 10 - 5), 0), 100);

const SoilDashboard: React.FC = () => {
const [plants, setPlants] = useState<Plant[]>([
{ id: 'p1', name: 'Tomato 1', moisture: 50, history: [] },
{ id: 'p2', name: 'Tomato 2', moisture: 60, history: [] },
{ id: 'p3', name: 'Tomato 3', moisture: 40, history: [] },
]);

useEffect(() => {
const interval = setInterval(() => {
    const now = new Date().toLocaleTimeString();

    setPlants(prevPlants =>
    prevPlants.map(p => {
        const newMoisture = generateRandomMoisture(p.moisture);
        const updatedHistory = [...p.history, { time: now, moisture: +newMoisture.toFixed(1) }];
        return {
        ...p,
        moisture: newMoisture,
        history: updatedHistory.length > 20 ? updatedHistory.slice(-20) : updatedHistory,
        };
    })
    );
}, 8000);

return () => clearInterval(interval);
}, []);

const getStatus = (moisture: number) => {
if (moisture < 30) return { label: 'Dry', color: 'bg-red-100 text-red-700' };
if (moisture > 70) return { label: 'Wet', color: 'bg-blue-100 text-blue-700' };
return { label: 'Optimal', color: 'bg-green-100 text-green-700' };
};

return (
<div className="p-8 space-y-10">
    <h1 className="text-2xl font-bold text-green-800 mb-6">Multi-Plant Soil Moisture Monitor</h1>

    {/* Display each plant vertically */}
    {plants.map(plant => {
    const { label, color } = getStatus(plant.moisture);
    const radius = 45;
    const stroke = 8;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (plant.moisture / 100) * circumference;

    return (
        <div key={plant.id} className="bg-white shadow p-6 rounded-lg space-y-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800">{plant.name}</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-8">
            {/* Circular Moisture Meter */}
            <div className="relative w-28 h-28">
            <svg width="100%" height="100%" viewBox="0 0 120 120">
                <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={stroke}
                fill="none"
                />
                <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#10b981"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                />
                <text
                x="60"
                y="65"
                textAnchor="middle"
                fontSize="16"
                fill="#065f46"
                fontWeight="bold"
                >
                {plant.moisture.toFixed(1)}%
                </text>
            </svg>
            <div className={`absolute top-full mt-2 w-full text-center text-sm py-1 rounded ${color}`}>
                {label}
            </div>
            </div>

            {/* Moisture Chart */}
            <div className="flex-1 min-w-0">
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
                <ResponsiveContainer>
                <LineChart data={plant.history} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                    dataKey="time"
                    textAnchor="end"
                    interval={3}
                    height={60}
                    label={{
                        value: 'Time',
                        position: 'insideBottom',
                        offset: -30,
                        fill: '#4b5563',
                        fontSize: 15,
                    }}
                    />
                    <YAxis
                    domain={[0, 100]}
                    label={{
                        value: 'Soil Moisture (%)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 10,
                        fill: '#4b5563',
                        fontSize: 15,
                    }}
                    />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>
            </div>
        </div>
        </div>
    );
    })}
</div>
);
};

export default SoilDashboard;
