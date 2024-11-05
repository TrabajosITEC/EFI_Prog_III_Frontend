import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import MyPurchases from '../pages/PurchasesPage';
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
        <Route path="/" element={<HomePage />} />
        <Route path="/myPurchases" element={<Protected> <MyPurchases /> </Protected>} />
        <Route path="/cart" element={<Protected> <Cart /> </Protected>} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/about" element={<Protected> <AboutPage /> </Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

