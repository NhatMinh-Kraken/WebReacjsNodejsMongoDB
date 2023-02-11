import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from 'axios'

import Loadding from '../../utils/Loadding/loadding'

import { io } from 'socket.io-client'

function DropdownItem() {

    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [loadding, setLoadding] = useState(false)

    const socket = useRef()

    const [notification, setNotification] = useState(null);
    // const [callback, setCallback] = useState(false)

    const [checkNoti, setCheckNoti] = useState(false)
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getNotification", (data) => {
            setNotification(data)
        });
    }, [callback])


    useEffect(() => {
        user.notification.forEach((e) => {
            if (e.senderId === notification?.senderId) {
                if (e.notification === 1) {
                    setCheckNoti(true)
                }
            }
        })
    }, [user])

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

    const handleNoti = async () => {
        try {
            await Axios.post(`/api/noti/${user._id}`, {
                receiverNotiId: notification?.senderId,
                notification: 0
            })
            window.location.href = "/all-messager"
            setCheckNoti(false)

        } catch (err) {
            console.log(err)
        }
    }


    const AdminManage = () => {
        return (
            <>
                <Link to="/manager/all-user" className="menu-item mb-2">
                    <i className="fa-solid fa-people-roof mr-2 tag"></i><span className='name'>Quản lý</span> <i className="fa-solid fa-angle-right next"></i>
                </Link>
                <Link to="/all-messager" className="menu-item mb-2" onClick={handleNoti}>
                    <i className="fa-solid fa-message mr-2 tag"></i><span className='name'>Messager</span>
                    {
                        checkNoti == true
                            ?
                            <div className='notes'>
                                <div className='note-mess'>
                                    <span>1</span>
                                </div>
                            </div>
                            : null
                    }

                    <i className="fa-solid fa-angle-right next"></i>

                </Link>

            </>
        )
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
                {
                    isAdmin ? AdminManage() : null
                }
                <Link to="/logout" onClick={handleLogout} className="menu-item mt-2">
                    <i className="fa-solid fa-right-from-bracket mr-2 tag"></i><span className='name'>Đăng Xuất</span> <i className="fa-solid fa-angle-right next"></i>
                </Link>
            </div>
        </>
    )
}

export default DropdownItem