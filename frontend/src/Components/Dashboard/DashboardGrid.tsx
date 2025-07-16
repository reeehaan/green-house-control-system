
import AlertWidget from './AlertsWidget';
import WeatherWidget from './WeatherWidget';
import RecentActivityWidget from './RecentActivity';

const Dashboard = () => {
return (
<div className="min-h-screen bg-gray-50 p-6 mt-20">
    {/* Header */}
    <div className="mb-8 text-center">
    <h1 className="text-3xl font-bold text-gray-800">
        🌱 Greenhouse Dashboard
    </h1>
    </div>

    {/* Main Grid Container */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* Top Row: Recent Activity & Alerts */}
    {/* Recent Activity - takes up 2/3 on large screens */}
    <div className="lg:col-span-2">
        <RecentActivityWidget />
    </div>

    {/* Alerts - takes up 1/3 on large screens */}
    <div className="lg:col-span-1">
        <AlertWidget />
    </div>

    {/* Bottom Row: Weather Widget Full Width */}
    <div className="lg:col-span-3">
        <WeatherWidget />
    </div>
    </div>
</div>
);
};

export default Dashboard;