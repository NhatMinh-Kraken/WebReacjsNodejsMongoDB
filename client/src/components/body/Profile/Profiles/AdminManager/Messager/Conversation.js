import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../../../../../assets/images/logo.png'
import logoUser from '../../../../../../assets/images/user.png'

function Conversation({ conversation, currentUser, currentChat, onlineUser }) {

    const [userInf, setUserInf] = useState([])
    const [actives, setActives] = useState(false)

    const token = useSelector(state => state.token)

    const [callback, setCallback] = useState(false)

    //const [onlineFriends, setOnlineFriends] = useState([])

    const [online, setOnline] = useState(false)

    // console.log(conversation)
    // console.log(currentUser._id)

    useEffect(() => {
        const frientId = conversation?.members.find((m) => m !== currentUser._id)

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

    console.log(onlineUser)
    console.log("userInf:", userInf._id)

    useEffect(() => {
        onlineUser.forEach(e => {
            if (e.userId === userInf._id) {
                setOnline(true)
            }
            else {
                setOnline(false)
            }
        })
    })

    console.log(online)

    return (
        <>
            <div className={`conversation-infor ${currentChat == conversation ? "active" : null}`}>
                <div className='conversation-all-infor-img'>
                    <img src={userInf.avatar ? userInf.avatar : logoUser} alt='user' className='img-all-infor' />
                    {
                        online ? <span className='active-note'></span> : null
                    }

                </div>
                <div className='conversation-all-infor-name'>
                    <p>{userInf.name}</p>
                </div>
            </div>
        </>
    )
}

export default Conversation