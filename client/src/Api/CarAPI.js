import React, { useState } from 'react'

function CarAPI() {
    const [carData, setCarData] = useState([])

    return {
        cardata: [carData, setCarData]
    }
}

export default CarAPI