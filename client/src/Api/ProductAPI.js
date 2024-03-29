import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function ProductAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
        const getProducts = async () => {
            const res = await Axios.get(`/api/productsLoad?limit=${page * 9}&${category}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    }, [callback, category, sort, search, page])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductAPI