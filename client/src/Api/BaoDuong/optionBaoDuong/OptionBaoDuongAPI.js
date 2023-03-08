import React, { useState } from 'react'

function OptionBaoDuongAPI() {
    const [check, setCheck] = useState([])

    return {
        OptionBaoDuongData: [check, setCheck]
    }
}

export default OptionBaoDuongAPI