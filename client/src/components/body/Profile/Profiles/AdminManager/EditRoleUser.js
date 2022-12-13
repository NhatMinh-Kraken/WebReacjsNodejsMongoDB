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
  const [num, setNum] = useState(0)

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach(user => {
        if (user._id == id) {
          setEditUser(user)
          setCheckAdmin(user.role === 1 ? true : false)
        }
      })
    } else {
      history.push('/profileuser')
    }
  }, [users, id, history])

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin)
    setNum(num + 1)
  }

  const handlUpdate = async () => {
    try {
      if (editUser.role !== 1 && num % 2 !== 0) {
        const res = await Axios.patch(`/user/update_role/${editUser._id}`, {
          role: checkAdmin ? 1 : 0
        }, {
          headers: { Authorization: token }
        })
        history.goBack('/all-user')
        toast.success(res.data.msg)
        setNum(0)
      }
      else {
        if (window.confirm("Bạn có chắc là mún sửa của mình không")) {
          const res = await Axios.patch(`/user/update_role/${editUser._id}`, {
            role: checkAdmin ? 1 : 0
          }, {
            headers: { Authorization: token }
          })

          window.location.href = "http://localhost:3000/profile/profileuser"
          toast.success(res.data.msg)
          setNum(0)
        }
      }

    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }

  console.log(editUser._id)

  return (
    <>

      <div className='profile_item_body'>
        <div className='profile_item_info col-9'>
          <div className="profile_item_form">
            <div className="form-row">
              <div className="col-12 form">
                <label className="col-2 align-items-center form-lable" htmlFor="name">Name</label>
                <div className="input-group">
                  <div className="input-group-prepend ">
                    <span className="input-group-text" id="inputGroupPrepend1"><i className="fa fa-user d-flex"></i></span>
                  </div>
                  <input type="text" className="form-controls col-10" name="name" id="name" defaultValue={editUser.name} placeholder="name" disabled />
                </div>
              </div>
            </div>
            <div className="form-row mt-3">
              <div className="col-12 form">
                <label className="col-2 align-items-center form-lable" htmlFor="email">Email</label>
                <div className="input-group">
                  <div className="input-group-prepend ">
                    <span className="input-group-text" id="inputGroupPrepend2"><i className="d-flex fa fa-envelope-o"></i></span>
                  </div>
                  <input type="text" className="form-controls col-10" name="email" id="email" defaultValue={editUser.email} placeholder="email" disabled />
                </div>
              </div>
            </div>
            <div className='form-row mt-3'>
              <div className='col-12 form justify-content-center'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="isAdmin" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                  <label className="form-check-label" htmlFor="exampleRadios1">
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

    </>
  )
}

export default EditRoleUser