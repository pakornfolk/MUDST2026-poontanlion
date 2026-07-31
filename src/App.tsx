import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AdminSidebar } from './components/admin/AdminSidebar';

// Public Pages
import { Home } from './pages/public/Home';
import { Rooms } from './pages/public/Rooms';
import { RoomDetail } from './pages/public/RoomDetail';
import { BookingPage } from './pages/public/BookingPage';
import { PaymentPage } from './pages/public/PaymentPage';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { Contact } from './pages/public/Contact';
import { About } from './pages/public/About';
import { FAQPage } from './pages/public/FAQPage';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { BookingHistory } from './pages/user/BookingHistory';
import { UserProfile } from './pages/user/UserProfile';
import { UserWishlist } from './pages/user/UserWishlist';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { RoomManagement } from './pages/admin/RoomManagement';
import { BookingManagement } from './pages/admin/BookingManagement';
import { PaymentManagement } from './pages/admin/PaymentManagement';
import { UserManagement } from './pages/admin/UserManagement';
import { HotelInformation } from './pages/admin/HotelInformation';
import { ReportsPage } from './pages/admin/ReportsPage';
import { ActivityLogList } from './pages/admin/ActivityLogList';
import { NotificationCenter } from './pages/admin/NotificationCenter';

// Protected Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== 'user') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Layout Wrapper
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-nike-canvas dark:bg-nike-dark-surface text-nike-ink dark:text-white">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

// Main Public Layout Wrapper — Nike editorial chrome
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-nike-canvas dark:bg-nike-dark-surface text-nike-ink dark:text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const AppContent: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        
        {/* PUBLIC & USER ROUTES */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/rooms" element={<PublicLayout><Rooms /></PublicLayout>} />
        <Route path="/rooms/:id" element={<PublicLayout><RoomDetail /></PublicLayout>} />
        <Route path="/booking/:roomId" element={<PublicLayout><BookingPage /></PublicLayout>} />
        <Route path="/payment/:bookingId" element={<PublicLayout><PaymentPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />

        <Route path="/user/dashboard" element={<ProtectedUserRoute><PublicLayout><UserDashboard /></PublicLayout></ProtectedUserRoute>} />
        <Route path="/user/bookings" element={<ProtectedUserRoute><PublicLayout><BookingHistory /></PublicLayout></ProtectedUserRoute>} />
        <Route path="/user/profile" element={<ProtectedUserRoute><PublicLayout><UserProfile /></PublicLayout></ProtectedUserRoute>} />
        <Route path="/wishlist" element={<ProtectedUserRoute><PublicLayout><UserWishlist /></PublicLayout></ProtectedUserRoute>} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/rooms" element={<ProtectedAdminRoute><AdminLayout><RoomManagement /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/bookings" element={<ProtectedAdminRoute><AdminLayout><BookingManagement /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/payments" element={<ProtectedAdminRoute><AdminLayout><PaymentManagement /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/users" element={<ProtectedAdminRoute><AdminLayout><UserManagement /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/hotel-info" element={<ProtectedAdminRoute><AdminLayout><HotelInformation /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/reports" element={<ProtectedAdminRoute><AdminLayout><ReportsPage /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/activity-log" element={<ProtectedAdminRoute><AdminLayout><ActivityLogList /></AdminLayout></ProtectedAdminRoute>} />
        <Route path="/admin/notifications" element={<ProtectedAdminRoute><AdminLayout><NotificationCenter /></AdminLayout></ProtectedAdminRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
