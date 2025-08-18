// Properties.jsx (Corrected)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // CHANGE 1: Import Link for client-side navigation
import { Home, Building, LandPlot, Search, MapPin } from 'lucide-react';
import PropertyGrid from '../components/PropertyGrid'; // CHANGE 2: Removed .jsx extension

// CHANGE 3: Switched to a default import. This is the MOST LIKELY FIX.
// If your file uses `export const sites = ...`, change this back to:
import { sites as propertiesData } from '../data/frontend';


export default function Properties() {
  const propertyTypes = [
    { name: 'Apartments', description: 'Modern and spacious apartments.', icon: Home, count: '500+' },
    { name: 'Villas & Houses', description: 'Luxurious villas and independent houses.', icon: Building, count: '150+' },
    { name: 'Plots & Land', description: 'Investment-ready residential and commercial plots.', icon: LandPlot, count: '80+' },
    { name: 'Commercial Spaces', description: 'Prime office spaces and retail outlets.', icon: Search, count: '120+' },
  ];

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This effect runs once when the component mounts
    setError(null);
    try {
      // Ensure propertiesData is an array before trying to slice it
      if (!Array.isArray(propertiesData)) {
        throw new Error("Property data is not in the expected format (array).");
      }
      const selectedFeatured = propertiesData.slice(0, 6);
      setFeaturedProperties(selectedFeatured);
    } catch (err) {
      console.error("Failed to load featured properties:", err);
      setError("Failed to load featured properties. Please try again later.");
    } finally {
      // The finally block ensures loading is set to false whether it succeeds or fails
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Helper function to render the content of the featured section
  const renderFeaturedContent = () => {
    if (loading) {
      return <p className="text-center text-blue-400 text-xl animate-pulse mt-12">Loading featured properties...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500 text-xl mt-12">{error}</p>;
    }
    if (featuredProperties.length > 0) {
      return <PropertyGrid properties={featuredProperties} />;
    }
    return <p className="text-center text-gray-600 text-xl mt-12">No featured properties available at the moment.</p>;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 py-16 sm:py-20 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 space-y-16 sm:space-y-20">

        {/* ── Hero Section ───────────────────────────────────────────────────── */}
        <header className="text-center space-y-6 px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
            Explore Our <span className="text-blue-600">Properties</span>
          </h1>
          <p className="text-gray-700 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover a diverse portfolio of residential and commercial properties tailored to your aspirations.
          </p>
        </header>

        {/* ── Featured Properties Section ──────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Featured Properties</h2>
          <p className="text-gray-800 leading-relaxed text-lg mb-8">
            Browse through our hand-picked selection of properties, showcasing the best opportunities in the market.
          </p>
          
          {/* CHANGE 4: Simplified and cleaner conditional rendering logic */}
          {renderFeaturedContent()}

          <div className="text-center mt-10">
            {/* CHANGE 5: Use Link component instead of <a> for better UX */}
            <Link
              to="/properties-all"
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Properties
            </Link>
          </div>
        </section>

        {/* ── Property Types Section ───────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Explore by Property Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type) => (
              <div
                key={type.name}
                className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-blue-600 mb-4">
                  <type.icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-700 leading-relaxed text-sm mb-2">{type.description}</p>
                <span className="text-blue-500 font-bold text-md">{type.count} Listings</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Call to Action ───────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">Can't Find What You're Looking For?</h2>
          <p className="text-gray-800 leading-relaxed text-lg mb-6">
            Our expert team is ready to assist you with personalized property searches and exclusive listings.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <MapPin size={20} className="mr-2" /> Request a Custom Search
          </Link>
        </section>
      </div>
    </main>
  );
}