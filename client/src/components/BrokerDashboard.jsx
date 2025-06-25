import React, { useState, useEffect } from 'react';
import api from '../api';

export default function BrokerDashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get('/broker/dashboard').then(res => setLeads(res.data));
  }, []);

  return (
    <section id="broker-section">
      <h2>Broker Dashboard</h2>
      <ul className="lead-list">
        {leads.map(lead => (
          <li key={lead._id}>
            {lead.userName} enquired about <strong>{lead.propertyTitle}</strong> on{' '}
            {new Date(lead.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  );
}
