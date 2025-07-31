import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader.jsx';
import * as api from '../../api/brokers.js'; // Ensure this API file exists and has getAll, updateBroker, deleteBroker, addBroker
import { User, Mail, Home, CheckCircle, XCircle, Search, Edit, Trash2, UserPlus } from 'lucide-react'; // Lucide icons, added UserPlus

// Custom Modal for Adding Broker
const AddBrokerModal = ({ onClose, onAddBroker }) => {
  const [brokerName, setBrokerName] = useState('');
  const [brokerEmail, setBrokerEmail] = useState('');
  const [brokerPhone, setBrokerPhone] = useState(''); // New state for phone number
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(''); // 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');

    // Simulate API call to add a new broker
    try {
      // In a real app, you'd send this to your backend API
      // const newBroker = await api.addBroker({ name: brokerName, email: brokerEmail, phone: brokerPhone });
      // onAddBroker(newBroker); // Pass the new broker data back to parent

      // Simulate success
      const newBroker = {
        id: Date.now(), // Unique ID
        name: brokerName,
        email: brokerEmail,
        phone: brokerPhone, // Include phone in the new broker object
        listings: 0,
        active: true,
      };
      setTimeout(() => {
        onAddBroker(newBroker); // Call the parent's add handler
        setFeedback('success');
        setBrokerName('');
        setBrokerEmail('');
        setBrokerPhone(''); // Clear phone field
        setTimeout(onClose, 1500); // Close modal after a delay
      }, 1000);

    } catch (err) {
      console.error('Failed to add broker:', err);
      setFeedback('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Broker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brokerName" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="brokerName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" // Added text-gray-900
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="brokerEmail" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="brokerEmail"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" // Added text-gray-900
              value={brokerEmail}
              onChange={(e) => setBrokerEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div> {/* New input for phone number */}
            <label htmlFor="brokerPhone" className="block text-gray-700 text-sm font-semibold mb-2">Contact Number</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="brokerPhone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="e.g., +91 9876543210"
              value={brokerPhone}
              onChange={(e) => setBrokerPhone(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          {feedback === 'success' && <p className="text-green-600 text-sm text-center">Broker added successfully!</p>}
          {feedback === 'error' && <p className="text-red-600 text-sm text-center">Failed to add broker.</p>}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Broker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function BrokerManagement() {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [showAddBrokerModal, setShowAddBrokerModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Simulate API call for brokers
    // In a real app, you'd fetch from your backend
    const fetchBrokers = async () => {
      setLoading(true);
      try {
        // Mock data for brokers
        const mockBrokers = [
          { id: 'b1', name: 'Ravi Kumar', email: 'ravi.k@example.com', listings: 12, active: true },
          { id: 'b2', name: 'Priya Sharma', email: 'priya.s@example.com', listings: 8, active: false },
          { id: 'b3', name: 'Amit Singh', email: 'amit.s@example.com', listings: 20, active: true },
          { id: 'b4', name: 'Sneha Gupta', email: 'sneha.g@example.com', listings: 5, active: true },
        ];
        // await api.getAll().then((data) => {
        //   setBrokers(data);
        // });
        setBrokers(mockBrokers); // Use mock data for now
      } catch (err) {
        console.error('Failed to load brokers:', err);
        // Handle error display in UI
      } finally {
        setLoading(false);
      }
    };
    fetchBrokers();
  }, []);

  const handleAddBroker = (newBroker) => {
    setBrokers((prevBrokers) => [...prevBrokers, newBroker]);
  };

  const handleToggleStatus = async (brokerId, currentStatus) => {
    // Simulate API call to update broker status
    console.log(`Toggling status for broker ${brokerId} to ${!currentStatus}`);
    try {
      // await api.updateBroker(brokerId, { active: !currentStatus }); // Hypothetical API call
      setBrokers((prevBrokers) =>
        prevBrokers.map((b) =>
          b.id === brokerId ? { ...b, active: !currentStatus } : b
        )
      );
    } catch (err) {
      console.error('Failed to update broker status:', err);
    }
  };

  const handleDeleteBroker = async (brokerId) => {
    // Simulate API call to delete broker
    console.log(`Deleting broker ${brokerId}`);
    if (window.confirm('Are you sure you want to delete this broker? This action cannot be undone.')) {
      try {
        // await api.deleteBroker(brokerId); // Hypothetical API call
        setBrokers((prevBrokers) => prevBrokers.filter((b) => b.id !== brokerId));
      } catch (err) {
        console.error('Failed to delete broker:', err);
      }
    }
  };

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          broker.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'active' && broker.active) ||
                          (filterStatus === 'inactive' && !broker.active);
    return matchesSearch && matchesStatus;
  });

  // Show full-screen loader while fetching
  if (loading) return <Loader />;

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">Broker Management</h1>

      {/* Top Controls: Search, Filter, Add Broker */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-800 bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Brokers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => setShowAddBrokerModal(true)}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <UserPlus size={20} className="mr-2" /> Add Broker
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50 text-blue-800 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Broker Name</th>
              <th className="px-4 py-3">Contact Email</th>
              <th className="px-4 py-3">Listings</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 rounded-tr-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrokers.length > 0 ? (
              filteredBrokers.map((b) => (
                <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-semibold text-lg text-gray-900 flex items-center gap-2">
                    <User size={18} className="text-gray-500" /> {b.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" /> {b.email}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Home size={16} className="text-gray-400" /> {b.listings}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        b.active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {b.active ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                      {b.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => console.log('Edit broker:', b.id)} // Placeholder for edit action
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit Broker"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(b.id, b.active)}
                        className={`p-2 rounded-full ${
                          b.active
                            ? 'text-rose-600 hover:bg-rose-100'
                            : 'text-emerald-600 hover:bg-emerald-100'
                        } transition-colors`}
                        title={b.active ? "Deactivate Broker" : "Activate Broker"}
                      >
                        {b.active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => handleDeleteBroker(b.id)}
                        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Broker"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 text-lg">
                  No brokers to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showAddBrokerModal && <AddBrokerModal onClose={() => setShowAddBrokerModal(false)} onAddBroker={handleAddBroker} />}
    </div>
  );
}
