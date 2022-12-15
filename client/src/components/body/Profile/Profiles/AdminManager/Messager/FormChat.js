import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function FormChat({ messagerId, messager, own }) {

    const [allUser, setAllUser] = useState([])
    const [callback, setCallback] = useState(false)

    const [userSender, setUserSender] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const res = await Axios.get('/user/all_infor')
                setAllUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllUser()
    }, [callback])


    useEffect(() => {
        allUser.forEach(user => {
            if (user._id == messagerId) {
                setUserSender(user)
            }
        })
    }, [allUser, messagerId])


    return (
        <>
            <div className='form-chat'>
                <div className='chat'>
                    <div className='chat-header'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FormChat