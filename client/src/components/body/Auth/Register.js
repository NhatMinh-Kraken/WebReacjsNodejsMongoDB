import React from 'react'
import { Link } from "react-router-dom"
import './Login.scss'

function Register() {
    return (
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
                                <form>
                                    <div className="user-box mb-4">
                                        <input type="text" id="registerName" className="form-controlls" name='Name' required />
                                        <label className="form-labells" htmlFor="registerName">Name</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="text" id="registerUsername" className="form-controlls" name='Username' required />
                                        <label className="form-labells" htmlFor="registerUsername">Username</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="text" id="registerEmail" className="form-controlls" name='Email' required />
                                        <label className="form-labells" htmlFor="registerEmail">Email</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="password" id="registerPassword" className="form-controlls" name='Password' required />
                                        <label className="form-labells" htmlFor="registerPassword">Password</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="password" id="registerRepeatPassword" className="form-controlls" name='RepeatPassword' required />
                                        <label className="form-labells" htmlFor="registerRepeatPassword">Repeat password</label>
                                    </div>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className="btn btn-danger btn-block mb-3 col-4">Sign in</button>
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