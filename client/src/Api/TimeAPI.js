import React, { useState } from 'react'

function TimeAPI() {
    const [timeData, setTimeData] = useState([]);

    return {
        timeData: [timeData, setTimeData]
    }
}

export default TimeAPI