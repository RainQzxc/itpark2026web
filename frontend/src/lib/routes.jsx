import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layouts
import AdminLayout from "../admin/layouts/AdminLayout";

// Pages - Admin
import AlertSettings from "../admin/pages/AlertSettings";
import ContactSettings from "../admin/pages/ContactSettings";
import NewsSettings from "../admin/pages/NewsSettings";
import StaffSettings from "../admin/pages/StaffSettings";
import TrainingSettings from "../admin/pages/TrainingSettings";
import PartnerSettings from "../admin/pages/PartnerSettings";
import StatsSettings from "../admin/pages/StatsSettings";
import RoadmapSettings from "../admin/pages/RoadmapSettings";
import DirectorSettings from "../admin/pages/DirectorSettings";
import RentSettings from "../admin/pages/RentSettings"; // ✅ 1. ШИНЭЭР ИМПОРТЛОХ

// Pages - Frontend
import Home from "../pages/Home";
import Incubator from "../pages/Incubator";
import DigitalIncubator from "../pages/DigitalIncubator";
import Staff from "../pages/Staff";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import VisionMission from "../pages/Contact";
import DirectorPage from "../pages/Director";
import Roadmap from "../pages/Roadmap";
import IncubatorService from "../pages/IncubatorService";
import IncubatorProgram from "../pages/IncubatorProgram";
import TrainingCenter from "../pages/TrainingCenter";
import TrainingDetails from "../pages/TrainingDetails";
import Login from "../pages/Login";
import RentPage from "../pages/RentPage";

// --- Хамгаалагч бүрэлдэхүүн хэсэг ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; 
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const routes = [
  // PUBLIC ROUTES
  { path: "/", element: <Home /> },
  { path: "/incubator", element: <Incubator /> },
  { path: "/digital-incubator", element: <DigitalIncubator /> },
  { path: "/staff", element: <Staff /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <NewsDetails /> },
  { path: "/vision-mission", element: <VisionMission /> },
  { path: "/contact", element: <Navigate to="/vision-mission" replace /> },
  { path: "/director", element: <DirectorPage /> },
  { path: "/roadmap", element: <Roadmap /> },
  { path: "/rent", element: <RentPage /> },
  { path: "/incubator-service", element: <IncubatorService /> },
  { path: "/incubator-program", element: <IncubatorProgram /> },
  { path: "/training-center", element: <TrainingCenter /> },
  { path: "/training/:id", element: <TrainingDetails /> },
  { path: "/login", element: <Login /> },

  // ADMIN ROUTES (Хамгаалагдсан)
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DirectorSettings /> }, 
      { path: "director-settings", element: <DirectorSettings /> },
      { path: "contact-settings", element: <ContactSettings /> },
      { path: "staff-settings", element: <StaffSettings /> },
      { path: "roadmap-settings", element: <RoadmapSettings /> },
      { path: "stats-settings", element: <StatsSettings /> },
      { path: "partner-settings", element: <PartnerSettings /> },
      { path: "news-settings", element: <NewsSettings /> },
      { path: "training-settings", element: <TrainingSettings /> },
      { path: "alert-settings", element: <AlertSettings /> },
      { path: "rent-settings", element: <RentSettings /> }, // ✅ 2. ЗАМЫГ НЭМЭХ
    ],
  },
];
