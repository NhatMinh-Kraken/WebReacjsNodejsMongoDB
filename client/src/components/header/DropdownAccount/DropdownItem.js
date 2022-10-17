import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from 'axios'

function DropdownItem(props) {

    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth

    const handleLogout = async () => {
        try {
            await Axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <>
            <div className='user'>
                <Link to="/profile/profileuser" className='menu-item-user'>
                    <img src={user.avatar} className='menu-item-avatar' /><span className='menu-item-name'>{user.name}</span>
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