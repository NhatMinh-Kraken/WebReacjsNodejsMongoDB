import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import './ProductCar.scss'
import ProductCarContr from './ProductCarContr'

function ProductCar() {
  return (
    <>
      <section>
        <div className='ProductCar' data-aos="fade-up"
          data-aos-duration="3000">
          <div className='container'>
            <div className='ProductCar-Title'>
              <h2>Các dòng xe Mercedes-Benz</h2>
            </div>
            <div className='ProductCar-Control'>
              <div className='ProductCar-Section'>
                <Router basename='/product_car'>
                  <ProductCarContr />
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