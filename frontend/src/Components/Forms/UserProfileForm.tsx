import React, { useState } from 'react';

const UserProfileForm = () => {
const [profile, setProfile] = useState({
fullName: '',
email: '',
phone: '',
location: '',
bio: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
setProfile({
    ...profile,
    [e.target.name]: e.target.value
});
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
console.log('User Profile Updated:', profile);
};

return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-6">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-6">
    {/* Header */}
    <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700">🌱 Edit Profile</h2>
        <p className="text-sm text-green-600">Update your personal details for your greenhouse account</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
        <label className="block text-sm text-green-800 mb-1">Full Name</label>
        <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        </div>

        <div>
        <label className="block text-sm text-green-800 mb-1">Email Address</label>
        <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        </div>

        <div>
        <label className="block text-sm text-green-800 mb-1">Phone Number</label>
        <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+94 77 123 4567"
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        </div>

        <div>
        <label className="block text-sm text-green-800 mb-1">Location</label>
        <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Colombo, Sri Lanka"
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        </div>

        <div>
        <label className="block text-sm text-green-800 mb-1">About You</label>
        <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your gardening passion..."
            className="w-full px-4 py-3 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        </div>

        <button
        type="submit"
        className="w-full py-3 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
        >
        Save Profile
        </button>
    </form>
    </div>
</div>
);
};

export default UserProfileForm;
