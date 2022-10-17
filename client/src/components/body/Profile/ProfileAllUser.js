import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'

const initialState = {
    err: '',
    success: ''
}
function ProfileAllUser() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)

    const [deleteId, setDeleteId] = useState("")

    const history = useHistory()

    const [show, setShow] = useState(false)

    const users = useSelector(state => state.users)

    // const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true)
        setDeleteId(id)

    };

    const handleDelete = async () => {
        try {
            if (user._id !== deleteId) {
                const res = await Axios.delete(`/user/delete/${deleteId}`, {
                    headers: { Authorization: token }
                })
                setShow(false)
                toast.success(res.data.msg)
                window.location.reload();
            }
            else {
                toast.error("Không thể xóa account của mình")
                setShow(false)
            }

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this account?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete(user._id)}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item col-9'>
                <div className='profile_item_header pt-3'>
                    <h3>Danh sách quản lý khách hàng</h3>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className='profile_item_body'>
                    <div className='profile_item_info col-12'>
                        <div className='bd-example'>
                            <table class="table table-hover table-bordered">
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope="col-1">#</th>
                                        <th scope="col-4">Name</th>
                                        <th scope="col-5">Email</th>
                                        <th scope="col-1">Admin</th>
                                        <th scope="col-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <th scope="row" className='col-1'>{index + 1}</th>
                                                <td className='col-4'>{user.name}</td>
                                                <td className='col-5'>{user.email}</td>
                                                <td className='col-1 text-center m-0'>{user.role === 1 ? <i class="fa-solid fa-circle-check text-primary"></i> : <i class="fa-solid fa-circle-xmark text-danger"></i>}</td>
                                                <td className='col-1'>
                                                    <Link to={`/edit_user/${user._id}`}><i class="fa-solid fa-pen-to-square mr-2 text-primary" title='edit'></i></Link>
                                                    <a onClick={() => handleShow(user._id)}><i class="fa-solid fa-trash text-danger" title='delete'></i></a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileAllUser