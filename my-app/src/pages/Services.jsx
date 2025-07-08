// src/pages/Services.jsx
export default function Services() {
  return (
    <main className="min-h-screen bg-midnight text-white py-16">
      <div className="container mx-auto px-6 space-y-10">
        {/* Hero Section */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">Our Services</h1>
          <p className="text-gray-300 text-lg">
            We provide cutting-edge solutions to help you navigate the real estate market seamlessly.
          </p>
        </header>

        {/* Service List */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">What We Offer</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li><strong>Property Listings:</strong> Explore our curated listings of the best properties across India.</li>
            <li><strong>Property Management:</strong> We offer professional property management services for owners.</li>
            <li><strong>Broker Network:</strong> Connect with expert brokers in your area who know the market.</li>
            <li><strong>Real Estate Consultancy:</strong> Get personalized advice from our real estate experts.</li>
            <li><strong>Investment Opportunities:</strong> Let us guide you in making profitable investments in real estate.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
          >
            Contact Us
          </a>
        </section>
      </div>
    </main>
  )
}
