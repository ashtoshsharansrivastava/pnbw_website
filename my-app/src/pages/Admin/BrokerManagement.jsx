import React, { useEffect, useState } from 'react';
import * as api from '../../api/brokers.js';
import Loader from '../../components/Loader.jsx';

export default function BrokerManagement() {
  const [brokers, setBrokers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const all = await api.all();
    setBrokers(all);
    setQueue(api.queue);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = (id) => {
    api.approve(id);
    load();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Broker Management</h1>

      {/* Active Brokers */}
      <div>
        <p className="mb-2 text-sm text-[#90aecb]">
          Active Brokers: {brokers.filter(b => b.status === 'active').length}
        </p>
        <div className="overflow-auto bg-skin-surface rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-skin-base/50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Referrals</th>
                <th className="px-4 py-2">Sites</th>
              </tr>
            </thead>
            <tbody>
              {brokers.map(b => (
                <tr key={b.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{b.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${b.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{b.phone}</td>
                  <td className="px-4 py-2">{b.referrals}</td>
                  <td className="px-4 py-2">{b.sites}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interested Brokers Queue */}
      <div>
        <h2 className="text-2xl font-semibold">Interested Brokers</h2>
        <div className="overflow-auto bg-skin-surface rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-skin-base/50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Accept</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(b => (
                <tr key={b.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{b.name}</td>
                  <td className="px-4 py-2">{b.phone}</td>
                  <td className="px-4 py-2">{b.location}</td>
                  <td className="px-4 py-2">{b.experience}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleApprove(b.id)}
                      className="rounded bg-skin-accent px-3 py-1 text-sm"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
);
}
