import React, { useEffect, useState } from "react";
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { useHistory, useParams } from 'react-router-dom'
import Axios from "axios";

import './ActivationEmail.css'
import { toast } from "react-toastify";

function ActivationEmail() {
    const { activation_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    const history = useHistory()

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await Axios.post('/user/activation', { activation_token })
                    toast.success(res.data.msg)
                    history.push("/login")
                } catch (err) {
                    err.response.data.msg && toast.error(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])

    return (
        <></>
    )
}

export default ActivationEmail