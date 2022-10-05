import React from 'react'
import { Link } from 'react-router-dom'

function DropdownItem(props) {

    return (
        <Link to="/login" className="menu-item">
            {props.children}
        </Link>
    )
}

export default DropdownItem