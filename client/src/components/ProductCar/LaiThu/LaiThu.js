import React from 'react'
import Footer from '../../footer/Footer'
import Header from '../../header/Header'
import NavHomePage from '../../NavHomePage/NavHomePage'
import FormLaiThu from './FormLaiThu'
import { UseContextProvider } from './FormThongTin/FormThongTin'

function LaiThu() {
  return (
    <>
      <Header />
      <NavHomePage />
      <UseContextProvider>
        <FormLaiThu />
      </UseContextProvider>
      <Footer />
    </>
  )
}

export default LaiThu