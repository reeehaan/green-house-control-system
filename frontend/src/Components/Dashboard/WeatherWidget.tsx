import React, { useEffect, useState } from 'react';
import { Sun, Cloud, Droplet, Wind, CloudFog, MapPin, Eye, Thermometer, Gauge, Calendar, Clock } from 'lucide-react';

type HourlyData = {
time: string[];
temperature_2m: number[];
weathercode?: number[];
relative_humidity_2m?: number[];
wind_speed_10m?: number[];
visibility?: number[];
};

type DailyData = {
time: string[];
temperature_2m_max: number[];
temperature_2m_min: number[];
weathercode: number[];
};

type WeatherData = {
hourly: HourlyData;
daily: DailyData;
current: {
temperature_2m: number;
relative_humidity_2m: number;
wind_speed_10m: number;
weathercode: number;
};
};

const weatherCodeToIcon = (code: number, size = "w-8 h-8") => {
const iconProps = { className: `${size}` };

switch (code) {
case 0:
    return <Sun {...iconProps} className={`${size} text-yellow-400`} title="Clear sky" />;
case 1:
case 2:
case 3:
    return <Cloud {...iconProps} className={`${size} text-gray-300`} title="Partly cloudy" />;
case 45:
case 48:
    return <CloudFog {...iconProps} className={`${size} text-gray-400`} title="Fog" />;
case 51:
case 53:
case 55:
    return <Droplet {...iconProps} className={`${size} text-blue-400`} title="Drizzle" />;
case 61:
case 63:
case 65:
    return <Droplet {...iconProps} className={`${size} text-blue-500`} title="Rain" />;
case 71:
case 73:
case 75:
    return <Cloud {...iconProps} className={`${size} text-gray-500`} title="Snow" />;
case 80:
case 81:
case 82:
    return <Droplet {...iconProps} className={`${size} text-blue-400`} title="Rain showers" />;
case 95:
case 96:
case 99:
    return <Cloud {...iconProps} className={`${size} text-gray-600`} title="Thunderstorm" />;
default:
    return <Cloud {...iconProps} className={`${size} text-gray-400`} title="Unknown" />;
}
};

const getWeatherDescription = (code: number) => {
switch (code) {
case 0: return "Clear sky";
case 1: return "Mainly clear";
case 2: return "Partly cloudy";
case 3: return "Overcast";
case 45: case 48: return "Fog";
case 51: case 53: case 55: return "Drizzle";
case 61: case 63: case 65: return "Rain";
case 71: case 73: case 75: return "Snow";
case 80: case 81: case 82: return "Rain showers";
case 95: case 96: case 99: return "Thunderstorm";
default: return "Unknown";
}
};

const WeatherDisplay: React.FC = () => {
const [loading, setLoading] = useState(true);
const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
const [error, setError] = useState<string | null>(null);
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(timer);
}, []);

useEffect(() => {
const fetchWeather = async () => {
    try {
    const lat = 6.846866130361198;
    const lon = 79.94116972339397;

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode&timezone=auto`);
    
    if (!response.ok) throw new Error('Failed to fetch weather data');
    
    const data = await response.json();
    setWeatherData(data);
    } catch (err) {
    setError('Failed to load weather data.');
    console.error(err);
    } finally {
    setLoading(false);
    }
};

fetchWeather();
}, []);

if (loading) {
return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-900 to-green-950 flex items-center justify-center rounded-2xl">
    <div className="text-white text-xl flex items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        Loading weather data...
    </div>
    </div>
);
}

if (error) {
return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-red-900 flex items-center justify-center rounded-2xl" >
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Weather Unavailable</h2>
        <p>{error}</p>
    </div>
    </div>
);
}

if (!weatherData) return null;

const { hourly, daily, current } = weatherData;

// Current weather
const currentWeather = {
temp: current.temperature_2m,
humidity: current.relative_humidity_2m,
windSpeed: current.wind_speed_10m,
weatherCode: current.weathercode,
description: getWeatherDescription(current.weathercode)
};

// Next 24 hours
const next24Hours = hourly.time.slice(0, 24).map((timeStr, idx) => {
const date = new Date(timeStr);
const hour = date.getHours();
const temp = hourly.temperature_2m[idx];
const code = hourly.weathercode ? hourly.weathercode[idx] : 0;
return { hour, temp, code, isNow: idx === 0 };
});

// Next 7 days
const next7Days = daily.time.slice(0, 7).map((timeStr, idx) => {
const date = new Date(timeStr);
const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
const maxTemp = daily.temperature_2m_max[idx];
const minTemp = daily.temperature_2m_min[idx];
const code = daily.weathercode[idx];
return { dayName, maxTemp, minTemp, code, isToday: idx === 0 };
});

return (
<div className="min-h-screen bg-gradient-to-br from-green-900 via-green-900 to-green-950 p-4 rounded-2xl">
    <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
        <MapPin className="w-5 h-5" />
        <span className="text-lg">Negombo, Western Province</span>
        </div>
        <div className="text-white/60 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        </div>
    </div>

    {/* Current Weather Card */}
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            {weatherCodeToIcon(currentWeather.weatherCode, "w-24 h-24")}
            <div>
            <div className="text-6xl font-light text-white mb-2">
                {currentWeather.temp.toFixed(1)}°C
            </div>
            <div className="text-xl text-white/80 capitalize">
                {currentWeather.description}
            </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                <Droplet className="w-4 h-4" />
                <span className="text-sm">Humidity</span>
            </div>
            <div className="text-2xl font-semibold text-white">{currentWeather.humidity}%</div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                <Wind className="w-4 h-4" />
                <span className="text-sm">Wind</span>
            </div>
            <div className="text-2xl font-semibold text-white">{currentWeather.windSpeed.toFixed(1)} km/h</div>
            </div>
        </div>
        </div>
    </div>

    {/* Hourly Forecast */}
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        24-Hour Forecast
        </h3>
        <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
            {next24Hours.map(({ hour, temp, code, isNow }, idx) => (
            <div
                key={idx}
                className={`flex-none w-20 text-center p-3 rounded-xl transition-all ${
                isNow 
                    ? 'bg-white/20 border-2 border-white/40' 
                    : 'bg-white/10 hover:bg-white/15'
                }`}
            >
                <div className="text-white/70 text-sm mb-2">
                {isNow ? 'Now' : `${hour}:00`}
                </div>
                <div className="flex justify-center mb-2">
                {weatherCodeToIcon(code, "w-6 h-6")}
                </div>
                <div className="text-white font-semibold">
                {temp.toFixed(0)}°
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>

    {/* 7-Day Forecast */}
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        7-Day Forecast
        </h3>
        <div className="space-y-3">
        {next7Days.map(({ dayName, maxTemp, minTemp, code, isToday }, idx) => (
            <div
            key={idx}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                isToday 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            >
            <div className="flex items-center gap-4">
                <div className="w-16 text-white font-medium">
                {isToday ? 'Today' : dayName}
                </div>
                <div className="flex items-center gap-3">
                {weatherCodeToIcon(code, "w-8 h-8")}
                <div className="text-white/80 text-sm">
                    {getWeatherDescription(code)}
                </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="text-white/60 text-sm">
                {minTemp.toFixed(0)}°
                </div>
                <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
                    style={{ width: `${((maxTemp - minTemp) / 20) * 100}%` }}
                ></div>
                </div>
                <div className="text-white font-semibold">
                {maxTemp.toFixed(0)}°
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
    </div>
</div>
);
};

export default WeatherDisplay;