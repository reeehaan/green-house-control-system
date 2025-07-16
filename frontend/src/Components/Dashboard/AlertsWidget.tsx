import React, { useState } from 'react';
import { AlertTriangle, Info, CheckCircle, X, Bell, Clock, Zap, Filter } from 'lucide-react';

type Alert = {
id: number;
message: string;
type: 'warning' | 'info' | 'success';
time?: string;
priority?: 'high' | 'medium' | 'low';
dismissed?: boolean;
};

const AlertWidget = () => {
const [alerts, setAlerts] = useState<Alert[]>([
{ id: 1, message: 'Soil moisture low for Tomato 1', type: 'warning', time: '09:15 AM', priority: 'high' },
{ id: 2, message: 'Water scheduled at 06:30 AM', type: 'info', time: 'Yesterday', priority: 'medium' },
{ id: 3, message: 'Water dispensed successfully', type: 'success', time: 'Today, 7:00 AM', priority: 'low' },
{ id: 4, message: 'Temperature sensor reading unstable', type: 'warning', time: '08:30 AM', priority: 'medium' },
{ id: 5, message: 'Automated watering cycle completed', type: 'success', time: '07:45 AM', priority: 'low' },
]);

const [filter, setFilter] = useState<'all' | 'warning' | 'info' | 'success'>('all');
const [animatingAlert, setAnimatingAlert] = useState<number | null>(null);

const dismissAlert = (id: number) => {
setAnimatingAlert(id);
setTimeout(() => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setAnimatingAlert(null);
}, 300);
};

const getAlertConfig = (type: Alert['type'], priority: Alert['priority']) => {
const configs = {
    warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    shadowColor: 'shadow-yellow-500/20',
    pulseColor: 'bg-yellow-400',
    },
    info: {
    icon: <Info className="w-5 h-5" />,
    gradient: 'from-green-400 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    shadowColor: 'shadow-green-500/20',
    pulseColor: 'bg-green-400',
    },
    success: {
    icon: <CheckCircle className="w-5 h-5" />,
    gradient: 'from-green-500 to-green-700',
    bgGradient: 'from-green-50 to-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    shadowColor: 'shadow-green-500/20',
    pulseColor: 'bg-green-400',
    },
};
return configs[type];
};

const getPriorityIndicator = (priority: Alert['priority']) => {
switch (priority) {
    case 'high':
    return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>;
    case 'medium':
    return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
    case 'low':
    return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
    default:
    return null;
}
};

const getTimeAgo = (timeStr: string) => {
if (timeStr.includes('Today')) return timeStr;
if (timeStr.includes('Yesterday')) return timeStr;

// Simple time ago calculation for demo
const now = new Date();
const [time, period] = timeStr.split(' ');
const [hours, minutes] = time.split(':');
let hour24 = parseInt(hours);

if (period === 'PM' && hour24 !== 12) hour24 += 12;
if (period === 'AM' && hour24 === 12) hour24 = 0;

const diffHours = now.getHours() - hour24;
if (diffHours > 0) {
    return `${diffHours}h ago`;
}
return 'Just now';
};

const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.type === filter);
const alertCounts = {
warning: alerts.filter(a => a.type === 'warning').length,
info: alerts.filter(a => a.type === 'info').length,
success: alerts.filter(a => a.type === 'success').length,
};

return (
<div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-300/10 to-green-500/10 rounded-full blur-2xl"></div>
    
    {/* Header */}
    <div className="relative z-10 mb-6">
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
            <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
            <p className="text-sm text-gray-500">Real-time monitoring status</p>
        </div>
        </div>
        
        <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full text-sm font-medium text-green-700">
            <Zap className="w-4 h-4" />
            <span>{alerts.length} active</span>
        </div>
        </div>
    </div>

    {/* Filter tabs */}
    <div className="flex items-center gap-2 bg-green-50 p-1 rounded-xl">
        <button
        onClick={() => setFilter('all')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === 'all' 
            ? 'bg-white shadow-sm text-green-900' 
            : 'text-green-600 hover:text-green-900'
        }`}
        >
        All ({alerts.length})
        </button>
        <button
        onClick={() => setFilter('warning')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
            filter === 'warning' 
            ? 'bg-white shadow-sm text-yellow-700' 
            : 'text-green-600 hover:text-yellow-700'
        }`}
        >
        <AlertTriangle className="w-4 h-4" />
        Warnings ({alertCounts.warning})
        </button>
        <button
        onClick={() => setFilter('info')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
            filter === 'info' 
            ? 'bg-white shadow-sm text-green-700' 
            : 'text-green-600 hover:text-green-700'
        }`}
        >
        <Info className="w-4 h-4" />
        Info ({alertCounts.info})
        </button>
        <button
        onClick={() => setFilter('success')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
            filter === 'success' 
            ? 'bg-white shadow-sm text-green-700' 
            : 'text-green-600 hover:text-green-700'
        }`}
        >
        <CheckCircle className="w-4 h-4" />
        Success ({alertCounts.success})
        </button>
    </div>
    </div>

    {/* Alerts list */}
    <div className="relative z-10 space-y-3 max-h-80 overflow-y-auto pr-2">
    {filteredAlerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
        <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-lg font-medium">No alerts found</p>
        <p className="text-sm">All systems are running smoothly</p>
        </div>
    ) : (
        filteredAlerts.map(alert => {
        const config = getAlertConfig(alert.type, alert.priority);
        const isAnimating = animatingAlert === alert.id;
        
        return (
            <div
            key={alert.id}
            className={`
                group relative transition-all duration-300 transform
                ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                hover:scale-[1.02] hover:shadow-lg
            `}
            >
            <div className={`
                relative p-4 rounded-xl border transition-all duration-300
                bg-gradient-to-r ${config.bgGradient} ${config.borderColor}
                hover:shadow-md ${config.shadowColor}
            `}>
                {/* Priority indicator */}
                <div className="absolute top-2 right-2 flex items-center gap-2">
                {getPriorityIndicator(alert.priority)}
                <button
                    onClick={() => dismissAlert(alert.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/50 rounded-full"
                >
                    <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </button>
                </div>

                <div className="flex items-start gap-3 pr-8">
                {/* Icon with gradient */}
                <div className={`
                    p-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white shadow-sm
                    ${alert.priority === 'high' ? 'animate-pulse' : ''}
                `}>
                    {config.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className={`font-medium ${config.textColor} mb-1`}>
                    {alert.message}
                    </div>
                    
                    {alert.time && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{alert.time}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{getTimeAgo(alert.time)}</span>
                    </div>
                    )}
                </div>
                </div>

                {/* Subtle glow effect for high priority */}
                {alert.priority === 'high' && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
                )}
            </div>
            </div>
        );
        })
    )}
    </div>

    {/* Footer */}
    <div className="relative z-10 mt-6 pt-4 border-t border-gray-100">
    <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">High</span>
        </div>
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Medium</span>
        </div>
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Low</span>
        </div>
        </div>
    </div>
    </div>
</div>
);
};

export default AlertWidget;