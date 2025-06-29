import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import LoginModal from './components/LoginModal.jsx'
import PropertyModal from './components/PropertyModal.jsx'
import HomeSection from './components/HomeSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import InternForm from './components/InternForm.jsx'
import BrokerDashboard from './components/BrokerDashboard.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import SortControls from './components/SortControls.jsx'
import Footer from './components/Footer.jsx'
import api from './api.js'


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

