
import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid'

export function HomePage({cart, getCartItems}) {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products")
      setProducts(response.data)
    } 
    getHomeData();
  }, [])

  return (
    <>
      <title>QuickCart</title>

      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={products} getCartItems={getCartItems} />
      </div>
    </>
  )
}