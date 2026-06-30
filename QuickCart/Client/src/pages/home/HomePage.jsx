
import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid'

export function HomePage({cart, getCartItems, products , setProducts}) {



  return (
    <>
      <title>QuickCart</title>

      <Header cart={cart} products={products} setProducts={setProducts} showSearchBar={true} />
      <div className="home-page">
        <ProductsGrid products={products} getCartItems={getCartItems} />
      </div>
    </>
  )
}