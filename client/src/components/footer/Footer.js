import React, { createRef, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { path } from '../utils/constant'
import './Footer.scss'

import logo from '../../assets/images/logo.png'
import send from '../../assets/images/send-message.png'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import FooterChat from './FooterChat'

import { io } from 'socket.io-client'

import InputEmoji from 'react-input-emoji'
import { toast } from 'react-toastify'


function Footer() {

    const auth = useSelector(state => state.auth)
    const { user, isLogged, isAdmin } = auth

    const token = useSelector(state => state.token)

    const [callback, setCallback] = useState(false)

    const [conversation, setConversation] = useState([])

    const [messager, setMessager] = useState([])

    const [userSocketId, setUserSocketId] = useState([])

    const [arrivalMessager, setArrivalMessager] = useState(null)

    const [conversationMes, setConversationMes] = useState(null)

    const socket = useRef()
    const [userAdmin, setUserAdmin] = useState([])
    const [clickChat, setClickChat] = useState(false)

    const [converNew, setConverNew] = useState([])

    // const [message, setMessage] = useState('')

    const scrollRef = useRef(null);

    const handleClick = () => {
        setClickChat(true)
    }

    const handleClose = () => {
        setClickChat(false)
    }

    const [scHeight, setScHeight] = useState("")



    const handleHeight = (scHeight) => {
        setScHeight(scHeight)
    }

    //all user

    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        const getAlUser = async () => {
            try {
                const res = await Axios.get("/user/all_infor")
                setAllUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAlUser()
    }, [callback])

    //console.log(allUser)

    //console.log(user)

    //lấy id admin


    useEffect(() => {
        allUser.forEach((m) => {
            if (m.role === 1) {
                setUserAdmin(m)
            }
        })
    }, [allUser])

    //console.log(userAdmin._id)

    const sumbitConversation = async () => {
        try {
            const res = await Axios.post('/api/convertion', { senderId: user._id, receiverId: userAdmin._id }, {
                headers: { Authorization: token }
            })
            setConverNew(res.data)
            setCallback(!callback)
        } catch (err) {
            console.log(err)
        }
    }

    // //tạo conversation
    // const createConversation = async () => {
    //     try {
    //         await Axios.post('/api/convertion', { senderId: user._id, receiverId: userAdmin._id })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        const getConvesations = async () => {
            try {
                const res = await Axios.get(`/api/convertion/${user._id}`)
                setConversation(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConvesations()
    }, [user._id, callback])

    //console.log(conversation)

    useEffect(() => {
        conversation.map((m) => {
            setConversationMes(m)
        })
    })

    //console.log(conversationMes)

    //mess


    // lấy tất cả dữ liệu mess
    useEffect(() => {
        const getMessager = async () => {
            try {
                const res = await Axios.get(`/api/messgae/${conversationMes?._id}`)
                setMessager(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessager()
    }, [conversationMes])

    // console.log(messager)


    //

    //Scroll to bottom mess
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [messager]);


    //socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            //console.log(data)
            setArrivalMessager({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [callback]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setUserSocketId(users)
        });
    }, [user]);

    // console.log(arrivalMessager)
    // console.log(conversationMes)

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setUserSocketId(users)
        });
    }, [user]);

    useEffect(() => {
        arrivalMessager &&
            conversationMes?.members.includes(arrivalMessager?.senderId) &&
            setMessager((prev) => [...prev, arrivalMessager]);
    }, [arrivalMessager, conversationMes]);

    useEffect(() => {
        socket.current.emit("addConversation", converNew)
    }, [converNew])
    //

    // console.log(converNew)
    const receiverNotiId = conversationMes?.members.find((member) => member !== user._id)
    //noti
    const noti = async () => {
        try {
            await Axios.post("/api/noti", {
                id: receiverNotiId,
                senderId: user._id,
                notification: 1
            })
        } catch (err) {
            console.log(err)
        }
    }

    //send mess
    const sendMess = async (e) => {
        e.preventDefault();

        // if (!isLogged) {
        //     history.push("/login")
        //     toast.error("Bạn chưa đăng nhập")
        // }
        // else {
        const saveSendMess = {
            conversitonId: conversationMes._id,
            senderId: user._id,
            text: scHeight
        };

        const receiverId = conversationMes?.members.find((member) => member !== user._id)

        // console.log(receiverId)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: scHeight,
        });

        try {
            const res = await Axios.post("/api/messgae", saveSendMess)

            noti()
            //setCallback(!callback)
            setMessager([...messager, res.data])
            setScHeight("")
            setCallback(!callback)

        } catch (err) {
            console.log(err)
        }
        //}

        //notification socket
        socket.current.emit("sendNotification", {
            notificationId: receiverId,
            senderId: user._id,
            notification: 1,
        })
    }



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

                        <div className={`right-Footer-Web-block col-2 ${isLogged === true ? "d-block" : "d-none"} ${isAdmin ? "d-none" : "d-block"}`}>
                            <div className={`right-Footer-Web `} onClick={sumbitConversation}>
                                <div className={`right-header-chat-footer ${clickChat === true ? "d-none" : "d-block"}`} onClick={handleClick}>
                                    <div className='right-header-chat'>
                                        <i className="fa-brands fa-rocketchat"></i>
                                    </div>
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
                            {isAdmin ? "Bạn đang là Admin" :
                                <div>
                                    {isLogged ?

                                        <>
                                            {messager.map((m) =>
                                                <div key={m._id} className='form-chat-body' id={'scrollRef'} ref={scrollRef}>
                                                    <FooterChat key={m._id} messager={m} userAdmin={userAdmin} user={user} own={m.senderId === user._id || m.senderId === user._id} />
                                                </div>
                                            )}
                                        </>
                                        : "xin hãy đăng nhập"
                                    }
                                </div>
                            }
                        </div>
                        <div className='right-header-chat-form-footer'>
                            <div className='chat-form-footer-border'>
                                <div className='chat-form-footers col-11 p-0'>
                                    <div className='form-chats d-flex col-12 p-0'>
                                        <div className='chat-form-footer col-12 p-0'>
                                            {/* <textarea rows="1" className='input-chat' ref={textareaRef} style={{
                                                minHeight: MIN_TEXTAREA_HEIGHT,
                                                resize: "none",
                                                maxHeight: "120px",
                                                overflow: "auto"
                                            }} onChange={handleHeight} value={scHeight} placeholder="Aa" disabled={isLogged ? false : true} /> */}
                                            <InputEmoji onChange={handleHeight} value={scHeight} placeholder="Aa" disabled={true} />
                                        </div>

                                        {/* <div className='iconChat col-2 p-0' onClick={handleClickIcon}><i className="fa-solid fa-face-smile"></i></div> */}
                                    </div>
                                </div>
                                <div className='chat-form-footer-send p-0'>
                                    <button onClick={sendMess}>
                                        <img src={send} alt='send' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer