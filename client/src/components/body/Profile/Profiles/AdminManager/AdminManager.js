import React, { useEffect, useState } from 'react'
import '../../Profiles/ProfileUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Switch, BrowserRouter as Router, useHistory } from 'react-router-dom'
import { dispatchGetAllUsers, fetchAllUsers } from '../../../../../redux/action/userAction'

import NotFound from '../../../../utils/NotFound/NotFound'
import EditRoleUser from '../AdminManager/EditRoleUser'

import CreateProduct from '../ProductCarAdmin/CreateProduct'

import ProductCarAdmin from '../ProductCarAdmin/ProductCarAdmin'
import EditProduct from '../ProductCarAdmin/EditProduct'
import CategoryCar from '../CategoryCar/CategoryCar'
import ProfileAllUser from './ProfileAllUser'
import DonLaiThu from './DonLaiThu'
import { Button, Modal } from 'react-bootstrap'
import LoaiPhuKien from '../BaoDuong/LoaiBaoDuong'
import AllDaiLy from '../../DaiLy/AllDaiLy'
import OptionBaoDuong from '../BaoDuong/optionBaoDuong/OptionBaoDuong'
import DonBaoDuong from '../BaoDuong/DonBaoDuong/DonBaoDuong'



function AdminManager() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const history = useHistory()

    const { user, isAdmin, isLogged } = auth
    const [avatar, setAvatar] = useState(false)

    const [callback, setCallback] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [showPK, setShowPK] = useState(false)
    const [showBD, setShowBD] = useState(false)

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])


    const handleShow = () => {
        setShow(true)
    }

    const handleShowBaoDuong = () => {
        setShowBD(true)
    }

    const handleCloseBaoDuong = () => {
        setShowBD(false)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleClick = () => {
        setShow(false)
        window.location.href = '/manager/all-category'
    }


    return (
        <>

            <div className='profile_page pt-5'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <Router basename='/manager'>
                                <Modal
                                    show={show}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header>
                                        <Modal.Title>Lựu chọn chức năng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='text-danger'>
                                        <div className='buttonChucNang d-flex'>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='ClickChucNang d-flex justify-content-center col-6'>
                                                        <NavLink onClick={handleClose} to="/all-category" className="category"><i className="fa-solid fa-list"></i><span>Category</span></NavLink>
                                                    </div>
                                                    <div className='ClickChucNang d-flex justify-content-center col-6'>
                                                        <NavLink onClick={handleClose} to="/all-product" className="category"><i className="fa-solid fa-list"></i><span>Product</span></NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit" onClick={handleClose}>Thoát</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal
                                    show={showBD}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header>
                                        <Modal.Title>Lựu chọn chức năng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='text-danger'>
                                        <div className='buttonChucNang d-flex'>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='ClickChucNang d-flex justify-content-center col-6 pb-2'>
                                                        <NavLink onClick={handleCloseBaoDuong} to="/all-loai-baoduong" className="category"><i className="fa-solid fa-list"></i><span>Loại bảo dưỡng</span></NavLink>
                                                    </div>
                                                    <div className='ClickChucNang d-flex justify-content-center col-6 pb-2'>
                                                        <NavLink onClick={handleCloseBaoDuong} to="/all-option-baoduong" className="category"><i className="fa-solid fa-list"></i><span>Option Bảo dưỡng</span></NavLink>
                                                    </div>
                                                    <div className='ClickChucNang d-flex justify-content-center col-6 pb-2'>
                                                        <NavLink onClick={handleCloseBaoDuong} to="/all-don-baoduong" className="category"><i className="fa-solid fa-list"></i><span>Đơn Bảo dưỡng</span></NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" type="submit" onClick={handleCloseBaoDuong}>Thoát</Button>
                                    </Modal.Footer>
                                </Modal>


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
                                            {/* <NavLink to="/all-messager" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-message"></i><span style={{ display: isOpen ? "" : "none" }}>Messager</span> */}
                                            {/* </NavLink> */}
                                            {/* <div className='note-mess'>
                                                <span>1</span>
                                            </div> */}

                                            <NavLink to="/all-user" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All user</span></NavLink>
                                            <NavLink to="/all-laithu" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>All Lái thử</span></NavLink>
                                            <NavLink to="/all-daily" className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>Địa chỉ đại lý</span></NavLink>
                                            <NavLink to="/allproduct" onClick={handleShow} className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>Product</span></NavLink>
                                            {/* <NavLink to="/allphukien" onClick={handleShowPhuKien} className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>Phụ kiện</span></NavLink> */}
                                            <NavLink to="/allbaoduong" onClick={handleShowBaoDuong} className={({ isActive }) => (isActive ? 'category pb-2 active' : 'category pb-2')} style={{ width: isOpen ? "220px" : "48px" }}><i className="fa-solid fa-list"></i><span style={{ display: isOpen ? "" : "none" }}>Bảo dưỡng</span></NavLink>
                                        </div>

                                    </div>
                                </div>
                                <div className='profile_item' style={{ width: isOpen ? "74%" : "89%" }}>
                                    <div className='profile_item_header pt-3'>
                                        <h3>Hồ Sơ Của Tôi</h3>
                                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                    </div>
                                    <Switch>
                                        {/* <Route path="/all-messager" component={isAdmin ? ProfileAllMessagaer : NotFound} exact /> */}
                                        <Route path="/all-user" component={isAdmin ? ProfileAllUser : NotFound} exact />
                                        <Route path="/all-laithu" component={isAdmin ? DonLaiThu : NotFound} exact />
                                        <Route path="/edit_user/:id" component={isAdmin ? EditRoleUser : NotFound} exact />
                                        <Route path="/all-category" component={isAdmin ? CategoryCar : NotFound} exact />
                                        <Route path="/all-product" component={isAdmin ? ProductCarAdmin : NotFound} exact />
                                        <Route path="/create-product" component={isAdmin ? CreateProduct : NotFound} exact />
                                        <Route path="/edit-product/:id" component={isAdmin ? EditProduct : NotFound} exact />
                                        <Route path="/all-loai-baoduong" component={isAdmin ? LoaiPhuKien : NotFound} exact />
                                        <Route path="/all-option-baoduong" component={isAdmin ? OptionBaoDuong : NotFound} exact />
                                        <Route path="/all-daily" component={isAdmin ? AllDaiLy : NotFound} exact />
                                        <Route path="/all-don-baoduong" component={isAdmin ? DonBaoDuong : NotFound} exact />
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