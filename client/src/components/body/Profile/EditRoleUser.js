import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from 'axios'

import { toast } from 'react-toastify'


function EditRoleUser() {
  const { id } = useParams()
  const history = useHistory()
  const [editUser, setEditUser] = useState([])

  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)

  const [checkAdmin, setCheckAdmin] = useState(false)
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const [num, setNum] = useState(0)

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach(user => {
        if (user._id === id) {
          setEditUser(user)
          setCheckAdmin(user.role === 1 ? true : false)
        }
      })
    } else {
      history.push('/profile/all-user')
    }
  }, [users, id, history])

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin)
    setNum(num + 1)
  }

  const handlUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await Axios.patch(`/user/update_role/${editUser._id}`, {
          role: checkAdmin ? 1 : 0
        }, {
          headers: { Authorization: token }
        })
        window.location.href = "http://localhost:3000/profile/all-user"
        toast.success(res.data.msg)
      }
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }

  return (
    <>
      <div className='profile_item col-9'>
        <div className='profile_item_header pt-3'>
          <h3>Sửa chữa vai trò khách hàng</h3>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className='profile_item_body'>
          <div className='profile_item_info col-9'>
            <div className="profile_item_form">
              <div className="form-row">
                <div className="col-12 form">
                  <label className="col-2 align-items-center form-lable" htmlFor="name">Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend col-1">
                      <span className="input-group-text" id="inputGroupPrepend1"><i className="fa fa-user d-flex"></i></span>
                    </div>
                    <input type="text" className="form-control col-11" name="name" id="name" defaultValue={editUser.name} placeholder="name" disabled />
                  </div>
                </div>
              </div>
              <div className="form-row mt-3">
                <div className="col-12 form">
                  <label className="col-2 align-items-center form-lable" htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend col-1">
                      <span className="input-group-text" id="inputGroupPrepend2"><i className="d-flex fa fa-envelope-o"></i></span>
                    </div>
                    <input type="text" className="form-control col-11" name="email" id="email" defaultValue={editUser.email} placeholder="email" disabled />
                  </div>
                </div>
              </div>
              <div className='form-row mt-3'>
                <div className='col-12 form justify-content-center'>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isAdmin" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                    <label className="form-check-label" for="exampleRadios1">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-12 d-flex justify-content-center pt-4'>
                <button className="btn btn-danger btn-block mb-4 col-4 " type='submit' onClick={handlUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRoleUser