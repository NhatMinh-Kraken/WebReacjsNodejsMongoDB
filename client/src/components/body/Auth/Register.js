import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import './Login.scss'
import axios from 'axios'
import { isEmpty, isEmail, isLenght, isMath } from '../../utils/validation/validation'
import { toast } from 'react-toastify'


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

    const history = useHistory()
    const { name, email, password, cf_password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (isEmpty(name) || isEmpty(password)) {
            return toast.error("Please fill in all fields.")
        }

        if (!isEmail(email)) {
            return toast.error("Invalid Email.")
        }

        if (isLenght(password)) {
            return toast.error("Password must be at least 6 characters.")
        }

        if (!isMath(password, cf_password)) {
            return toast.error("Password did not match.")
        }

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })
            toast.success(res.data.msg)
            history.push("/login")

        } catch (err) {
            err.response.data.msg &&
                toast.error(err.response.data.msg)
        }
    }

    return (
        <div className='login-background' >
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