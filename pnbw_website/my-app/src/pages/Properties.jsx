import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Home, Building, LandPlot, Search, MapPin } from 'lucide-react'; // Importing Lucide icons
import PropertyGrid from '../components/PropertyGrid.jsx'; // Import PropertyGrid
import { sites as propertiesData } from '../data/frontend.js'; // Import your properties data

export default function Properties() {
  // Dummy data for property types - in a real app, this might come from an API
  const propertyTypes = [
    {
      name: 'Apartments',
      description: 'Modern and spacious apartments in prime urban locations.',
      icon: Home,
      count: '500+', // Placeholder
    },
    {
      name: 'Villas & Houses',
      description: 'Luxurious villas and independent houses with ample space and privacy.',
      icon: Building,
      count: '150+', // Placeholder
    },
    {
      name: 'Plots & Land',
      description: 'Investment-ready residential and commercial plots for future development.',
      icon: LandPlot,
      count: '80+', // Placeholder
    },
    {
      name: 'Commercial Spaces',
      description: 'Prime office spaces, retail outlets, and commercial plots for your business.',
      icon: Search, // Using Search as a generic commercial icon
      count: '120+', // Placeholder
    },
  ];

  // State for properties to be displayed in the featured section
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call or direct import for featured properties
    setLoading(true);
    setError(null);
    try {
      // Assuming propertiesData is an array of property objects
      // You might want to select a subset or specific featured ones here
      // For now, let's just take the first few or all if there aren't many
      const selectedFeatured = propertiesData.slice(0, 6); // Display first 6 as featured
      setFeaturedProperties(selectedFeatured);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load featured properties:", err);
      setError("Failed to load featured properties. Please try again later.");
      setLoading(false);
    }
  }, []);


  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 py-16 sm:py-20 md:py-24">
      {/* Edge-to-edge container with responsive padding */}
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
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Featured Properties</h2>
          <p className="text-gray-800 leading-relaxed text-lg mb-8">
            Browse through our hand-picked selection of properties, showcasing the best opportunities in the market.
          </p>
          
          {loading && (
            <p className="text-center text-blue-400 text-xl animate-pulse mt-12">Loading featured properties...</p>
          )}

          {error && (
            <p className="text-center text-red-500 text-xl mt-12">{error}</p>
          )}

          {!loading && !error && featuredProperties.length > 0 ? (
            <PropertyGrid properties={featuredProperties} />
          ) : (
            !loading && !error && (
              <p className="text-center text-gray-600 text-xl mt-12">No featured properties available at the moment.</p>
            )
          )}

          <div className="text-center mt-10">
            <a
              href="/properties-all" // Link to a page with all properties (assuming you'll create this)
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Properties
            </a>
          </div>
        </section>

        {/* ── Property Types Section ───────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
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
                <p className="text-gray-700 leading-relaxed text-sm mb-2">
                  {type.description}
                </p>
                <span className="text-blue-500 font-bold text-md">{type.count} Listings</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Call to Action ───────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">Can't Find What You're Looking For?</h2>
          <p className="text-gray-800 leading-relaxed text-lg max-w-3xl mx-auto">
            Our expert team is ready to assist you with personalized property searches and exclusive listings.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <MapPin size={20} className="mr-2" /> Request a Custom Search
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
