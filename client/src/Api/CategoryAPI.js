import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function CategoryAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const res = await Axios.get('/api/categorysLimit')
            setCategories(res.data)
        }
        getCategories()
    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoryAPI