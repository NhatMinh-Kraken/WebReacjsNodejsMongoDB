import React, { useState } from 'react'

function CoVanAPI() {
    const [checkCV, setCheckCV] = useState([])

    return {
        CoVanData: [checkCV, setCheckCV]
    }
}

export default CoVanAPI