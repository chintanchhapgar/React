
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'

function App() {
  
  const getCartItems = async () => {
    const response = await axios.get("/api/cart-items?expand=product")
    setCart(response.data)
  }

  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCartItems();
  }, [])

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} getCartItems={getCartItems} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>

  )
}

export default App
