import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const initialState = {
    name: '',
    icon: '',
    err: '',
    success: ''
}
function LoaiBaoDuong() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const [deleteId, setDeleteId] = useState("")


    const [show, setShow] = useState(false)
    const [showCategory, setShowcategory] = useState(false)
    const [showCategoryEdit, setShowcategoryedit] = useState(false)

    const users = useSelector(state => state.users)

    const [loaibaoduongs, setLoaiBaoDuongs] = useState([])
    const [loaibaoduong, setLoaiBaoDuong] = useState(initialState)

    const [callback, setCallback] = useState(false)

    const [id, setID] = useState('')

    const [isCheckChung, setIsCheckChung] = useState(false)

    useEffect(() => {
        const getLoaiBaoDuong = async () => {
            const res = await Axios.get('/api/loaibaoduong')
            setLoaiBaoDuongs(res.data)
        }
        getLoaiBaoDuong()
    }, [callback])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setLoaiBaoDuong({ ...loaibaoduong, [name]: value })
    }

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true)
        setDeleteId(id)
    };

    const handleCloseAdd = () => {
        setShowcategory(false)
    }

    const handleShowAdd = () => {
        setLoaiBaoDuong("")
        setShowcategory(true)
    }

    const handleShowEdit = (giatri) => {
        if (giatri.chung === 1) {
            setIsCheckChung(true)
        }
        setShowcategoryedit(true)
        setID(giatri._id)
        setLoaiBaoDuong(giatri)
    }

    const handleCloseEdit = () => {
        setShowcategoryedit(false)
        setIsCheckChung(false)
    }

    const handleEdit = async () => {
        try {
            if (isCheckChung === true) {
                const res = await Axios.put(`/api/loaibaoduong/${id}`, { name: loaibaoduong.name, chung: 1 }, {
                    headers: { Authorization: token }
                })
                setLoaiBaoDuong("")
                setIsCheckChung(false)
                setShowcategoryedit(false)
                setCallback(!callback)
                toast.success("Update Success")
            }

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await Axios.post('/api/loaibaoduong', { name: loaibaoduong.name }, {
                headers: { Authorization: token }
            })
            setLoaiBaoDuong("")
            setShowcategory(false)
            setCallback(!callback)
            toast.success("Create Success")

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`/api/loaibaoduong/${deleteId}`, {
                headers: { Authorization: token }
            })
            setShow(false)
            setCallback(!callback)
            toast.success(res.data.msg)
            // setShow(false)
            // toast.success("xóa")

        } catch (err) {
            toast.err(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setIsCheckChung(true)
    }

    console.log(loaibaoduongs)


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category Car</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    Are you sure you want to remove the Car Category ? Car type data will be lost !
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showCategory}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-title'>
                        Please enter the category name</div>
                    <div className="form">
                        <div className='d-flex flex-column w-100'>
                            <div className="input-group col-12 pb-3">
                                <div className="input-group-prepend pl-0 pr-0">
                                    <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-list d-flex"></i></span>
                                </div>
                                <input type="text" className="form-control col-11" name="name" id="name" value={loaibaoduong.name} placeholder="name" onChange={handleChangeInput} required />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate} >Save</Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={showCategoryEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-title'>
                        Please enter the category name</div>
                    <div className="form">
                        <div className="d-flex flex-column w-100">
                            <div className="input-group col-12 pb-3">
                                <div className="input-group-prepend pl-0 pr-0">
                                    <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-list d-flex"></i></span>
                                </div>
                                <input type="text" className="form-control col-11" name="name" id="name" value={loaibaoduong.name} placeholder="name" onChange={handleChangeInput} required />
                            </div>
                            <div className='input-group col-12 pb-3'>
                                <Form.Check className="pt-3 pb-3 font-weight-bold check-box-items"
                                    type="checkbox"
                                    name="chung"
                                    label="loại bảo dưỡng chung"
                                    onChange={handleCheck}
                                    checked={isCheckChung}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit} >Update</Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item_body'>
                <div className='profile_item_info col-12'>
                    <div className='category_item pb-3 d-flex align-items-center justify-content-end'>
                        <button onClick={(handleShowAdd)}><i className="fa-solid fa-plus" title='add'></i></button>
                    </div>
                    <div className='bd-example'>
                        <table className="table table-hover table-bordered">
                            <thead className='thead-dark'>
                                <tr className='table-title'>
                                    <th scope="col-2">#</th>
                                    <th scope="col-5">Name</th>
                                    <th scope="col-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loaibaoduongs.map((category, index) => (
                                        <tr key={category._id}>
                                            <th scope="row" className='col-2 text-center'>{index + 1}</th>
                                            <td className='col-5 text-center'>{category.name}</td>
                                            <td className='col-5 text-center'>
                                                <a onClick={() => handleShowEdit(category)}><i className="fa-solid fa-pen-to-square mr-2 text-primary" title='edit'></i></a>
                                                <a onClick={() => handleShow(category._id)}><i className="fa-solid fa-trash text-danger" title='delete'></i></a>
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

export default LoaiBaoDuong