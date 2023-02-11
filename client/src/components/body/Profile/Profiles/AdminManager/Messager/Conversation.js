import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../../../../../assets/images/logo.png'
import logoUser from '../../../../../../assets/images/user.png'

import NotificationBadge, { Effect } from 'react-notification-badge'

function Conversation({ conversation, currentUser, currentChat, onlineUser, notification }) {

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [userInf, setUserInf] = useState([])
    const [actives, setActives] = useState(false)

    const token = useSelector(state => state.token)

    const [callback, setCallback] = useState(false)

    //const [onlineFriends, setOnlineFriends] = useState([])

    const [online, setOnline] = useState(false)

    const [notes, setNotes] = useState(false)

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

    // console.log(onlineUser)
    // console.log("userInf:", userInf._id)

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

    //console.log(online)

    // console.log(notification)
    // console.log(userInf._id)

    useEffect(() => {
        user.notification.forEach((e) => {
            if (e.senderId === userInf._id)
            {
                if(e.notification === 1)
                {
                    setNotes(true)
                }
            }
        })
    })

    useEffect(() => {
        if (currentChat === conversation) {
            setNotes(false)
        }
    })


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
                <div>
                    {notes === true
                        ?
                        <div className='noticonf-br'><span className='noticonf'>
                            <NotificationBadge
                                //count={notification?.length}
                                effect={Effect.SCALE}
                            />
                        </span></div>

                        : null
                    }

                </div>

            </div>
        </>
    )
}

export default Conversation