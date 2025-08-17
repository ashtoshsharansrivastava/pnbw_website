import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Assuming these are all in direct subdirectories of src/
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';

import BrokerDashboard from './pages/BrokerDashboard.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import BrokerManagement from './pages/Admin/BrokerManagement.jsx';
import SiteManagement from './pages/Admin/SiteManagement.jsx';

import './styles/styles.css';
import './index.css';

import { useAuthStore } from './store/useAuthStore.js';


function RequireAuth({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="bg-midnight text-white min-h-screen"> {/* Apply the dark-blue background globally */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New Forgot Password Route */}
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Reset Password Route */}

          <Route
            path="/broker"
            element={
              <RequireAuth>
                <BrokerDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="brokers" element={<BrokerManagement />} />
            <Route path="sites" element={<SiteManagement />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}
