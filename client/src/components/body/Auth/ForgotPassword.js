import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import { isEmail } from '../../utils/validation/validation'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import Axios from 'axios'


const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const { email, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const forgotPassword = async () => {
        if (!isEmail(email)) {
            return setData({ ...data, err: 'Invalid Emails.', success: '' })
        }

        try {
            const res = await Axios.post('/user/forgot', { email })
            return setData({ ...data, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>
            <div className='login-background' >
                <div className='alert'>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                </div>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='login-background-1'>
                            <div className='login-background-header'>
                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <Link to="/forgotpassword" className="nav-link active">Forgot Password</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content">
                                <div className="tab-pane fade show active">
                                    <div className="text-center mb-3 mt-3 mb-3">

                                        <button type="button" className="btn btn-link btn-floating mx-1 ">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1 ">
                                            <i className="fab fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1 ">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1 ">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>


                                    <div className="user-box mb-4">
                                        <input type="text" id="loginName" className="form-controll" name='email' value={email} onChange={handleChangeInput} required />
                                        <label className="form-labell" htmlFor="loginName" >Email or username</label>
                                    </div>

                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className="btn btn-danger btn-block mb-4 col-6 " onClick={forgotPassword}>Verify your email</button>
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

export default ForgotPassword