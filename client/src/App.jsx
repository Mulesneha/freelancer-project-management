```jsx
import { Routes, Route, Navigate } from "react-router-dom";

import ClientDashboard from "./pages/ClientDashboard";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <Routes>

      {/* Homepage */}
      <Route
        path="/"
        element={<Navigate to="/client-dashboard" replace />}
      />

      {/* Client Dashboard */}
      <Route
        path="/client-dashboard"
        element={<ClientDashboard />}
      />

      {/* Create Project */}
      <Route
        path="/create-project"
        element={<CreateProject />}
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/client-dashboard" replace />}
      />

    </Routes>
  );
}

export default App;
```
