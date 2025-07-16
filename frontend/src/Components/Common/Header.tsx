import { useState, useEffect, useRef } from 'react';
import { Search, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const [currentTime, setCurrentTime] = useState(new Date());
const [user, setUser] = useState<{ name: string } | null>(null);

const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

const profileRef = useRef<HTMLDivElement>(null);
const settingsRef = useRef<HTMLDivElement>(null);

const navigate = useNavigate();

// Navigation items with labels and paths
const navItems = [
{ label: 'Home', path: '/dashboard' },
{ label: 'Humidity', path: '/humidity' },
{ label: 'Temperature', path: '/temperature' },
{ label: 'Light', path: '/light' },
{ label: 'Soil Moisture', path: '/soil-moisture' },
{ label: 'Water Supply', path: '/water-supply' },
];

useEffect(() => {
const interval = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(interval);
}, []);

useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
    setProfileDropdownOpen(false);
    }
    if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
    setSettingsDropdownOpen(false);
    }
};
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const formatTime = (date: Date) =>
date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

const formatDate = (date: Date) =>
date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const handleLogout = () => {
setUser(null);
setProfileDropdownOpen(false);
setSettingsDropdownOpen(false);
};

const handleLoginRedirect = () => {
navigate('/login');
};

const handleRegisterRedirect = () => {
navigate('/register');
};

return (
<header className="fixed top-0 left-0 w-full bg-green-950 text-white py-4 px-6 flex items-center justify-between shadow-md z-50">
    {/* Navigation */}
    <nav className="flex items-center gap-6 font-medium text-m">
    {navItems.map(({ label, path }, idx) => (
        <button
        key={label}
        onClick={() => navigate(path)}
        className={`hover:text-green-300 transition duration-200 ${
            idx === 0 ? 'font-bold' : ''
        }`}
        >
        {label}
        </button>
    ))}
    </nav>

    {/* Right Controls */}
    <div className="flex items-center gap-6">
    {/* Search Bar */}
    <div className="relative">
        <input
        type="text"
        placeholder="Search..."
        className="bg-green-800 text-white placeholder-gray-300 pl-4 pr-10 py-2 rounded-full focus:outline-none border border-green-700"
        />
        <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-300" />
    </div>

    {!user ? (
        // If no user logged in: show Login & Register buttons
        <>
        <button
            onClick={handleLoginRedirect}
            className="px-4 py-1 rounded border border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 transition"
        >
            Login
        </button>
        <button
            onClick={handleRegisterRedirect}
            className="px-4 py-1 rounded bg-green-600 hover:bg-green-700 transition"
        >
            Register
        </button>
        </>
    ) : (
        // If user logged in: show Profile & Settings icons with dropdowns
        <>
        {/* Profile Icon */}
        <div className="relative" ref={profileRef}>
            <User
            className="w-6 h-6 text-white cursor-pointer hover:text-green-300"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            />
            {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-green-900 rounded shadow-lg z-10 py-2">
                <button
                className="block w-full px-4 py-2 text-left text-white hover:bg-green-700"
                onClick={() => alert('Go to user profile')}
                >
                User Profile
                </button>
                <button
                className="block w-full px-4 py-2 text-left text-white hover:bg-green-700"
                onClick={handleLogout}
                >
                Logout
                </button>
            </div>
            )}
        </div>

        {/* Settings Icon */}
        <div className="relative" ref={settingsRef}>
            <Settings
            className="w-6 h-6 text-white cursor-pointer hover:text-green-300"
            onClick={() => setSettingsDropdownOpen(!settingsDropdownOpen)}
            />
            {settingsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-green-900 rounded shadow-lg z-10 py-2">
                <button
                className="block w-full px-4 py-2 text-left text-white hover:bg-green-700"
                onClick={() => alert('Go to settings')}
                >
                Settings
                </button>
                <button
                className="block w-full px-4 py-2 text-left text-white hover:bg-green-700"
                onClick={handleLogout}
                >
                Logout
                </button>
            </div>
            )}
        </div>

        {/* Time and Date */}
        <div className="text-right leading-tight">
            <div className="text-white text-sm font-semibold">{formatTime(currentTime)}</div>
            <div className="text-green-400 text-xs font-medium">{formatDate(currentTime)}</div>
        </div>
        </>
    )}
    </div>
</header>
);
};

export default Header;
