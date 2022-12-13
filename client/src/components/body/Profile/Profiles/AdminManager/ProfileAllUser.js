import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../../redux/action/userAction'

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

    const [show, setShow] = useState(false)
    const [showAll, setShowAll] = useState(false)

    const users = useSelector(state => state.users)


    // const [loading, setLoading] = useState(false
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])


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
                setCallback(!callback)
            }
            else {
                toast.error("Không thể xóa account của mình")
                setShow(false)
            }

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const [userAll, setUserAll] = useState([])
    const handleShowAll = (id, name, email, avatar, sex, numberphone, nameCity, nameDis, nameWard) => {
        setShowAll(true)

        const all = { id, name, email, avatar, sex, numberphone, nameCity, nameDis, nameWard }
        setUserAll(all)

    }

    const handleCloseAll = () => {
        setShowAll(false)
    }

    const address = userAll.nameWard + ", " + userAll.nameDis + ", " + userAll.nameCity

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
                    <Button variant="primary" onClick={() => handleDelete(user.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={showAll}
                onHide={handleCloseAll}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="font-weight-bold">Ảnh đại diện:</td>
                                <td className="font-weight-light text-center">
                                    <img className='avatarTD' src={userAll.avatar} alt="avatar" />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Tên Khách Hàng:</td>
                                <td className="font-weight-light text-center">
                                    {userAll.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Email:</td>
                                <td className="font-weight-light text-center">{userAll.email}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại:</td>
                                <td className="font-weight-light text-center">{userAll.numberphone !== "0" ? userAll.numberphone : "Chưa có"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Giới tính:</td>
                                <td className="font-weight-light text-center">{userAll.sex === 0 ? "Nam" : "Nữ"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ:</td>
                                <td className="font-weight-light text-center">{userAll.nameCity !== null || userAll.nameDis !== null || userAll.nameWard !== null ? address : "Chưa có"}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAll}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className='profile_item_body'>
                <div className='profile_item_info col-12'>
                    <div className='bd-example'>
                        <table className="table table-hover table-bordered">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope="col-1" className="text-center">#</th>
                                    <th scope="col-3" className="text-center">Name</th>
                                    <th scope="col-5" className="text-center">Email</th>
                                    <th scope="col-1" className="text-center">Admin</th>
                                    <th scope="col-2" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={user.id}>
                                            <th scope="row" className='col-1 text-center'>{index + 1}</th>
                                            <td className='col-3 text-center'>{user.name}</td>
                                            <td className='col-5 text-center'>{user.email}</td>
                                            <td className='col-1 text-center m-0'>{user.role === 1 ? <i className="fa-solid fa-circle-check text-primary"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</td>
                                            <td className='col-2 text-center'>
                                                <a onClick={() => handleShowAll(user._id, user.name, user.email, user.avatar, user.sex, user.numberphone, user.nameCity, user.nameDis, user.nameWard)}><i className="fa-solid fa-eye text-success mr-2" title='show'></i></a>
                                                <Link to={`/edit_user/${user._id}`}><i className="fa-solid fa-pen-to-square mr-2 text-primary" title='edit'></i></Link>
                                                <a onClick={() => handleShow(user._id)}><i className="fa-solid fa-trash text-danger" title='delete'></i></a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileAllUser