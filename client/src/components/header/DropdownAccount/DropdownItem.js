import React from 'react'
import { Link } from 'react-router-dom'

function DropdownItem(props) {

    return (
        <>
            <Link to="/profile" className="menu-item mb-2">
                <i class="fa-solid fa-id-card mr-2 tag"></i><span className='name'>Trang Cá Nhân</span> <i class="fa-solid fa-angle-right next"></i>
            </Link>
            <Link to="/logout" className="menu-item mt-2">
                <i class="fa-solid fa-right-from-bracket mr-2 tag"></i><span className='name'>Đăng Xuất</span> <i class="fa-solid fa-angle-right next"></i>
            </Link>
        </>
    )
}

export default DropdownItem