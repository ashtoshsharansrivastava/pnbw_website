// src/api/brokers.js
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function getBrokerStats(id) {
  const res = await fetch(`${BASE}/brokers/${id}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function getBrokerListings(id) {
  const res = await fetch(`${BASE}/brokers/${id}/listings`);
  if (!res.ok) throw new Error('Failed to fetch listings');
  return res.json();
}

export async function getAllBrokers() {
  const res = await fetch(`${BASE}/brokers`);
  return res.json();
}

export async function approveBroker(id) {
  const res = await fetch(`${BASE}/brokers/${id}/approve`, { method: 'POST' });
  return res.json();
}
