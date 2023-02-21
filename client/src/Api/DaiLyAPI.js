import React, { useState } from 'react'

function DaiLyAPI() {
    const [dailyData, setDaiLyData] = useState([]);

    return {
        dailyData: [dailyData, setDaiLyData]
    }
}

export default DaiLyAPI