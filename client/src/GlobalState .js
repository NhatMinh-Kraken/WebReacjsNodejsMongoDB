import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from '../src/Api/ProductAPI'
import CategoriesAPI from '../src/Api/CategoryAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProviderNew = ({children}) =>{

    const states = {
        productsAPI: ProductsAPI(),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={states}>
            {children}
        </GlobalState.Provider>
    )
}