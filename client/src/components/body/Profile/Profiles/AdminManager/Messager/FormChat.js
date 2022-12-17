import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import send from '../../../../../../assets/images/send-message.png'


import Chat from './Chat';

function FormChat({ currentChat, setCallback, callback }) {

    const [messager, setMessager] = useState([])

    const [userSender, setUserSender] = useState([])

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const token = useSelector(state => state.token)

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

    //console.log("messager", messager)


    //send mess
    const sendMess = async (e) => {
        e.preventDefault();

        const saveSendMess = {
            conversationId: currentChat._id,
            sender: user._id,
            text: scHeight
        }

        try {
            const res = await Axios.post("/api/messgae", saveSendMess)
            setCallback(!callback)
            setMessager([...messager, res.data])
            setScHeight("")

        } catch (err) {
            console.log(err)
        }
    }

    //console.log(messager)
    //

    // console.log(userSender)
    // console.log(currentChat)

    //messager

    // lấy tất cả dữ liệu mess
    useEffect(() => {
        const getMessager = async () => {
            try {
                const res = await Axios.get(`/api/messgae/${currentChat?._id}`)
                setMessager(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessager()
    }, [callback, currentChat])

    console.log(messager)

    //
    // tìm mess nào có sender._id !== người đã đăng nhập
    useEffect(() => {
        messager.map(m => {
            if (m.sender._id !== user._id) {
                setUserSender(m.sender)
            }
        })
    }, [callback, messager])

    console.log("userSender", userSender)


    return (
        <>
            <div className='form-chat'>
                <div className='chat'>
                    <div className='chat-header'>
                        <div className='chat-header-form-left'>
                            <div className='chat-header-img'>
                                <img src={userSender?.avatar} alt="user" />
                                <span className='active-note'></span>
                            </div>
                            <div className='chat-header-name pl-2'>
                                <span>{userSender?.name}</span>
                            </div>
                        </div>
                        <div className='chat-header-form-right'>
                            <i className="fa-solid fa-robot"></i>
                        </div>
                    </div>
                    <div className='chat-body'>
                        {messager.map((m) => (
                            <Chat key={m._id} messager={m} userSender={userSender} own={m.sender._id === user._id || m.sender === user._id} />
                        ))}
                    </div>
                    <div className='chat-rep'>
                        <div className='form-chat-rep-01 col-11 p-0'>
                            <div className='form-chat-rep col-11 p-0'>
                                <textarea rows="1" className='textarea-chat' ref={textareaRef} style={{
                                    minHeight: MIN_TEXTAREA_HEIGHT,
                                    resize: "none",
                                    maxHeight: "120px",
                                    overflow: "auto"

                                }} onChange={handleHeight} value={scHeight} placeholder="Aa" />
                            </div>
                            <div className='iconChat col-1 p-0'><i className="fa-solid fa-face-smile"></i></div>
                        </div>
                        <div className='chat-form-footer-send col-1 p-0'>
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