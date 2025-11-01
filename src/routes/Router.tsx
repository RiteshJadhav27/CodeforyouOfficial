import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import UserDashboard from './UserDashboard';
import Admin from '../components/AdminPanel';
import Preview from './Preview';
import SignIn from './Auth';
import Project from '../components/Projects';
import AdminAuth from '../components/AdminAuth'  // Import your SignIn component here
import Hire from '../components/hire';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />  {/* New SignIn route */}
      <Route path="/signup" element={<SignIn />} />  {/* New SignIn route */}
      <Route path="/project" element={<Project />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/AdminPanel" element={<Admin />} />
      <Route path="/adminAuth" element={<AdminAuth />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/hire" element={<Hire />} />
    </Routes>
  );
}
