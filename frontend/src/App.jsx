import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Messages from "./pages/Messages";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Verification from "./pages/auth/Verification";
import Layout from "./layout";
import ProfilePage from "./pages/ProfilePage";
import MeetingPage from "./pages/MeetingPage";
import MeetingRoom from "./pages/MeetingRoom";
import GroupsPage from "./pages/GroupsPage";

export default function App() {
  useEffect(() => {
    const colorMode = JSON.parse(window.localStorage.getItem("color-theme"));
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, []);

  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/auth/login" />} />

      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/verify" element={<Verification />} />

      {/* Dashboard Layout Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Messages />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="meeting" element={<MeetingPage />} />
      </Route>

      {/* ZegoCloud Meeting Room route (outside dashboard layout) */}
      <Route path="/meeting/:roomId" element={<MeetingRoom />} />
    </Routes>
  );
}
