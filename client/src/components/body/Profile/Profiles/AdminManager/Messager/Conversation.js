import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../../../../../assets/images/logo.png'
import logoUser from '../../../../../../assets/images/user.png'

function Conversation({ conversation, currentUser }) {

    const [userInf, setUserInf] = useState([])
    const [actives, setActives] = useState(false)

    const token = useSelector(state => state.token)

    console.log(currentUser._id)

    useEffect(() => {
        const frientId = conversation.members.find((m) => m !== currentUser._id)

        //console.log("frientId:", frientId)

        const getUser = async () => {
            try {
                const res = await Axios.get(`/user/get_user/${frientId}`)
                setUserInf(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [currentUser, conversation])

    // console.log("userInf:", userInf)

    return (
        <>
            <div className='conversation-infor'>
                <div className='conversation-all-infor-img'>
                    <img src={userInf.avatar ? userInf.avatar : logoUser} alt='user' className='img-all-infor' />
                    <span className='active-note'></span>
                </div>
                <div className='conversation-all-infor-name'>
                    <p>{userInf.name}</p>
                </div>
            </div>
        </>
    )
}

export default Conversation