import React, { useState } from 'react'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

import AdminPng from '../../assets/images/admin.png'

import vi from 'timeago.js/lib/lang/vi';

function FooterChat({ messager, own }) {
    timeago.register('vi', vi);

    const [isShow, setIsShow] = useState(false)

    const handleHover = () => {
        setIsShow(true)
    }

    const handleNotHover = () => {
        setIsShow(false)
    }
    return (
        <>
            <div className={own ? "chat-body-receiver-own" : "chat-body-receiver"}>
                <div className='chat-body-mess-img'>
                    {own ? "" : <img src={AdminPng} alt="admin" />}
                    {own ? "" : <span className='active-note'></span>}
                </div>
                {own ?
                    <div className='chat-time-form'>
                        <div className={`chat-time ${isShow ? "d-block" : "d-none"}`}>
                            <TimeAgo
                                datetime={messager.createdAt}
                                locale='vi' />
                        </div>
                    </div>
                    :
                    null}
                <div className='chat-text-body' onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                    <p>{messager.text}</p>
                </div>

                {own ?
                    null
                    :
                    <div className='chat-time-form'>
                        <div className={`chat-time ${isShow ? "d-block" : "d-none"}`}>
                            <TimeAgo
                                datetime={messager.createdAt}
                                locale='vi' />
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default FooterChat