import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import SignIn from './pages/SignIn';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import EnergyAdvisorDashboard from './components/dashboards/EnergyAdvisorDashboard';
import BookingAgentDashboard from './components/dashboards/BookingAgentDashboard';
import TechTeamDashboard from './components/dashboards/TechTeamDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TraineeDashboard from './components/dashboards/TraineeDashboard';
import TrainingResources from './pages/TrainingResources';
import ProjectPage from './pages/ProjectPage';
import AdminSettings from './pages/AdminSettings';
import ParticipantsPage from './pages/ParticipantsPage';

export default function App() {
  const { user } = useAuthStore();

  if (!user) {
    return <SignIn />;
  }

  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ea-dashboard" element={<EnergyAdvisorDashboard />} />
          <Route path="/booking-dashboard" element={<BookingAgentDashboard />} />
          <Route path="/tech-dashboard" element={<TechTeamDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/trainee-dashboard" element={<TraineeDashboard />} />
          <Route path="/training-resources" element={<TrainingResources />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}