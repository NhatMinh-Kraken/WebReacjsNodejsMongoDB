import React, { useState } from 'react'

function DaiLyCarAPI() {
    const [clickDaiLy, setClickDaiLy] = useState([])

    return {
        ClickDaiLyData: [clickDaiLy, setClickDaiLy]
    }
}

export default DaiLyCarAPI