import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HomeScreen } from './pages/HomeScreen';
import { NavBar } from './pages/NavBar';
import "./styles/app.css"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/passmate/home-screen' element={<HomeScreen />} />
      </Routes>
    </>
  );
}

export default App;
