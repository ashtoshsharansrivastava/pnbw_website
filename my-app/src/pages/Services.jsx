// src/pages/Services.jsx
import React from 'react'
import { FaHome, FaKey, FaTags, FaMoneyCheckAlt, FaUserTie } from 'react-icons/fa'

export default function Services() {
  const services = [
    { icon: <FaHome className="w-12 h-12 text-red-600" />, title: 'Buy', desc: 'Curated property matchmaking tailored to your needs.' },
    { icon: <FaKey className="w-12 h-12 text-red-600" />, title: 'Rent', desc: 'Verified rentals with zero brokerage and flexible terms.' },
    { icon: <FaTags className="w-12 h-12 text-red-600" />, title: 'Sell', desc: '3D tours & digital marketing pack to showcase your property.' },
    { icon: <FaMoneyCheckAlt className="w-12 h-12 text-red-600" />, title: 'Mortgage', desc: 'Partner bank pre-approvals with competitive rates.' },
    { icon: <FaUserTie className="w-12 h-12 text-red-600" />, title: 'Find an Agent', desc: 'Top-rated brokers in your area ready to assist.' },
  ];

  return (
    <main className="min-h-screen w-full bg-white py-20">
      <section className="w-full px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto text-center">
            We provide end-to-end real estate solutions to make your journey seamless.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col items-center bg-white rounded-xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3"
            >
              {/* Icon */}
              <div className="bg-red-100 p-4 rounded-full mb-6">
                {s.icon}
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{s.title}</h2>
              <p className="text-gray-600 text-center leading-relaxed flex-grow">{s.desc}</p>

              {/* Learn More Button */}
              <button className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
