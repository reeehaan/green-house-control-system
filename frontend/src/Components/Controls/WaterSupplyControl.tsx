import React, { useState, useEffect, useRef } from 'react';

type WaterLog = {
  date: string;
  time: string;
  method: 'Manual' | 'Scheduled' | 'Sensor';
};

const WaterSupplyControl: React.FC = () => {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [scheduledTime, setScheduledTime] = useState<string>(''); // "HH:MM"
  const [isWatering, setIsWatering] = useState(false);
  const [timeSent, setTimeSent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate water dispensing
  const dispenseWater = (method: WaterLog['method']) => {
    setIsWatering(true);
    setTimeout(() => {
      const now = new Date();
      const newLog: WaterLog = {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        method,
      };
      setLogs(prev => [newLog, ...prev]);
      setIsWatering(false);
    }, 500);
  };

  // Auto-dispense when scheduled time hits
  useEffect(() => {
    if (!scheduledTime || !timeSent) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5); // "HH:MM"

      if (current === scheduledTime) {
        dispenseWater('Scheduled');
        setScheduledTime('');
        setTimeSent(false);
        clearInterval(timerRef.current!);
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [scheduledTime, timeSent]);

  const handleSendToESP = () => {
    if (!scheduledTime) return;

    // Simulate sending time to ESP32
    console.log(`Sending scheduled time to ESP32: ${scheduledTime}`);
    setTimeSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6 mt-20">
      <h2 className="text-2xl font-semibold text-green-900">Water Supply Control</h2>

      {/* Manual Dispense */}
      <div>
        <button
          disabled={isWatering}
          onClick={() => dispenseWater('Manual')}
          className={`px-6 py-3 rounded font-bold text-white transition ${
            isWatering ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isWatering ? 'Dispensing...' : 'Dispense Water Now'}
        </button>
      </div>

      {/* Schedule and Send */}
      <div className="space-y-2">
        <label htmlFor="schedule" className="block mb-1 font-medium text-gray-700">
          Schedule Water Supply (HH:MM)
        </label>
        <input
          type="time"
          id="schedule"
          value={scheduledTime}
          onChange={e => {
            setScheduledTime(e.target.value);
            setTimeSent(false);
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSendToESP}
          disabled={!scheduledTime || timeSent}
          className={`px-4 py-2 mt-2 rounded text-white font-medium ${
            !scheduledTime || timeSent
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {timeSent ? 'Time Sent to ESP32 ' : 'Send to ESP32'}
        </button>

        {scheduledTime && (
          <p className="text-sm text-gray-600">
            Scheduled to water at <strong>{scheduledTime}</strong> {timeSent && ' (Pending)'}.
          </p>
        )}
      </div>

      {/* Logs Table */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Water Dispense Log</h3>
        {logs.length === 0 ? (
          <p className="text-gray-500">No water supply events yet.</p>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 border-b border-green-300">Date</th>
                  <th className="px-4 py-2 border-b border-green-300">Time</th>
                  <th className="px-4 py-2 border-b border-green-300">Method</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}
                  >
                    <td className="px-4 py-2 border-b border-green-200">{log.date}</td>
                    <td className="px-4 py-2 border-b border-green-200">{log.time}</td>
                    <td className="px-4 py-2 border-b border-green-200 font-medium text-green-700">
                      {log.method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterSupplyControl;
