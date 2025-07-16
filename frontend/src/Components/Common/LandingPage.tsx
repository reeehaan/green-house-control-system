import { ThermometerSun, Droplets, Wifi, CheckCircle } from 'lucide-react';

const LandingPage = () => {
return (
<div className="w-screen min-h-screen flex flex-col bg-green-50 text-green-950 mt-16">
    {/* Hero Section */}
    <section className="bg-green-900 text-white py-20 px-6 text-center flex-1">
    <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Smart Greenhouse Monitoring System
        </h1>
        <p className="text-lg text-green-200 mb-8">
        Optimize your crops with real-time insights, intelligent automation, and seamless control.
        </p>
        <div className="flex justify-center gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold">
            Get Started
        </button>
        <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-900 transition">
            Learn More
        </button>
        </div>
    </div>
    </section>

    {/* Features Section */}
    <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
    <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto text-center">
        <div>
        <ThermometerSun className="mx-auto mb-4 text-green-600" size={40} />
        <h3 className="text-xl font-semibold">Real-Time Temperature</h3>
        <p className="text-sm mt-2 text-gray-600">Monitor and respond to temperature changes instantly.</p>
        </div>
        <div>
        <Droplets className="mx-auto mb-4 text-green-600" size={40} />
        <h3 className="text-xl font-semibold">Humidity & Soil Moisture</h3>
        <p className="text-sm mt-2 text-gray-600">Track key moisture levels to avoid over- or under-watering.</p>
        </div>
        <div>
        <Wifi className="mx-auto mb-4 text-green-600" size={40} />
        <h3 className="text-xl font-semibold">Smart IoT Integration</h3>
        <p className="text-sm mt-2 text-gray-600">Remotely control greenhouse systems from anywhere.</p>
        </div>
    </div>
    </section>

    {/* About Section */}
    <section className="py-16 px-6 bg-green-100 flex-1">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
        <img
            src="https://images.unsplash.com/photo-1601049782202-98a0efdc47d4"
            alt="Greenhouse"
            className="rounded-lg shadow-md"
        />
        </div>
        <div>
        <h2 className="text-3xl font-bold mb-4">Why Choose Our System?</h2>
        <ul className="text-gray-700 space-y-3">
            <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500" />
            Maximize yield with optimized climate control.
            </li>
            <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500" />
            Automate irrigation based on real-time soil moisture.
            </li>
            <li className="flex items-start gap-2">
            <CheckCircle className="text-green-500" />
            Get alerts directly to your phone or dashboard.
            </li>
        </ul>
        </div>
    </div>
    </section>

    {/* Call to Action */}
    <section className="py-20 px-6 text-center bg-green-900 text-white">
    <h2 className="text-3xl font-bold mb-4">Ready to grow smarter?</h2>
    <p className="text-green-200 mb-6">
        Start monitoring and optimizing your greenhouse today.
    </p>
    <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-white font-semibold">
        Start Monitoring Now
    </button>
    </section>
</div>
);
};

export default LandingPage;
