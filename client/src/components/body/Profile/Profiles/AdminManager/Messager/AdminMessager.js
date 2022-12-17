import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import FormChat from './FormChat'

import './Messager.scss'

import Conversation from './Conversation'


function AdminMessager() {
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messager, setMessager] = useState([])

    //const [frientSend, setFrientSend] = useState([])

    //const [allUser, setAllUser] = useState([])
    // const [userSender, setUserSender] = useState([])
    const [callback, setCallback] = useState(false)

    const auth = useSelector(state => state.auth)
    const { user } = auth

    // console.log(user)

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
    }, [user._id])

    //console.log(conversation)

    // useEffect(() => {
    //     const getMessager = async () => {
    //         try {
    //             const res = await Axios.get(`/api/messgae/${currentChat?._id}`)
    //             setMessager(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getMessager()
    // }, [callback, currentChat])

    // console.log(messager)

    // console.log(currentChat)

    // useEffect(() => {
    //     messager.forEach(m => {
    //         if (m.sender._id !== user._id) {
    //             setUserSender(m.sender)
    //         }
    //     })
    // }, [callback, messager, currentChat])

    // console.log(messager)

    // console.log(user)

    // console.log(userSender)


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
                                                                    conversation.map((c) => (
                                                                        <div key={c._id} onClick={() => setCurrentChat(c)}>
                                                                            <Conversation conversation={c} currentChat={currentChat} currentUser={user} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                            : <span>Chưa có phản hồi</span>
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
                                                {currentChat
                                                    ? <div className='chat-form'>
                                                        <FormChat currentChat={currentChat} setCallback={setCallback} callback={callback} />
                                                    </div>
                                                    : <span className='PhanHoi'>Chưa có phản hồi</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-3'></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMessager