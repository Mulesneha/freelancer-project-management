
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ClientDashboard from "./pages/ClientDashboard";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client-dashboard" replace />}
      />

      <Route
        path="/client-dashboard"
        element={<ClientDashboard />}
      />

      <Route
        path="/create-project"
        element={<CreateProject />}
      />

      <Route
        path="*"
        element={<Navigate to="/client-dashboard" replace />}
      />
    </Routes>
  );
}

export default App;

