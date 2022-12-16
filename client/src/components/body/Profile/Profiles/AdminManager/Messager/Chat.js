import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

import vi from 'timeago.js/lib/lang/vi';

function Chat({ userSender, messager, own }) {

    const auth = useSelector(state => state.auth)
    const { user } = auth

    const [userAdmin, setUserAdmin] = useState([])

    console.log(userSender)
    console.log(messager)

    timeago.register('vi', vi);

    const [isShow, setIsShow] = useState(false)

    const handleHover = () => {
        setIsShow(true)
    }

    const handleNotHover = () => {
        setIsShow(false)
    }

    console.log(user)

    return (
        <>
            <div className={own ? "chat-body-mess-own" : "chat-body-mess"}>
                <div className='chat-body-mess-img'>
                    {own ? "" : <img src={userSender.avatar} alt="user" />}
                    {own ? "" : <span className='active-note'></span>}
                </div>
                {own ? <div className='chat-body-time'>
                    <div className={`chat-body-mess-time ${isShow ? "d-block" : "d-none"}`}>
                        <p><TimeAgo
                            datetime={messager.createdAt}
                            locale='vi' />
                        </p>
                    </div>
                </div>
                    : ""}
                <div className='chat-body-mess-text' onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                    <div className='chat-body-mess-text-bg'>
                        <p>{messager.text}</p>
                    </div>
                </div>
                {own ? ""
                    : <div className='chat-body-time'>
                        <div className={`chat-body-mess-time ${isShow ? "d-block" : "d-none"}`}>
                            <p><TimeAgo
                                datetime={messager.createdAt}
                                locale='vi' />
                            </p>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default Chat