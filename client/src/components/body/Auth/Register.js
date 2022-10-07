import React, { useState } from 'react'
import { Link } from "react-router-dom"
import './Login.scss'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLenght, isMath } from '../../utils/validation/validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
}
function Register() {

    const [user, setUser] = useState(initialState)
    const { name, email, password, cf_password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (isEmpty(name) || isEmpty(password)) {
            return setUser({ ...user, err: 'Please fill in all fields.', success: '' })
        }

        if (!isEmail(email)) {
            return setUser({ ...user, err: 'Invalid Email.', success: '' })
        }

        if (isLenght(password)) {
            return setUser({ ...user, err: 'Password must be at least 6 characters.', success: '' })
        }

        if (!isMath(password, cf_password)) {
            return setUser({ ...user, err: 'Password did not match.', success: '' })
        }

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })
            setUser({ ...user, err: '', success: res.data.msg })

        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
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
                                    <Link to="/login" className="nav-link ">Login</Link>
                                </li>
                                <li className="nav-item ml-2" role="presentation">
                                    <Link to="/register" className="nav-link active" aria-selected="false">Register</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='tab-content'>
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

                                <div className='' style={{ color: 'red', marginBottom: '7px' }}>

                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="user-box mb-4">
                                        <input type="text" id="registerUsername" className="form-controlls" name='name' onChange={handleChangeInput} value={name} required />
                                        <label className="form-labells" htmlFor="registerUsername">Username</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="text" id="registerEmail" className="form-controlls" name='email' onChange={handleChangeInput} value={email} required />
                                        <label className="form-labells" htmlFor="registerEmail">Email</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="password" id="registerPassword" className="form-controlls" name='password' onChange={handleChangeInput} value={password} required />
                                        <label className="form-labells" htmlFor="registerPassword">Password</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="password" id="registerRepeatPassword" className="form-controlls" name='cf_password' onChange={handleChangeInput} value={cf_password} required />
                                        <label className="form-labells" htmlFor="registerRepeatPassword">Repeat password</label>
                                    </div>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className="btn btn-danger btn-block mb-3 col-4" type='submit'>Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register