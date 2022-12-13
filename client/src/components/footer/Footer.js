import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../utils/constant'
import './Footer.scss'

import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import logo from '../../assets/images/logo.png'
import send from '../../assets/images/send-message.png'
import { useSelector } from 'react-redux'
import Axios from 'axios'



function Footer() {

    const auth = useSelector(state => state.auth)
    const { user } = auth

    const [clickChat, setClickChat] = useState(false)
    const [clickChatIcon, setClickChatIcon] = useState(false)

    const [currentEmoji, setCurrentEmoji] = useState()

    const inputRef = createRef()
    const [message, setMessage] = useState('')

    const handleClick = () => {
        setClickChat(true)
    }

    const handleClose = () => {
        setClickChat(false)
    }

    const handleClickIcon = () => {
        setClickChatIcon(true)
    }

    const handleCloseIcon = () => {
        setClickChatIcon(false)
    }

    const textareaRef = useRef(null);
    const [scHeight, setScHeight] = useState("")

    const MIN_TEXTAREA_HEIGHT = 26;

    const handleHeight = (e) => {
        setScHeight(e.target.value)
    }

    useEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [scHeight])

    //emoji
    // const pickEmoji = (e, { emoji }) => {
    //     const ref = inputRef.current;
    //     ref.focus();
    //     const start = message.substring(0, ref.selectionStart);
    //     const end = message.substring(ref.selectionStart);
    //     const text = start + emoji + end;
    //     setMessage(text);
    //     setCurrentEmoji(start.length + emoji.length);
    // }
    //

    useEffect(() => {
        const getConvesations = async () => {
            try {
                const res = await Axios.get(`/api/convertion/${user._id}`)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        getConvesations()
    }, [user._id])


    return (
        <>
            <div className='Footer-Web pt-3 pb-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='left-Footer-Web col-4'>
                            <div className='logo-header'>
                                <div className='logo-header-img'>
                                    <img src={logo} alt="" />
                                </div>
                            </div>
                            <div className='title-header'><Link to={path.HOME}><h4>Mercedes-Benz</h4></Link></div>
                        </div>
                        <div className='left-none-Footer-Web col-6 '>
                            <p>© 2022-2024. Toàn bộ bản quyền thuộc Nguyễn Nhật Minh - D19PM02</p>
                            <span>The best or nothing – Tốt nhất hoặc không có gì</span>
                        </div>

                        <div className='right-Footer-Web col-2'>
                            <div className={`right-header-chat-footer ${clickChat === true ? "d-none" : "d-block"}`} onClick={handleClick}>
                                <div className='right-header-chat'>
                                    <i className="fa-brands fa-rocketchat"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`right-header-chat-form ${clickChat === true ? "d-block" : "d-none"}`}>
                    <div className='chat-form'>
                        <div className='right-header-chat-form-header'>
                            <div className='chatbox-left col-8'>
                                <div className='chatbox-icon'>
                                    <div className='chatbox-icon-img'>
                                        <i className="fa-solid fa-robot"></i>
                                    </div>
                                </div>
                                <div className='chatbox-admin'>
                                    <div className='chatbox-admin-title'>
                                        <span>Admin</span>
                                        <p>Activate</p>
                                    </div>
                                </div>
                            </div>
                            <div className='chatbox-close col-4' onClick={handleClose}>
                                <div className='chatbox-close-form'>
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </div>
                        <div className='right-header-chat-form-body' id="style-2">
                            <div className='form-chat-body'>
                                <div className='chat-body-receiver'>
                                    <div className='chat-time-form'>
                                        <div className='chat-time'>8:59</div>
                                    </div>
                                    <div className='chat-text-body'>
                                        <p>hello Huyền</p>
                                    </div>
                                </div>

                                <div className='chat-body-sender'>
                                    <div className='chat-body-img-form'>
                                        <img src={logo} className='chat-body-img' alt='receiver' />
                                    </div>
                                    <div className='chat-text-body'>
                                        <p>hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minh hello Minhhello Minhhello Minhhello Minhhello Minhhello Minhhello Minhhello Minh max-width: 200px; max-width: 200px; max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;max-width: 200px;</p>
                                    </div>
                                    <div className='chat-time-form'>
                                        <div className='chat-time'>8:59</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-header-chat-form-footer'>
                            <div className='chat-form-footer-border'>
                                <div className='chat-form-footers col-11 p-0'>
                                    <div className='form-chats d-flex col-12 p-0'>
                                        <div className='chat-form-footer col-10 p-0'>
                                            <textarea rows="1" className='input-chat' ref={textareaRef} style={{
                                                minHeight: MIN_TEXTAREA_HEIGHT,
                                                resize: "none",
                                                maxHeight: "120px",
                                                overflow: "auto"

                                            }} onChange={handleHeight} value={scHeight} placeholder="Aa" />

                                        </div>

                                        <div className='iconChat col-2 p-0' onClick={handleClickIcon}><i className="fa-solid fa-face-smile"></i></div>
                                    </div>
                                </div>
                                <div className='chat-form-footer-send col-1 p-0'>
                                    <button>
                                        <img src={send} alt='send' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='EmojiPickerChat-form'>
                <div className={`EmojiPickerChat ${clickChatIcon === true ? 'd-block' : 'd-none'}`}>
                    <Picker data={data} previewPosition="none" />
                    <button className={`close-icon ${clickChatIcon === false ? 'd-none' : 'd-block'}`} onClick={handleCloseIcon}>
                        <div className='close-icon-x'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Footer