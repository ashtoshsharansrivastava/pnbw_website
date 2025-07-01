import React from 'react';

export default function Services() {
  const services = [
    { title: 'Buy', desc: 'Curated property matchmaking' },
    { title: 'Rent', desc: 'Verified rentals with zero brokerage' },
    { title: 'Sell', desc: '3D tours & digital marketing pack' },
    { title: 'Mortgage', desc: 'Partner bank pre-approvals' },
    { title: 'Find an Agent', desc: 'Top-rated brokers near you' },
  ];

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-4xl font-bold">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => (
          <div key={s.title} className="p-6 bg-skin-surface rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
            <p className="text-lg leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
