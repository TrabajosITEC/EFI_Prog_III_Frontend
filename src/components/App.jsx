import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MisCompras from '../pages/MisComprasPage';
import GamePage from '../pages/GamePage';
import ProfilePage from '../pages/ProfilePage'
import Protected from './Protected';
import Cart from '../pages/CartPage';

import '../styles/App.css';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/misCompras" element={<Protected> <MisCompras /> </Protected>} />
        <Route path="/cart" element={<Protected> <Cart /> </Protected>} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/about" element={<Protected> <AboutPage /> </Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

