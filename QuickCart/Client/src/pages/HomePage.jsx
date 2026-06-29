
import axios from 'axios'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Products } from '../components/Products'

export function HomePage() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data)
      })

    axios.get("http://localhost:3000/api/cart-items")
      .then((response) => {
        setCart(response.data)
      })

  }, [])

  return (
    <>
      <title>QuickCart</title>

      <Header cart={cart}/>
      <div className="home-page">
        <div className="products-grid">
          {
            products.map((product) => {
              return (
                <Products key={product.id} props={product} />
              )
            })
          }

        </div>
      </div>
    </>
  )
}