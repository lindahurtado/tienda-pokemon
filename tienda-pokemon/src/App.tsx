import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import PokemonDetail from './pages/PokemonDetail'
import { useState } from 'react'

function App() {

  const isAuthenticated = !!localStorage.getItem('user');
  const [login, setLogin] = useState(false);

  return (
    <div id='root'>  
      <CartProvider>
        <Router>
          <Header />
          <div className='main-content'>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/' element={<HomePage login={login} setLogin={setLogin} />} />
              <Route path='/pokemon/:id/' element={<PokemonDetail login={login} setLogin={setLogin}/>} />

              <Route path='/cart' element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} />

              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </div>
  )
}

export default App
