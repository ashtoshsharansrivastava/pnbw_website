import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import PropertyModal from './components/PropertyModal';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import InternForm from './components/InternForm';
import BrokerDashboard from './components/BrokerDashboard';
import AdminPanel from './components/AdminPanel';
import SortControls from './components/SortControls';
import Footer from './components/Footer';
import api from './app';

function App() {
  // global state: user, properties, modals…
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    // fetch property list on load
    api.get('/properties').then(res => setProperties(res.data));
    // fetch user session
    api.get('/auth/me').then(res => setUser(res.data.user));
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Sidebar />
      <LoginModal user={user} setUser={setUser} />
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
      <main>
        <HomeSection
          properties={properties}
          onSelect={setSelectedProperty}
        />
        <AboutSection />
        <ServicesSection />
        <InternForm />
        {user?.role === 'broker' && <BrokerDashboard />}
        {user?.role === 'admin' && <AdminPanel />}
      </main>
      <SortControls setProperties={setProperties} />
      <Footer />
    </>
  );
}

export default App;
