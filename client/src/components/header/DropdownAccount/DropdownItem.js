import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from 'axios'

import Loadding from '../../utils/Loadding/loadding'

function DropdownItem() {

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [loadding, setLoadding] = useState(false)

    const handleLogout = async () => {
        try {
            setLoadding(true)
            await Axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            setLoadding(false)
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    if (loadding) {
        return <div><Loadding /></div>
    }

    return (
        <>
            <div className='user'>
                <Link to="/profile/profileuser" className='menu-item-user'>
                    <img src={user.avatar} alt="" className='menu-item-avatar' /><span className='menu-item-name'>{user.name}</span>
                </Link>
            </div>
            <div className='setting-user'>
                <Link to="/profile/profileuser" className="menu-item mb-2">
                    <i className="fa-solid fa-id-card mr-2 tag"></i><span className='name'>Trang Cá Nhân</span> <i className="fa-solid fa-angle-right next"></i>
                </Link>
                <Link to="/logout" onClick={handleLogout} className="menu-item mt-2">
                    <i className="fa-solid fa-right-from-bracket mr-2 tag"></i><span className='name'>Đăng Xuất</span> <i className="fa-solid fa-angle-right next"></i>
                </Link>
            </div>
        </>
    )
}

export default DropdownItem