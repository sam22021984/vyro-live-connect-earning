import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import SettingDetail from '@/pages/SettingDetail';
import ServiceDetail from '@/pages/ServiceDetail';
import MoreServicesPage from '@/pages/MoreServicesPage';
import VipMembership from '@/pages/VipMembership';
import ApplyCenter from '@/pages/ApplyCenter';
import ApplicationDetail from '@/pages/ApplicationDetail';
import Recharge from '@/pages/Recharge';
import LevelSystem from '@/pages/LevelSystem';
import VyroMall from '@/pages/VyroMall';
import TasksRewards from '@/pages/TasksRewards';
import ProfileStats from '@/pages/ProfileStats';
import Messages from '@/pages/Messages';
import ChatRoom from '@/pages/ChatRoom';
import Social from '@/pages/Social';
import RelationshipCenter from '@/pages/RelationshipCenter';
import CommunityDashboard from '@/pages/CommunityDashboard';
import PartyDashboard from '@/pages/PartyDashboard';
import LiveRoom from '@/pages/LiveRoom';
import GoLivePanel from '@/pages/GoLivePanel';
import Finance from '@/pages/Finance';
import FinanceModule from '@/pages/FinanceModule';
import CoinsRecharge from '@/pages/CoinsRecharge';
import AgencyDashboard from '@/pages/AgencyDashboard';
import AgentDashboard from '@/pages/AgentDashboard';
import ControlCenter from '@/pages/ControlCenter';
import HostDashboard from '@/pages/HostDashboard';
import SamDashboard from '@/pages/SamDashboard';
import CreatorCenter from '@/pages/CreatorCenter';
import OwnerDashboard from '@/pages/OwnerDashboard';
import VipManagerDashboard from '@/pages/VipManagerDashboard';
import SupportManagerDashboard from '@/pages/SupportManagerDashboard';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import RewardManagerDashboard from '@/pages/RewardManagerDashboard';
import PkManagerDashboard from '@/pages/PkManagerDashboard';
import FamilyCenter from '@/pages/FamilyCenter';
import MessageCenter from '@/pages/MessageCenter';
import MessageHub from '@/pages/MessageHub';
import FloatingNavigation from '@/components/FloatingNavigation';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F8F9FC]">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:id" element={<SettingDetail />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/more-services" element={<MoreServicesPage />} />
        <Route path="/vip-membership" element={<VipMembership />} />
        <Route path="/apply-center" element={<ApplyCenter />} />
        <Route path="/apply-center/:id" element={<ApplicationDetail />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/level-system" element={<LevelSystem />} />
        <Route path="/vyro-mall" element={<VyroMall />} />
        <Route path="/tasks-rewards" element={<TasksRewards />} />
        <Route path="/profile-stats" element={<ProfileStats />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
        <Route path="/social" element={<Social />} />
        <Route path="/relationship-center" element={<RelationshipCenter />} />
        <Route path="/community-dashboard" element={<CommunityDashboard />} />
        <Route path="/party-dashboard" element={<PartyDashboard />} />
        <Route path="/live-room" element={<LiveRoom />} />
        <Route path="/go-live" element={<GoLivePanel />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/finance-module" element={<FinanceModule />} />
        <Route path="/coins-recharge" element={<CoinsRecharge />} />
        <Route path="/control-center" element={<ControlCenter />} />
        <Route path="/agency-dashboard" element={<AgencyDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/sam-dashboard" element={<SamDashboard />} />
        <Route path="/creator-center" element={<CreatorCenter />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/vip-manager-dashboard" element={<VipManagerDashboard />} />
        <Route path="/support-manager-dashboard" element={<SupportManagerDashboard />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/reward-manager-dashboard" element={<RewardManagerDashboard />} />
        <Route path="/pk-manager-dashboard" element={<PkManagerDashboard />} />
        <Route path="/family-center" element={<FamilyCenter />} />
        <Route path="/message-center" element={<MessageCenter />} />
        <Route path="/message-hub" element={<MessageHub />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <FloatingNavigation />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App