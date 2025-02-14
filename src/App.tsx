import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomeScreen } from "./pages/HomeScreen";
import { NavBar } from "./pages/NavBar";
import "./styles/app.css";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-screen"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute>
              <ForgotPasswordPage />
            </ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

export default App;
