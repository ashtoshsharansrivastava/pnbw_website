// src/pages/BrokerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuthStore }               from '../store/useAuthStore.js';
import * as api                       from '../api/brokers.js';
import StatsCard                      from '../components/StatsCard.jsx';
import Loader                         from '../components/Loader.jsx';

export default function BrokerDashboard() {
  // grab the current user (broker) from your store
  const user = useAuthStore((s) => s.user);
  const [stats,    setStats]    = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const s = await api.getBrokerStats(user.id);
      const l = await api.getBrokerListings(user.id);
      setStats(s);
      setListings(l);
    }
    load();
  }, [user]);

  // show loader until stats arrive
  if (!stats) return <Loader />;

  return (
    <section className="mx-auto max-w-[960px] space-y-6">
      <h1 className="text-3xl font-bold">Broker Dashboard</h1>

      {/* Top‐line stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard label="Referrals"      value={stats.referrals} />
        <StatsCard label="Referral Code"  value={stats.code}      />
        <StatsCard label="Profit Earned"  value={`₹${stats.profit}`} />
      </div>

      {/* Listings table */}
      <h2 className="text-2xl font-semibold mt-8">Your Listings</h2>
      <div className="overflow-auto bg-skin-surface rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-skin-base/50">
            <tr>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((p) => (
              <tr key={p.id} className="border-b border-skin-base/30">
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{p.status}</td>
                <td className="px-4 py-2">{p.price}</td>
                <td className="px-4 py-2">{p.address}</td>
                <td className="px-4 py-2">
                  <a
                    href={`/property/${p.id}`}
                    className="text-skin-accent hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
