import React, { useEffect, useState } from 'react';
import * as api from '../../api/sites.js';
import Loader from '../../components/Loader.jsx';

export default function SiteManagement() {
  const [sites, setSites] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setSites(await api.list());
    setQueue(api.reviewQueue);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handlePublish = (id) => {
    api.publish(id);
    load();
  };

  const handleMarkSold = (id) => {
    api.markSold(id);
    load();
  };

  if (loading) return <Loader />;

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
              {sites.map(s => (
                <tr key={s.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.address}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-600">
                      {s.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{s.popular ? '✔️' : '—'}</td>
                  <td className="px-4 py-2">{s.active ? '✔️' : '—'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleMarkSold(s.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm"
                    >
                      Mark Sold
                    </button>
                  </td>
                </tr>
              ))}
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
              {queue.map(s => (
                <tr key={s.id} className="border-b border-skin-base/30">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.address}</td>
                  <td className="px-4 py-2">{s.submittedBy}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePublish(s.id)}
                      className="rounded bg-skin-accent px-3 py-1 text-sm"
                    >
                      Publish
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
