import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HomeScreen } from "./pages/HomeScreen";
import { NavBar } from "./pages/NavBar";
import { Helmet } from 'react-helmet';
import "./styles/app.css";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Helmet>
        <meta name="description" content="PassMate: Secure and easy password manager for your digital life." />
        <meta name="keywords" content="password manager, secure passwords, digital life, password protection, passmate, passmate netlify, web-passmate, web passmate, passmate web, password storer, password keeper" />
        <meta name="author" content="Suryansh Shrivastava" />
        <meta property="og:title" content="PassMate - Your Password Manager" />
        <meta property="og:description" content="Store your passwords securely and manage them effortlessly with PassMate." />
        <meta property="og:url" content="https://web-passmate.netlify.app" />
        <meta name="linkedin:creator" content="@iamsuru" />
        <title>PassMate - Secure Password Manager</title>
      </Helmet>

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
