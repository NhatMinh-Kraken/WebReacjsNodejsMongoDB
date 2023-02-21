import React, { useState } from 'react'

function UserAPI() {
    const [userData, setUserData] = useState([]);

    return {
        userData: [userData, setUserData]
    }
}

export default UserAPI