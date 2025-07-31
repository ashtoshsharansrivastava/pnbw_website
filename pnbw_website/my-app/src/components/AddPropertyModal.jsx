import React, { useState } from 'react';
import { X, Upload, Video, MapPin, DollarSign, Home, Bed, Bath, PlusCircle, Square, Info, Calendar, User } from 'lucide-react'; // Corrected: Removed FiSquare, using Square directly

export default function AddPropertyModal({ onClose, onAddProperty }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    price: '',
    units: '',
    bedrooms: '',
    bathrooms: '',
    furnishing: 'Unfurnished',
    possession: 'Immediate',
    builtYear: '',
    locality: '',
    city: '',
    images: [], // Stores File objects
    videoUrls: [], // Stores video URLs as strings
    lat: '',
    lng: '',
    amenities: [], // Stores selected amenities
    submittedBy: '', // To indicate which broker/admin added it
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(''); // 'success', 'error'
  const [newAmenity, setNewAmenity] = useState(''); // For adding custom amenities

  const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial Space', 'Farmhouse'];
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Furnished'];
  const possessionOptions = ['Immediate', 'Within 3 Months', 'Under Construction'];
  const commonAmenities = ['Parking', 'Gym', 'Swimming Pool', '24/7 Security', 'Power Backup', 'Lift', 'Garden', 'Clubhouse', 'Kids Play Area'];


  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((item) => item !== value),
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAddVideoUrl = () => {
    const url = prompt("Enter video URL (e.g., YouTube, Vimeo):");
    if (url && url.trim() !== '') {
      setFormData((prev) => ({ ...prev, videoUrls: [...prev.videoUrls, url.trim()] }));
    }
  };

  const handleRemoveVideoUrl = (index) => {
    setFormData((prev) => ({
      ...prev,
      videoUrls: prev.videoUrls.filter((_, i) => i !== index),
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenityToRemove) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((amenity) => amenity !== amenityToRemove),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');

    console.log('New Property Data:', formData);

    // --- IMPORTANT: Real-world scenario ---
    // In a real application, you would:
    // 1. Send formData (excluding File objects for images/videos) to your backend API.
    // 2. Separately upload images/videos to a cloud storage service (e.g., AWS S3, Google Cloud Storage, Cloudinary).
    // 3. Your backend would then store the property details (including image/video URLs) in your database.
    // This mock will just simulate success.

    try {
      // Simulate API call
      // const newProperty = await api.addProperty(formData); // Hypothetical API call
      const newProperty = {
        id: `prop-${Date.now()}`, // Generate a unique ID for mock
        ...formData,
        price: parseFloat(formData.price) || 0, // Convert price to number
        units: parseFloat(formData.units) || 0, // Convert units to number
        bedrooms: parseInt(formData.bedrooms) || null,
        bathrooms: parseInt(formData.bathrooms) || null,
        builtYear: parseInt(formData.builtYear) || null,
        images: formData.images.map(file => URL.createObjectURL(file)), // Create temp URLs for display
        published: false, // New properties are usually pending review
        active: false,
        popular: false,
        createdAt: Date.now(),
        views: 0,
      };

      setTimeout(() => {
        onAddProperty(newProperty); // Pass the new property data back to parent
        setFeedback('success');
        // Clear form (optional, might want to keep it open for more additions)
        setFormData({
          title: '', description: '', propertyType: 'Apartment', price: '', units: '',
          bedrooms: '', bathrooms: '', furnishing: 'Unfurnished', possession: 'Immediate',
          builtYear: '', locality: '', city: '', images: [], videoUrls: [], lat: '', lng: '',
          amenities: [], submittedBy: '',
        });
        setTimeout(onClose, 2000); // Close modal after success
      }, 1500);

    } catch (err) {
      console.error('Failed to add property:', err);
      setFeedback('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          title="Close"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">Add New Property</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Property Name/Title <span className="text-red-500">*</span></label>
              <input type="text" id="title" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., Luxury Apartment in Sector 62" value={formData.title} onChange={handleChange} required disabled={isSubmitting} />
            </div>
            <div>
              <label htmlFor="propertyType" className="block text-gray-700 text-sm font-semibold mb-2">Property Type <span className="text-red-500">*</span></label>
              <select id="propertyType" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white" value={formData.propertyType} onChange={handleChange} required disabled={isSubmitting}>
                {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description <span className="text-red-500">*</span></label>
            <textarea id="description" rows="4" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="Provide a detailed description of the property..." value={formData.description} onChange={handleChange} required disabled={isSubmitting}></textarea>
          </div>

          {/* Price & Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">Price (in Rupees) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input type="number" id="price" className="w-full p-3 pl-8 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., 6200000" value={formData.price} onChange={handleChange} required disabled={isSubmitting} />
              </div>
            </div>
            <div>
              <label htmlFor="units" className="block text-gray-700 text-sm font-semibold mb-2">Area (Sq. Ft. or Units) <span className="text-red-500">*</span></label>
              <div className="relative">
                {/* Corrected: Use Square directly from lucide-react */}
                <Square size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="number" id="units" className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., 1200" value={formData.units} onChange={handleChange} required disabled={isSubmitting} />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="locality" className="block text-gray-700 text-sm font-semibold mb-2">Locality <span className="text-red-500">*</span></label>
              <input type="text" id="locality" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., Indirapuram" value={formData.locality} onChange={handleChange} required disabled={isSubmitting} />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">City <span className="text-red-500">*</span></label>
              <input type="text" id="city" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., Ghaziabad" value={formData.city} onChange={handleChange} required disabled={isSubmitting} />
            </div>
          </div>

          {/* Optional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-semibold mb-2">Bedrooms</label>
              <div className="relative">
                <Bed size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="number" id="bedrooms" min="0" className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., 3" value={formData.bedrooms} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-gray-700 text-sm font-semibold mb-2">Bathrooms</label>
              <div className="relative">
                <Bath size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="number" id="bathrooms" min="0" className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., 2" value={formData.bathrooms} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>
            <div>
              <label htmlFor="furnishing" className="block text-gray-700 text-sm font-semibold mb-2">Furnishing</label>
              <select id="furnishing" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white" value={formData.furnishing} onChange={handleChange} disabled={isSubmitting}>
                {furnishingOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="possession" className="block text-gray-700 text-sm font-semibold mb-2">Possession</label>
              <select id="possession" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white" value={formData.possession} onChange={handleChange} disabled={isSubmitting}>
                {possessionOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="builtYear" className="block text-gray-700 text-sm font-semibold mb-2">Built Year</label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="number" id="builtYear" min="1900" max={new Date().getFullYear()} className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., 2020" value={formData.builtYear} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>
            <div>
              <label htmlFor="submittedBy" className="block text-gray-700 text-sm font-semibold mb-2">Submitted By (Broker Name)</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" id="submittedBy" className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-gray-900" placeholder="e.g., John Doe" value={formData.submittedBy} onChange={handleChange} disabled={isSubmitting} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <label htmlFor="images" className="block text-gray-700 text-sm font-semibold mb-2">Property Images</label>
            <input type="file" id="images" multiple accept="image/*" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleChange} disabled={isSubmitting} />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((file, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center">
                  {file.name}
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))} className="ml-1 text-red-500 hover:text-red-700">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Video URLs</label>
            <button type="button" onClick={handleAddVideoUrl} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors" disabled={isSubmitting}>
              <Video size={16} className="mr-2" /> Add Video URL
            </button>
            <div className="mt-2 space-y-1">
              {formData.videoUrls.map((url, index) => (
                <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg text-gray-800 text-sm">
                  <span className="truncate flex-1">{url}</span>
                  <button type="button" onClick={() => handleRemoveVideoUrl(index)} className="ml-2 text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Map Location (Latitude, Longitude)</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" id="lat" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="Latitude" value={formData.lat} onChange={handleChange} disabled={isSubmitting} />
              <input type="text" id="lng" className="w-full p-3 border border-gray-300 rounded-lg text-gray-900" placeholder="Longitude" value={formData.lng} onChange={handleChange} disabled={isSubmitting} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              * For precise location, use a tool like Google Maps to get Lat/Lng.
              {/* Add a button here for an actual map picker if implemented */}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Amenities</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {commonAmenities.map(amenity => (
                <label key={amenity} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-800 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-1"
                    disabled={isSubmitting}
                  />
                  {amenity}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Add custom amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                disabled={isSubmitting}
              />
              <button type="button" onClick={handleAddAmenity} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" disabled={isSubmitting}>
                <PlusCircle size={20} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.amenities.filter(a => !commonAmenities.includes(a)).map((amenity, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                  {amenity}
                  <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="ml-1 text-red-500 hover:text-red-700">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition shadow-md"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>

          {feedback === 'success' && <p className="text-green-600 text-sm text-center mt-4">Property added successfully (simulated)!</p>}
          {feedback === 'error' && <p className="text-red-600 text-sm text-center mt-4">Failed to add property (simulated).</p>}
        </form>
      </div>
    </div>
  );
}
