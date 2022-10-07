import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import './Login.scss'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/action/authAction'
import {useDispatch} from 'react-redux'

const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
    isBool: false
}

function Login() {

    const [user, setUser] = useState(initialState)

    const dispatch = useDispatch()

    const history = useHistory()

    const { email, password, err, success, isBool } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const HandleShowEyePassword = () => {
        setUser({ ...user, isBool: !user.isBool })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', { email, password })
            setUser({ ...user, err: '', success: res.data.msg })

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())

            history.push("/")

            
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
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
                                    <li className="nav-item mr-2" role="presentation">
                                        <Link to="/login" className="nav-link active">Login</Link>
                                    </li>
                                    <li className="nav-item ml-2" role="presentation">
                                        <Link to="/register" className="nav-link" aria-selected="false">Register</Link>
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

                                    <form onSubmit={handleSubmit}>
                                        <div className="user-box mb-4">
                                            <input type="text" id="loginName" className="form-controll" name='email' value={email} onChange={handleChangeInput} required />
                                            <label className="form-labell" htmlFor="loginName" >Email or username</label>
                                        </div>


                                        <div className="user-box mb-4">
                                            <input type={user.isBool ? 'text' : 'password'} id="loginPassword" className="form-controll" name='password' value={password} onChange={handleChangeInput} required />
                                            <span className='show-btn' onClick={HandleShowEyePassword}><i className={user.isBool ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></span>
                                            <label className="form-labell" htmlFor="loginPassword">Password</label>
                                        </div>


                                        <div className="row mb-4">
                                            <div className="col-6 justify-content-center d-flex">
                                                <div className="form-check mb-3 mb-md-0">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="loginCheck" />
                                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-center d-flex">
                                                <Link to="/ForgotPassword">Forgot password?</Link>
                                            </div>
                                        </div>

                                        <div className='col-12 d-flex justify-content-center'>
                                            <button className="btn btn-danger btn-block mb-4 col-4 " type='submit'>Sign in</button>
                                        </div>

                                        <div className="text-center">
                                            <p>Not a member? <Link to="/register">Register</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login