import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HomeScreen } from './pages/HomeScreen';
import { NavBar } from './pages/NavBar';
import "./styles/app.css"
import { ForgotPasswordPage } from './pages/ForgotPassword';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home-screen' element={<HomeScreen />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
