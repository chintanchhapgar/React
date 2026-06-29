
import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Products } from '../components/Products'

export function HomePage({cart}) {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {
        setProducts(response.data)
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