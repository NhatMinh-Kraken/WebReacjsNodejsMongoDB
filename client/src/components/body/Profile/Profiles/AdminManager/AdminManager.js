import React, { useEffect, useState } from 'react'
import '../../Profiles/ProfileUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { dispatchGetAllUsers, fetchAllUsers } from '../../../../../redux/action/userAction'

import NotFound from '../../../../utils/NotFound/NotFound'
import EditRoleUser from '../AdminManager/EditRoleUser'

import CreateProduct from '../ProductCarAdmin/CreateProduct'

import ProductCarAdmin from '../ProductCarAdmin/ProductCarAdmin'
import EditProduct from '../ProductCarAdmin/EditProduct'
import CategoryCar from '../CategoryCar/CategoryCar'
import ProfileAllUser from './ProfileAllUser'
import DonLaiThu from './DonLaiThu'



function AdminManager() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const { user, isAdmin, isLogged } = auth
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


    return (
        <>
            <div className='profile_page pt-5'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <Router basename='/manager'>
                                <div style={{ width: isOpen ? "25%" : "9%" }} className='profile_item_controll' >
                                    <div className='profile_item-avatar' style={{ justifyContent: isOpen ? "start" : "center" }} onClick={toggle}>
                                        <img src={avatar ? avatar : user.avatar} alt="" />
                                        <div className='infor_profile' style={{ display: isOpen ? "" : "none" }}>
                                            <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                                            <p>{user.name}</p>
                                        </div>
                                    </div>
                                    <div className='profile_item-infor'>
                                        <div className='infor' style={{ alignItems: isOpen ? "flex-start" : "center" }}>
                                            <NavLink to="/all-user" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All user</span></NavLink>
                                            <NavLink to="/all-category" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Category</span></NavLink>
                                            <NavLink to="/all-product" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Product</span></NavLink>
                                            <NavLink to="/all-laithu" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Lái thử</span></NavLink>
                                        </div>

                                    </div>
                                </div>
                                <div className='profile_item' style={{ width: isOpen ? "74%" : "89%" }}>
                                    <div className='profile_item_header pt-3'>
                                        <h3>Hồ Sơ Của Tôi</h3>
                                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                    </div>
                                    <Switch>
                                        <Route path="/all-user" component={isAdmin ? ProfileAllUser : NotFound} exact />
                                        <Route path="/all-laithu" component={isAdmin ? DonLaiThu : NotFound} exact />
                                        <Route path="/edit_user/:id" component={isAdmin ? EditRoleUser : NotFound} exact />
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

export default AdminManager