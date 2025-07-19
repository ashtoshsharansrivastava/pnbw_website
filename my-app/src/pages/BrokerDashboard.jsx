// src/pages/BrokerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import * as api from '../api/brokers.js';
import StatsCard from '../components/StatsCard.jsx';
import Loader from '../components/Loader.jsx';

export default function BrokerDashboard() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('BrokerDashboard user:', user);
    if (!user?.id) {
      // if there's no user ID yet, keep loading until store hydrates
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const [s, l] = await Promise.all([
          api.getBrokerStats(user.id),
          api.getBrokerListings(user.id)
        ]);
        console.log('Fetched stats:', s);
        console.log('Fetched listings:', l);
        setStats(s);
        setListings(l);
      } catch (err) {
        console.error('Error loading broker dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  // While we’re waiting for user → stats → listings
  if (loading) return <Loader />;

  // If we got here but stats is still null something went wrong
  if (!stats) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-[960px] space-y-6">
      <h1 className="text-3xl font-bold">Broker Dashboard</h1>

      {/* Top‐line stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard label="Referrals"     value={stats.referrals ?? '–'} />
        <StatsCard label="Referral Code" value={stats.code      ?? '–'} />
        <StatsCard label="Profit Earned" value={stats.profit    != null ? `₹${stats.profit}` : '–'} />
      </div>

      {/* Listings table */}
      <div>
        <h2 className="text-2xl font-semibold mt-8">Your Listings</h2>
        {listings.length > 0 ? (
          <div className="overflow-auto bg-skin-surface rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-skin-base/50">
                <tr>
                  <th className="px-4 py-2">Property</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((p) => (
                  <tr key={p.id} className="border-b border-skin-base/30">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">₹{p.price}</td>
                    <td className="px-4 py-2">{p.status}</td>
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
        ) : (
          <p className="p-4 text-center">You have no active listings.</p>
        )}
      </div>
    </section>
  );
}
