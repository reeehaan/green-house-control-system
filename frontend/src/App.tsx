import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-8">
            Smart Greenhouse Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sensor-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Temperature</h3>
              <p className="text-3xl font-bold text-sensor-temperature">24°C</p>
              <span className="badge-success">Normal</span>
            </div>
            <div className="sensor-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Humidity</h3>
              <p className="text-3xl font-bold text-sensor-humidity">65%</p>
              <span className="badge-success">Optimal</span>
            </div>
            <div className="sensor-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Light</h3>
              <p className="text-3xl font-bold text-sensor-light">850 lux</p>
              <span className="badge-warning">Low</span>
            </div>
          </div>
          <button className="btn-primary mt-8">
            View Full Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;