import React, { useState } from 'react'

function TimeAndDateAPI() {
    const [times, setTimes] = useState([])
    const [dates, setDates] = useState([]);

    return {
        TimesData: [times, setTimes],
        DateData: [dates, setDates]
    }
}

export default TimeAndDateAPI