import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AdminLayout from "../admin/layouts/AdminLayout";
import AlertSettings from "../admin/pages/AlertSettings";
import AnalyticsSettings from "../admin/pages/AnalyticsSettings";
import ContactSettings from "../admin/pages/ContactSettings";
import DirectorSettings from "../admin/pages/DirectorSettings";
import NewsSettings from "../admin/pages/NewsSettings";
import PartnerSettings from "../admin/pages/PartnerSettings";
import RentSettings from "../admin/pages/RentSettings";
import RoadmapSettings from "../admin/pages/RoadmapSettings";
import StaffSettings from "../admin/pages/StaffSettings";
import StatsSettings from "../admin/pages/StatsSettings";
import TrainingSettings from "../admin/pages/TrainingSettings";

import Contact from "../pages/Contact";
import DigitalIncubator from "../pages/DigitalIncubator";
import DirectorPage from "../pages/Director";
import Home from "../pages/Home";
import Incubator from "../pages/Incubator";
import IncubatorProgram from "../pages/IncubatorProgram";
import IncubatorService from "../pages/IncubatorService";
import Login from "../pages/Login";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import NotFound from "../pages/NotFound";
import RentPage from "../pages/RentPage";
import Roadmap from "../pages/Roadmap";
import Staff from "../pages/Staff";
import TrainingCenter from "../pages/TrainingCenter";
import TrainingDetails from "../pages/TrainingDetails";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/incubator", element: <Incubator /> },
  { path: "/digital-incubator", element: <DigitalIncubator /> },
  { path: "/staff", element: <Staff /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <NewsDetails /> },
  { path: "/vision-mission", element: <Contact /> },
  { path: "/contact", element: <Navigate to="/vision-mission" replace /> },
  { path: "/director", element: <DirectorPage /> },
  { path: "/roadmap", element: <Roadmap /> },
  { path: "/rent", element: <RentPage /> },
  { path: "/incubator-service", element: <IncubatorService /> },
  { path: "/incubator-program", element: <IncubatorProgram /> },
  { path: "/training-center", element: <TrainingCenter /> },
  { path: "/training/:id", element: <TrainingDetails /> },
  { path: "/login", element: <Login /> },
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
      { path: "analytics", element: <AnalyticsSettings /> },
      { path: "alert-settings", element: <AlertSettings /> },
      { path: "rent-settings", element: <RentSettings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
