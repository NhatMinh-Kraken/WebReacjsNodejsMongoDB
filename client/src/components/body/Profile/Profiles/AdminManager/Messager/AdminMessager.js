import Axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import FormChat from './FormChat'

import './Messager.scss'

import Conversation from './Conversation'

import { io } from 'socket.io-client'

import send from '../../../../../../assets/images/send-message.png'

import InputEmoji from 'react-input-emoji'

import Chat from './Chat';
import InfOnlineUser from './InfOnlineUser'


function AdminMessager() {

    const [callback, setCallback] = useState(false)

    //const auth = useSelector(state => state.auth)
    //const { user } = auth

    const [conversation, setConversation] = useState(null)

    const [currentChat, setCurrentChat] = useState(null)

    const [messager, setMessager] = useState(null)

    // const [arrivalMessager, setArrivalMessager] = useState(null);
    //const socket = useRef()

    //text
    const [usersenderId, setUsersenderId] = useState([])

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [users, setUsers] = useState([])
    //const token = useSelector(state => state.token)
    //const [socket, setSocket] = useState(null)
    const scrollRef = useRef(null);
    const [arrivalMessager, setArrivalMessager] = useState(null);

    const [newConversation, setNewConversation] = useState([])

    const [infUser, setInfUser] = useState(null)

    const socket = useRef()

    const [onlineUser, setOnlineUser] = useState([])

    const [notification, setNotification] = useState(null)

    //const textareaRef = useRef(null);
    const [scHeight, setScHeight] = useState("")

    const [userReceiver, setUserReceiver] = useState(null)

    //const MIN_TEXTAREA_HEIGHT = 26;

    useEffect(() => {
        setUsers(user)
    })

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

    // console.log(conversation)

    // console.log(currentChat)


    // console.log(infUser)

    useEffect(() => {
        const fetchMessager = async () => {
            try {
                const res = await Axios.get(`/api/messgae/${currentChat?._id}`)
                setMessager(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMessager()
    }, [currentChat])

    //console.log(messager)

    //console.log(currentChat)



    const handleHeight = (scHeight) => {
        setScHeight(scHeight)
    }

    // console.log(usersenderId)
    // console.log(currentChat)

    //messager


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

    useEffect(() => {
        const ress = currentChat?.members.find((m) => m !== user._id)

        allUser.map((e) => {
            if (e._id === ress) {
                setInfUser(e)
            }
        })
    }, [currentChat, user])

    //console.log(infUser)

    // tìm mess nào có senderId._id !== người đã đăng nhập
    useEffect(() => {
        messager?.map((m) => {
            if (m.senderId !== user._id) {
                setUsersenderId(m.senderId)
            }
        })
    }, [callback, messager])

    //console.log("usersenderId", usersenderId)

    const frientId = currentChat?.members.find((m) => m !== user._id)

    //console.log(frientId)

    const [all, setAll] = useState([])

    useEffect(() => {
        allUser.forEach((u) => {
            if (u._id === frientId) {
                setAll(u)
            }
        })
    })

    //console.log(all)

    //Scroll to bottom mess
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [messager]);


    //socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            // console.log(data)
            setArrivalMessager({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        });

    }, [callback]);

    //console.log(arrivalMessager)

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUser(users)
        });
    }, [user, callback]);

    useEffect(() => {
        arrivalMessager &&
            currentChat?.members.includes(arrivalMessager.senderId) &&
            setMessager((prev) => [...prev, arrivalMessager]);
    }, [arrivalMessager, currentChat]);

    //console.log(onlineUser)

    //console.log(onlineUser)

    useEffect(() => {
        socket.current.on("getAllConversation", (data) => {
            //console.log(data)
            setNewConversation(data)
        })
    }, [callback])

    //console.log(newConversation._id)

    //

    //conversation new
    useEffect(() => {
        // console.log(newConversation._id)
        // console.log(conversationMes._id)
        conversation?.forEach((e) => {
            if (e._id !== newConversation._id) {
                setConversation([...conversation, newConversation])
            }
        })

    }, [newConversation._id])

    //console.log(conversation)

    //alluser new
    useEffect(() => {
        socket.current.on("getAlluer", (data) => {
            console.log(data)
        })
    })

    //noti
    const receiverNotiId = currentChat?.members.find((member) => member !== user._id)

    useEffect(() => {
        user.notification.forEach((e) => {
            if (e.senderId === receiverNotiId) {
                setUserReceiver(e)
            }
        })
    })

    // console.log(userReceiver?.notification)
    // console.log(receiverNotiId)
    //mess
    const hanldeMess = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(`/api/noti/${user._id}`, {
                receiverNotiId,
                notification: 0
            })

        } catch (err) {
            console.log(err)
        }
    }

    //noti
    const noti = async () => {
        try {
            await Axios.post("/api/noti", {
                id: receiverNotiId,
                notification: 1
            })
        } catch (err) {
            console.log(err)
        }
    }

    //send mess
    const sendMess = async (e) => {
        e.preventDefault();

        const saveSendMess = {
            conversitonId: currentChat._id,
            senderId: user._id,
            text: scHeight
        };

        const receiverId = currentChat.members.find((member) => member !== user._id)

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

        } catch (err) {
            console.log(err)
        }
    }

    //console.log(messager)
    //


    return (
        <>
            <div className='profile_page backGroundBlack pt-4 pb-4 heightMess'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <div className='form-mess d-flex'>
                                <div className='mess col-3'>
                                    <div className='conversation'>
                                        <div className='conversation-form'>
                                            <div className='conversation-body d-flex'>
                                                <div className='conversation-left'>
                                                    <div className='conversation-header'>
                                                        <div className='conversation-infor'>Messager</div>
                                                    </div>
                                                    <div className='conversation-form-all-infor'>
                                                        {conversation ?
                                                            <div className='conversation-all-infor'>
                                                                {
                                                                    conversation?.map((c, index) => (
                                                                        <>
                                                                            <div key={index} onClick={() => setCurrentChat(c)} className="position-relative d-flex flex-column">
                                                                                <div onClick={hanldeMess}><Conversation key={index} conversation={c} currentChat={currentChat} currentUser={user} onlineUser={onlineUser} notification={notification} /></div>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                }
                                                            </div>
                                                            : <span className="text-center">Chưa có phản hồi</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='profile_item-mess col-6 p-0'>
                                    <div className='profile_item_header-mess'>
                                        <div className='form-chat-body-form'>
                                            <div className='form-chat-body'>
                                                {
                                                    currentChat
                                                        ?
                                                        <div className={`chat-form`}>
                                                            {/* <FormChat messager={messager} setMessager={setMessager} currentChat={currentChat} setCallback={setCallback} callback={callback} /> */}

                                                            <>
                                                                <div className='form-chat'>
                                                                    <div className='chat'>
                                                                        <div className='chat-header'>
                                                                            <div className='chat-header-form-left'>
                                                                                <div className='chat-header-img'>
                                                                                    <img src={all?.avatar} alt="user" />
                                                                                    <span className='active-note'></span>
                                                                                </div>
                                                                                <div className='chat-header-name pl-2'>
                                                                                    <span>{all?.name}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className='chat-header-form-right'>
                                                                                <i className="fa-solid fa-robot"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className='chat-body'>
                                                                            {messager?.map((m, index) => (
                                                                                <>
                                                                                    <div id={'scrollRef'} ref={scrollRef} key={index}>
                                                                                        <Chat key={m._id} messager={m} usersenderId={all} own={m.senderId === user._id || m.senderId === user._id} />
                                                                                    </div>
                                                                                </>
                                                                            ))}
                                                                        </div>
                                                                        <div className='chat-rep'>
                                                                            <div className='form-chat-rep-01 col-11 p-0'>
                                                                                <div className='form-chat-rep col-12 p-0'>
                                                                                    <InputEmoji onChange={handleHeight} value={scHeight} placeholder="Aa" />
                                                                                </div>
                                                                                {/* <div className='iconChat col-1 p-0'><i className="fa-solid fa-face-smile"></i></div> */}
                                                                            </div>
                                                                            <div className='chat-form-footer-send p-0'>
                                                                                <button onClick={sendMess}>
                                                                                    <img src={send} alt='send' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        </div>
                                                        :
                                                        <span className={`PhanHoi`}>Chưa có phản hồi</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='messOnline col-3'>
                                    <div className='messOnline-right'>
                                        <div className='messOnline-form'>
                                            <div className='messOnline-body d-flex'>
                                                <div className='messOnline-left'>
                                                    <div className='messOnline-header'>
                                                        <div className='messOnline-infor'>Infor-User</div>
                                                    </div>
                                                    <div className='messOnline-form-all-infor'>
                                                        {infUser ?
                                                            <div className='messOnline-all-infor'>
                                                                <div>
                                                                    <InfOnlineUser infUser={infUser} />
                                                                </div>
                                                            </div>
                                                            : <span className="text-center">Chưa có phản hồi</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMessager