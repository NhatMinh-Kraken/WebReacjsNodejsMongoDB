import React, { useEffect, useState } from 'react'
import '../Profiles/ProfileUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { dispatchGetAllUsers, fetchAllUsers } from '../../../../redux/action/userAction'


function ProfileUser() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const { user, isAdmin } = auth
    const [avatar, setAvatar] = useState(false)

    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])


    const alluser = () => {
        return (
            <NavLink to="/all-user" className={({ isActive }) => (isActive ? 'profile pb-2 active' : 'profile pb-2')}><i className="fa-solid fa-list"></i><span>All user</span></NavLink>
        )
    }

    return (
        <>
            <div className='profile_item_controll col-sm-3'>
                <div className='profile_item-avatar'>
                    <img src={avatar ? avatar : user.avatar} alt="" />
                    <div className='infor_profile'>
                        <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                        <p>{user.name}</p>
                    </div>
                </div>
                <div className='profile_item-infor'>
                    <div className='infor'>
                        <NavLink to="/profileuser" className={({ isActive }) => (isActive ? 'profile pb-2 active' : 'profile pb-2')}><i className="fa-solid fa-user"></i><span>profile</span></NavLink>
                        {
                            isAdmin ? alluser() : null
                        }
                        <NavLink to="/address" className={({ isActive }) => (isActive ? 'address pb-2 active' : 'address pb-2')}><i className="fa-solid fa-location-dot"></i><span>address</span></NavLink>
                        <NavLink to="/changePassword" className={({ isActive }) => (isActive ? 'changePassword pb-2 active' : 'changePassword pb-2')} ><i className="fa-solid fa-key"></i><span>changePassword</span></NavLink>
                    </div>
                    <div className='infor_additional'>
                        <a href="#" className='order pb-2'><i className="fa-solid fa-cart-shopping"></i><span>order</span></a>
                        <a href="#" className='bank pb-2'><i className="fa-sharp fa-solid fa-building-columns"></i><span>bank</span></a>
                        <a href="#" className='notification pb-2'><i className="fa-solid fa-bell"></i><span>notification</span></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser