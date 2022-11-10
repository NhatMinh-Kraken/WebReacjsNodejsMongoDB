import React, { useEffect, useState } from 'react'
import '../Profiles/ProfileUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { dispatchGetAllUsers, fetchAllUsers } from '../../../../redux/action/userAction'
import ProfileItem from './ProfileItem'
import NotFound from '../../../utils/NotFound/NotFound'
import ProfileAllUser from './ProfileAllUser'
import EditRoleUser from './EditRoleUser'
import ChangePassword from '../ChangePassword/ChangePassword'
import CategoryCar from './CategoryCar.js/CategoryCar'
import CreateProduct from './ProductCarAdmin/CreateProduct'

import Address from '../Address/Address'
import ProductCarAdmin from './ProductCarAdmin/ProductCarAdmin'
import EditProduct from './ProductCarAdmin/EditProduct'


function ProfileUser() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const { isLogged } = auth

    const { user, isAdmin } = auth
    const [avatar, setAvatar] = useState(false)

    const [callback, setCallback] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])


    //items

    // const menuItemUser = [
    //     {
    //         path: "/profileuser",
    //         name: "profile",
    //         icon: "fa-solid fa-user",
    //     },
    //     {
    //         path: "/address",
    //         name: "address",
    //         icon: "fa-solid fa-location-dot",
    //     },
    //     {
    //         path: "/changePassword",
    //         name: "changePassword",
    //         icon: "fa-solid fa-key",
    //     }
    // ]

    // const menuItemAdmin = [
    //     {
    //         path: "/all-user",
    //         name: "All user",
    //         icon: "fa-solid fa-list",
    //     },
    //     {
    //         path: "/all-category",
    //         name: "All Category",
    //         icon: "fa-solid fa-list",
    //     },
    //     {
    //         path: "/create-product",
    //         name: "Create Product",
    //         icon: "fa-solid fa-list",
    //     }
    // ]

    // const menuItem = [
    //     {
    //         path: "#",
    //         name: "order",
    //         icon: "fa-solid fa-cart-shopping",
    //     },
    //     {
    //         path: "#",
    //         name: "bank",
    //         icon: "fa-sharp fa-solid fa-building-columns",
    //     },
    //     {
    //         path: "#",
    //         name: "notification",
    //         icon: "fa-solid fa-bell",
    //     }
    // ]
    //


    const alluser = () => {
        return (
            <>
                <NavLink to="/all-user" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All user</span></NavLink>
                <NavLink to="/all-category" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Category</span></NavLink>
                <NavLink to="/all-product" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Product</span></NavLink>
            </>
        )
    }

    return (
        <>
            <div className='profile_page pt-5 pb-5'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <Router basename='/profile'>
                                <div style={{ width: isOpen ? "25%" : "9%" }} className='profile_item_controll' >
                                    <div className='profile_item-avatar' style={{ justifyContent: isOpen ? "start" : "center" }} onClick={toggle}>
                                        <img src={avatar ? avatar : user.avatar} alt=""  />
                                        <div className='infor_profile' style={{ display: isOpen ? "" : "none" }}>
                                            <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                                            <p>{user.name}</p>
                                        </div>
                                    </div>
                                    <div className='profile_item-infor'>
                                        <div className='infor' style={{ alignItems: isOpen ? "flex-start" : "center" }}>
                                            <NavLink to="/profileuser" className={({ isActive }) => (isActive ? 'profile pb-2 active' : 'profile pb-2')}><i className="fa-solid fa-user"></i><span style={{ display: isOpen ? "" : "none" }}>profile</span></NavLink>
                                            {
                                                isAdmin ? alluser() : null
                                            }
                                            <NavLink to="/address" className={({ isActive }) => (isActive ? 'address pb-2 active' : 'address pb-2')}><i className="fa-solid fa-location-dot"></i><span style={{ display: isOpen ? "" : "none" }}>address</span></NavLink>
                                            <NavLink to="/changePassword" className={({ isActive }) => (isActive ? 'changePassword pb-2 active' : 'changePassword pb-2')} ><i className="fa-solid fa-key"></i><span style={{ display: isOpen ? "" : "none" }}>changePassword</span></NavLink>
                                        </div>
                                        <div className='infor_additional' style={{ alignItems: isOpen ? "flex-start" : "center" }}>
                                            <a href="#" className='order pb-2'><i className="fa-solid fa-cart-shopping"></i><span style={{ display: isOpen ? "" : "none" }}>order</span></a>
                                            <a href="#" className='bank pb-2'><i className="fa-sharp fa-solid fa-building-columns"></i><span style={{ display: isOpen ? "" : "none" }}>bank</span></a>
                                            <a href="#" className='notification pb-2'><i className="fa-solid fa-bell"></i><span style={{ display: isOpen ? "" : "none" }}>notification</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className='profile_item' style={{ width: isOpen ? "74%" : "89%" }}>
                                    <div className='profile_item_header pt-3'>
                                        <h3>Hồ Sơ Của Tôi</h3>
                                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                    </div>
                                    <Switch>
                                        <Route path="/profileuser" component={isLogged ? ProfileItem : NotFound} exact />
                                        <Route path="/all-user" component={isAdmin ? ProfileAllUser : NotFound} exact />
                                        <Route path="/edit_user/:id" component={isAdmin ? EditRoleUser : NotFound} exact />
                                        <Route path="/address" component={isLogged ? Address : NotFound} exact />
                                        <Route path="/changePassword" component={isLogged ? ChangePassword : NotFound} exact />
                                        <Route path="/all-category" component={isAdmin ? CategoryCar : NotFound} exact />
                                        <Route path="/all-product" component={isAdmin ? ProductCarAdmin : NotFound} exact />
                                        <Route path="/create-product" component={isAdmin ? CreateProduct : NotFound} exact />
                                        <Route path="/edit-product/:id" component={isAdmin ? EditProduct : NotFound} exact />
                                    </Switch>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser