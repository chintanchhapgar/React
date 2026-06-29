
import './HomePage.css'
import { Header } from '../components/Header'
import { productsData } from '../data/products'
import { Products } from '../components/Products'
export function HomePage() {
  return (
    <>
      <title>QuickCart</title>

      <Header />
      <div className="home-page">
        <div className="products-grid">
          {
            productsData.map((product) => {
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