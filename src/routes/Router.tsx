import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Preview from './Preview';
import SignIn from './Auth';
import Signup from './signin'  // Import your SignIn component here

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />  {/* New SignIn route */}
      <Route path="/signup" element={<SignIn />} />  {/* New SignIn route */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
