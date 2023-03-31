import React, { useState } from 'react'

function TimeAndDateAPI() {
    const [times, setTimes] = useState([])
    const [dates, setDates] = useState([]);
    const [datesNoFormat, setDatesNoFormat] = useState([])

    return {
        TimesData: [times, setTimes],
        DateData: [dates, setDates],
        DateNoFData: [datesNoFormat, setDatesNoFormat]
    }
}

export default TimeAndDateAPI