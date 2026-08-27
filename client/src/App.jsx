import { Routes, Route, Navigate } from "react-router-dom";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  return (
    <Routes>
      {/* Redirect homepage to dashboard */}
      <Route path="/" element={<Navigate to="/client-dashboard" />} />

      {/* Client Dashboard */}
      <Route path="/client-dashboard" element={<ClientDashboard />} />

      {/* Temporary page for testing */}
      <Route
        path="/create-project"
        element={<h1>Create Project Page Coming Soon 🚀</h1>}
      />

      {/* Redirect unknown URLs */}
      <Route path="*" element={<Navigate to="/client-dashboard" />} />
    </Routes>
  );
}

export default App;