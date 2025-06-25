import React, { useState } from 'react';
import api from '../api';

export default function InternForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', resumeUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/interns', form);
    setSubmitted(true);
  };

  if (submitted) {
    return <p>Thank you for applying! We will review your application soon.</p>;
  }

  return (
    <section id="intern-section">
      <h2>Apply for Internship</h2>
      <form onSubmit={handleSubmit} className="intern-form">
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input
          name="resumeUrl"
          placeholder="Resume URL"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </section>
  );
}
