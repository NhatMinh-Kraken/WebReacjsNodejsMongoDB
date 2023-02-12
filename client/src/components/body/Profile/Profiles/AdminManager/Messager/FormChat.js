import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import send from '../../../../../../assets/images/send-message.png'

import { io } from 'socket.io-client'
import Chat from './Chat';

import InputEmoji from 'react-input-emoji'
function FormChat({ currentChat, messager, setMessager, setCallback, callback }) {

    //console.log(currentChat)

    const [usersenderId, setUsersenderId] = useState([])

    const auth = useSelector(state => state.auth)
    const { user } = auth
    //const token = useSelector(state => state.token)
    //const [socket, setSocket] = useState(null)
    const scrollRef = useRef(null);
    const [arrivalMessager, setArrivalMessager] = useState(null);

    const socket = useRef()

    //const textareaRef = useRef(null);
    const [scHeight, setScHeight] = useState("")

    //const MIN_TEXTAREA_HEIGHT = 26;

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

    // tìm mess nào có senderId._id !== người đã đăng nhập
    useEffect(() => {
        messager?.map((m) => {
            if (m.senderId !== user._id) {
                setUsersenderId(m.senderId)
            }
        })
    }, [callback, messager])

    //console.log("usersenderId", usersenderId)

    const frientId = currentChat.members.find((m) => m !== user._id)

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
            });
        });
    }, [callback]);

   // console.log(arrivalMessager)
    //console.log(currentChat)

    useEffect(() => {
        arrivalMessager &&
            currentChat.members.includes(arrivalMessager.senderId) &&
            setMessager((prev) => [...prev, arrivalMessager]);
    }, [arrivalMessager, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users)
        });
    }, [user]);

    //


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
                                {/* <textarea rows="1" className='textarea-chat' ref={textareaRef} style={{
                                    minHeight: MIN_TEXTAREA_HEIGHT,
                                    resize: "none",
                                    maxHeight: "120px",
                                    overflow: "auto"

                                }} onChange={handleHeight} value={scHeight} placeholder="Aa" /> */}

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
    )
}

export default FormChat