import React, { useState } from 'react'

function EnergyAPI() {
    const [energy, setEnergy] = useState("")

    return {
        EnergyData: [energy, setEnergy]
    }
}

export default EnergyAPI