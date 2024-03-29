import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import './Login.scss'
import axios from 'axios'
import { dispatchLogin } from '../../../redux/action/authAction'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
// import { gapi } from 'gapi-script'

import FacebookLogin from 'react-facebook-login'

import Loadding from '../../utils/Loadding/loadding'

import { io } from 'socket.io-client'


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

    const [loadding, setLoadding] = useState(false)

    const socket = useRef()

    //socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

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
            setLoadding(false)
            const res = await axios.post('/user/login', { email, password })
            //socket

            toast.success(res.data.msg)

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())

            setLoadding(true)

            history.push("/")


        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const clientId = "404529522208-ujotennbb9ujd2iqenar833pgnbkgo3f.apps.googleusercontent.com"

    // useEffect(() => {
    //     gapi.load("client:auth2", () => {
    //         gapi.auth2.init({ clientId: clientId })
    //     })
    // }, [clientId])

    const responseGoogle = async (response) => {
        // console.log(response)
        try {
            setLoadding(true)
            const res = await axios.post('/user/google_login', {
                name: response.data.name,
                email: response.data.email,
                picture: response.data.picture
            })
            //socket
            //socket.current.emit("new-user")

            toast.success(res.data.msg)
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            setLoadding(false)

            history.push("/")

        } catch (err) {
            err.response.data.msg &&
                toast.error(err.response.data.msg)
            toast.error("Email đã được sử dụng")
            history.push("/")
        }
    }

    const responseFacebook = async (response) => {

        try {
            setLoadding(true)
            const { accessToken, userID } = response
            const res = await axios.post('/user/facebook_login', { accessToken, userID })
            //socket

            toast.success(res.data.msg)
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            setLoadding(false)

            history.push('/')
        } catch (err) {
            err.response.data.msg &&
                toast.error(err.response.data.msg)

            toast.error("Email đã được sử dụng")
            history.push("/")
        }
    }

    if (loadding) {
        return <div><Loadding /></div>
    }

    return (
        <>
            <div className='login-background' >
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

                                        <div className='d-flex col-12 login-online'>
                                            <LoginSocialGoogle
                                                client_id={clientId}
                                                scope="openid profile email"
                                                discoveryDocs="claims_supported"
                                                access_type="offline"
                                                onResolve={responseGoogle}
                                                onReject={(err) => {
                                                    console.log(err);
                                                }}
                                            >
                                                <GoogleLoginButton className='GoogleLogin-Button m-0'/>
                                            </LoginSocialGoogle>
                                            <FacebookLogin className='col-6 ml-1'
                                                appId="665527241564883"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                icon="fa-facebook" />
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