// src/pages/Admin/SiteManagement.jsx
import React, { useState, useEffect } from 'react';
import * as api from '../../api/sites.js';
import { sites as mockSites, reviewQueue as mockQueue } from '../../data/frontend.js';

export default function SiteManagement() {
  // start immediately with your mocks
  const [sites, setSites] = useState(mockSites || []);
  const [queue, setQueue] = useState(mockQueue || []);

  // sanity‐check: print them once
  useEffect(() => {
    console.log('mockSites:', mockSites);
    console.log('mockQueue:', mockQueue);
  }, []);

  const handlePublish = (id) => {
    api.publish(id);
    setQueue(q => q.filter(s => s.id !== id));
    const published = queue.find(s => s.id === id);
    if (published) {
      setSites(s => [...s, { ...published, published: true, active: true }]);
    }
  };

  const handleMarkSold = (id) => {
    api.markSold(id);
    setSites(s => s.map(site => site.id === id ? { ...site, active: false } : site));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Site Management</h1>

      {/* All Sites */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Sites</h2>
        <div className="overflow-auto bg-skin-surface rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-skin-base/50">
              <tr>
                <th className="px-4 py-2">Site Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Popular</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Mark Sold</th>
              </tr>
            </thead>
            <tbody>
              {sites.length > 0 ? sites.map(s => (
                <tr key={s.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.address}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        s.published ? 'bg-green-600' : 'bg-yellow-500'
                      }`}
                    >
                      {s.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{s.popular ? '✔️' : '—'}</td>
                  <td className="px-4 py-2">{s.active ? '✔️' : '—'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleMarkSold(s.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 transition"
                    >
                      Mark Sold
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="p-4 text-center">No sites to display</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Review */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Sites Pending Review</h2>
        <div className="overflow-auto bg-skin-surface rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-skin-base/50">
              <tr>
                <th className="px-4 py-2">Site Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Submitted By</th>
                <th className="px-4 py-2">Publish</th>
              </tr>
            </thead>
            <tbody>
              {queue.length > 0 ? queue.map(s => (
                <tr key={s.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.address}</td>
                  <td className="px-4 py-2">{s.submittedBy}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePublish(s.id)}
                      className="rounded bg-skin-accent px-3 py-1 text-sm text-white hover:opacity-90 transition"
                    >
                      Publish
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-4 text-center">No pending sites</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
