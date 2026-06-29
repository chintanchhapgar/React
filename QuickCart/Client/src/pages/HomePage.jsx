
import axios from 'axios'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Products } from '../components/Products'

export function HomePage() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data)
      })
  }, [])

  return (
    <>
      <title>QuickCart</title>

      <Header />
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