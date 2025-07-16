import React, { useState, useEffect } from 'react';
import { Clock, Droplets, Thermometer, User, Activity, ChevronRight, Zap, CheckCircle } from 'lucide-react';

const RecentActivityWidget = () => {
const [currentTime, setCurrentTime] = useState(new Date());
const [hoveredIndex, setHoveredIndex] = useState(null);

useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(timer);
}, []);

const getActivityIcon = (action) => {
if (action.includes('Watered') || action.includes('water')) {
    return <Droplets className="w-5 h-5 text-green-600" />;
} else if (action.includes('Temperature') || action.includes('sensor')) {
    return <Thermometer className="w-5 h-5 text-green-700" />;
} else if (action.includes('Manual')) {
    return <User className="w-5 h-5 text-green-500" />;
} else if (action.includes('Scheduled')) {
    return <CheckCircle className="w-5 h-5 text-green-600" />;
}
return <Activity className="w-5 h-5 text-green-500" />;
};

const getActivityColor = (action) => {
if (action.includes('Watered') || action.includes('water')) {
    return 'from-green-100 to-green-200 border-green-300';
} else if (action.includes('Temperature') || action.includes('sensor')) {
    return 'from-green-200 to-green-300 border-green-400';
} else if (action.includes('Manual')) {
    return 'from-green-50 to-green-100 border-green-200';
} else if (action.includes('Scheduled')) {
    return 'from-green-100 to-green-200 border-green-300';
}
return 'from-green-50 to-green-100 border-green-200';
};

const getTimeAgo = (timeStr) => {
const now = new Date();
const [time, period] = timeStr.split(' ');
const [hours, minutes] = time.split(':');
let hour24 = parseInt(hours);

if (period === 'PM' && hour24 !== 12) hour24 += 12;
if (period === 'AM' && hour24 === 12) hour24 = 0;

const activityTime = new Date(now);
activityTime.setHours(hour24, parseInt(minutes), 0, 0);

const diffMs = now - activityTime;
const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

if (diffHours > 0) {
    return `${diffHours}h ago`;
} else if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
} else {
    return 'Just now';
}
};

const activities = [
{ time: '09:15 AM', action: 'Watered Tomato 2 (Scheduled)', status: 'completed' },
{ time: '08:50 AM', action: 'Manual water for Lettuce', status: 'completed' },
{ time: '07:30 AM', action: 'Temperature sensor updated', status: 'completed' },
{ time: '07:00 AM', action: 'Automated watering cycle started', status: 'completed' },
{ time: '06:45 AM', action: 'System health check passed', status: 'completed' },
];

return (
<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-300/10 to-green-500/10 rounded-full blur-2xl"></div>
    
    {/* Header */}
    <div className="relative z-10 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
            <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500">Live greenhouse monitoring</p>
        </div>
        </div>
        <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-xs text-gray-500">
            {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        </div>
    </div>
    </div>

    {/* Activity Timeline */}
    <div className="relative z-10">
    <div className="space-y-3">
        {activities.map((activity, index) => (
        <div
            key={index}
            className={`group relative transition-all duration-300 transform hover:scale-[1.02] ${
            hoveredIndex === index ? 'z-10' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className={`
            relative p-4 rounded-xl border transition-all duration-300 cursor-pointer
            bg-gradient-to-r ${getActivityColor(activity.action)}
            hover:shadow-lg hover:shadow-green-500/20
            ${hoveredIndex === index ? 'shadow-xl shadow-green-500/30 transform -translate-y-1' : ''}
            `}>
            {/* Timeline dot */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-green-500 shadow-md"></div>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-white/80 rounded-lg shadow-sm">
                    {getActivityIcon(activity.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                    {activity.action}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{activity.time}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{getTimeAgo(activity.time)}</span>
                    </div>
                </div>
                </div>
                
                <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Done</span>
                </div>
                
                <ChevronRight className={`
                    w-4 h-4 text-gray-400 transition-transform duration-300
                    ${hoveredIndex === index ? 'transform translate-x-1' : ''}
                `} />
                </div>
            </div>
            </div>
        </div>
        ))}
    </div>
    
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-green-500 to-green-600 opacity-50"></div>
    </div>

    {/* Footer */}
    <div className="relative z-10 mt-6 pt-4 border-t border-gray-100">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
        <Zap className="w-4 h-4" />
        <span>Live updates enabled</span>
        </div>
        <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200">
        View all activity →
        </button>
    </div>
    </div>
</div>
);
};

export default RecentActivityWidget;