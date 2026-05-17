import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SharedNote from "./pages/SharedNote";
import EditNote from "./pages/EditNote";
import Insights from "./pages/Insights";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create"
          element={<CreateNote />}
        />

        <Route
          path="/shared/:shareId"
          element={<SharedNote />}
        />

        <Route
          path="/edit/:id"
          element={<EditNote />}
        />

        <Route
          path="/insights"
          element={<Insights />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;