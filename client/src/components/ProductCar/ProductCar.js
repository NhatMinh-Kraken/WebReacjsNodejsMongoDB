import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import './ProductCar.scss'
import ProductCarRouter from './ProductCarRouter'

function ProductCar() {
  return (
    <>
      <section>
        <div className='ProductCar'>
          <div className='container'>
            <div className='ProductCar-Title'>
              <h2>Các dòng xe Mercedes-Benz</h2>
            </div>
            <div className='ProductCar-Control'>
              <div className='ProductCar-Section'>
                <Router basename='/product_car'>
                  <ProductCarRouter />
                </Router>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductCar