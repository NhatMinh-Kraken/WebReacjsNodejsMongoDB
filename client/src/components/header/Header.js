import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import logo from '../../assets/images/logo.png'
import './Search.scss'
import '../scss/scss.scss'
import './DropdownAccount/DropdownAccount.scss'
import './ReposiveHeader.css'
import Navbar from './DropdownAccount/Navbar'
import NavItem from './DropdownAccount/NavItem'
import DropdownMenu from './DropdownAccount/DropdownMenu'

import { useSelector } from 'react-redux'

function Header() {

    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth

    const userLink = () => {
        return (
            // <button type='button' className='button-login mx-1 '>
            //     <img src={user.avatar} className="avatar" alt='Trang Cá Nhân' />
            // </button>
            <Navbar>
                <NavItem>
                    <DropdownMenu />
                </NavItem>
            </Navbar>
        )
    }

    return (

        <div className='home-header'>
            <div className='home-header-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='left-header col-4'>
                            <div className='logo-header'>
                                <div className='logo-header-img'>
                                    <img src={logo} />
                                </div>
                            </div>
                            <div className='title-header'><Link to="/"><h4>Mercedes-Benz</h4></Link></div>
                        </div>
                        <div className='left-none-header col-5 '>
                            <div className='input-header'>
                                <div className='input-header-search'>
                                    <input className='form-control' type="search" tabIndex="-1" placeholder='Từ khóa tìm kiếm / OnlineCode từ công cụ chọn cấu hình xe' pattern=".*\S.*" required />
                                    <button type='button' className='btn btn-search'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='center-header col-2'>
                            <div className='center-header-icon'>
                                <button type='button' className='button-con mx-1 '><i className='fab fa-facebook-f'></i></button>
                                <button type='button' className='button-con mx-1 '><i className='fab fa-google'></i></button>
                                <button type='button' className='button-con mx-1 '><i className='fab fa-twitter'></i></button>
                                <button type='button' className='button-con mx-1 '><i className='fab fa-github'></i></button>
                            </div>
                        </div>
                        {/* <Navbar>
                        <NavItem>
                            <DropdownMenu />
                        </NavItem>
                    </Navbar> */}
                        <div className='right-header col-1'>
                            <div className='right-header-login'>
                                {
                                    isLogged ? userLink() : <button type='button' className='button-login mx-1 '><Link to="/login"><i className="far fa-user"></i></Link></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header