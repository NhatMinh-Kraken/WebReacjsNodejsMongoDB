import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { isLenght, isMath } from '../../utils/validation/validation'

import { toast } from 'react-toastify'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const { token } = useParams()

    const history = useHistory()

    const { password, cf_password, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const resetPassword = async () => {
        if (isLenght(password)) {
            return toast.error("Password must be at least 6 characters.")
        }

        if (!isMath(password, cf_password)) {
            return toast.error("Password did not match.")
        }

        try {
            const res = await Axios.post('/user/reset', { password }, {
                headers: { Authorization: token }
            })
            history.push("/login")
            return toast.success(res.data.msg);
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    return (
        <>
            <div className='login-background' >
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='login-background-1'>
                            <div className='login-background-header'>
                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <Link to="/reset" className="nav-link active">Reset Password</Link>
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
                                        <input type="password" id="registerPassword" className="form-controlls" name='password' onChange={handleChangeInput} value={password} required />
                                        <label className="form-labells" htmlFor="registerPassword">Password</label>
                                    </div>

                                    <div className="user-box mb-4">
                                        <input type="password" id="registerRepeatPassword" className="form-controlls" name='cf_password' onChange={handleChangeInput} value={cf_password} required />
                                        <label className="form-labells" htmlFor="registerRepeatPassword">Confirm password</label>
                                    </div>

                                    <div className='col-12 d-flex justify-content-center'>
                                        <button className="btn btn-danger btn-block mb-4 col-6 " onClick={resetPassword}>Reset Password</button>
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

export default ResetPassword