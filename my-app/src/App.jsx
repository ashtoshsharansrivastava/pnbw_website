// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout           from './components/Layout.jsx';
import Header           from './components/Header.jsx';
import Footer           from './components/Footer.jsx';
import Home             from './pages/Home.jsx';
import About            from './pages/About.jsx';
import Services         from './pages/Services.jsx';
import PropertyDetail   from './pages/PropertyDetail.jsx';
import Login            from './pages/Auth/Login.jsx';
import SignUp           from './pages/Auth/SignUp.jsx';
import BrokerDashboard  from './pages/BrokerDashboard.jsx';
import AdminLayout      from './pages/Admin/AdminLayout.jsx';
import Dashboard        from './pages/Admin/Dashboard.jsx';
import BrokerManagement from './pages/Admin/BrokerManagement.jsx';
import SiteManagement   from './pages/Admin/SiteManagement.jsx';
import './styles/styles.css';

import './index.css';

import { useAuthStore } from './store/useAuthStore.js';

function RequireAuth({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"             element={<Home/>} />
        <Route path="/about"        element={<About/>} />
        <Route path="/services"     element={<Services/>} />
        <Route path="/property/:id" element={<PropertyDetail/>} />
        <Route path="/login"        element={<Login/>} />
        <Route path="/signup"       element={<SignUp/>} />

        <Route
          path="/broker"
          element={
            <RequireAuth>
              <BrokerDashboard/>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout/>
            </RequireAuth>
          }
        >
          <Route index         element={<Dashboard/>} />
          <Route path="brokers" element={<BrokerManagement/>} />
          <Route path="sites"   element={<SiteManagement/>} />
        </Route>
      </Routes>
    </Layout>
  );
}
