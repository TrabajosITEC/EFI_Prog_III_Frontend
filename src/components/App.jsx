import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Protected from './Protected';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Protected> <HomePage /> </Protected>  } />
        <Route path="/about" element={<Protected> <AboutPage /> </Protected> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

