import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from '../src/Api/ProductAPI'
import CategoriesAPI from '../src/Api/CategoryAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const states = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={states}>
            {children}
        </GlobalState.Provider>
    )
}