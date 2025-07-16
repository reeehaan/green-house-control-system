import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
const [formData, setFormData] = useState({
username: '',
email: '',
password: '',
});

const [errors, setErrors] = useState({
username: '',
email: '',
password: '',
});

const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(timer);
}, []);

const formatTime = (date: Date) =>
date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

const formatDate = (date: Date) =>
date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const validate = () => {
const newErrors: typeof errors = { username: '', email: '', password: '' };
const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/;

if (!usernameRegex.test(formData.username)) {
    newErrors.username = 'Username must be 3-15 alphanumeric characters.';
}

if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Invalid email format.';
}

if (!passwordRegex.test(formData.password)) {
    newErrors.password =
    'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.';
}

setErrors(newErrors);
return Object.values(newErrors).every((error) => error === '');
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
setErrors({ ...errors, [e.target.name]: '' });
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (validate()) {
    console.log('Registration submitted:', formData);
}
};

return (
<div
    className="bg-gray-100 min-h-screen flex items-center justify-center relative px-4 py-12 mt-20"
>
    {/* Background SVG Shape */}
    <div className="absolute inset-0" style={{ width: '100vw', height: '100vh' }}>
    <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d5a3d" />
            <stop offset="100%" stopColor="#1a3d2e" />
        </linearGradient>
        </defs>
        <path
        d="M0,400 C300,300 400,500 600,400 C800,300 900,500 1200,400 L1200,800 L0,800 Z"
        fill="url(#gradient1)"
        />
    </svg>
    </div>

    {/* Registration Form Card */}
    <div className="relative z-10 bg-gray-100 bg-opacity-95 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">
    {/* Logo */}
    <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            <path d="M12 16C12 16 8 14 8 11C8 8 10 6 12 6S16 8 16 11C16 14 12 16 12 16Z" />
        </svg>
        </div>
    </div>

    {/* Input Fields */}
    <div className="space-y-6">
        <div>
        <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 focus:border-green-500 outline-none text-gray-700 placeholder-gray-500 transition-colors duration-200"
        />
        {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
        <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 focus:border-green-500 outline-none text-gray-700 placeholder-gray-500 transition-colors duration-200"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
        <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 focus:border-green-500 outline-none text-gray-700 placeholder-gray-500 transition-colors duration-200"
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
        <button
            onClick={handleSubmit}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
            SIGN UP
        </button>
        </div>

        {/* Link to Login */}
        <div className="text-center pt-2">
        <button
            type="button"
            className="text-green-600 hover:text-green-700 text-sm underline transition-colors duration-200 bg-transparent border-none cursor-pointer"
            onClick={() => console.log('Navigate to login')}
        >
            Already have an account?
        </button>
        </div>
    </div>
    </div>

    {/* Time & Date */}
    <div className="absolute top-6 right-6 text-right">
    <div className="text-black text-lg font-medium">{formatTime(currentTime)}</div>
    <div className="text-green-400 text-sm">{formatDate(currentTime)}</div>
    </div>
</div>
);
};

export default RegistrationForm;
