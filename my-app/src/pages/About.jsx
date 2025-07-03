// src/pages/About.jsx
import React from 'react'

export default function About() {
  return (
    <main className="min-h-screen bg-slate-100 py-12">
      {/* Remove the max-width container so it spans edge-to-edge */}
      <div className="w-full px-6 lg:px-24 xl:px-48 space-y-12">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-800">
            About PNBW Officials
          </h1>
          <p className="text-gray-600 text-lg">
            Connecting people with their dream homes—one listing at a time.
          </p>
        </header>

        {/* Our Story */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2024 by a passionate team of real estate experts, PNBW Officials set out with a clear mission: 
            to make property buying, selling, and renting as transparent and stress-free as possible. What began as a small 
            startup in Noida has quickly grown into a trusted platform, with partners and clients spanning across the country.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that everyone deserves a place to call home, and our platform brings together modern technology 
            with human expertise to guide you at every step—from discovering the perfect neighbourhood to closing the deal.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Mission &amp; Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Our Mission:</strong> To empower home-seekers and property owners with accurate data, honest advice, 
            and an intuitive experience—so finding your dream space feels as comfortable as living in it.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Our Vision:</strong> To build the most respected real estate ecosystem in India, where technology 
            seamlessly connects property seekers, brokers, and developers under one roof.
          </p>
        </section>

        {/* What Makes Us Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">What Makes Us Different</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Verified Listings:</strong> Every property is personally vetted by our in-house team.</li>
            <li><strong>Transparent Pricing:</strong> No hidden fees—what you see is what you pay.</li>
            <li><strong>Expert Support:</strong> Local brokers and customer-success managers guide you from start to finish.</li>
            <li><strong>Advanced Search:</strong> Filter by school districts, commute times, amenities and more.</li>
            <li><strong>Community Focus:</strong> We donate a portion of every transaction to affordable housing projects.</li>
          </ul>
        </section>

        {/* Our Team */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Meet the Team</h2>
          <p className="text-gray-700 leading-relaxed">
            Behind PNBW Officials is a tight-knit group of engineers, real estate veterans, and customer advocates. 
            From our founders to our support staff, every member is united by one goal: your satisfaction.
          </p>
        </section>

        {/* Join Us */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Join Us on This Journey</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you’re a first-time buyer, an experienced investor, or a seasoned broker, PNBW Officials 
            has something for you. Explore our featured listings, connect with top agents, or reach out to learn 
            more about how we can help you unlock your next opportunity.
          </p>
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
