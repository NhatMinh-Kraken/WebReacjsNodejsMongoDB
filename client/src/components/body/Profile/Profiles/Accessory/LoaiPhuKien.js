import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const initialState = {
    err: '',
    success: ''
}
function LoaiPhuKien() {
    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)

    const [deleteId, setDeleteId] = useState("")
    const [typeid, setTypeId] = useState([])


    const [show, setShow] = useState(false)
    const [showCategory, setShowcategory] = useState(false)
    const [showCategoryEdit, setShowcategoryedit] = useState(false)

    const users = useSelector(state => state.users)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")

    const [callback, setCallback] = useState(false)

    const [id, setID] = useState('')

    useEffect(() => {
        const getCategories = async () => {
            const res = await Axios.get('/api/categoryAccessory')
            setCategories(res.data)
        }
        getCategories()
    }, [callback])

    const [nametypes, setNametypes] = useState([])
    // const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/products')
            setNametypes(res.data)
        }
        getNameType()
    }, [callback])


    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true)
        setDeleteId(id)
    };

    const handleCloseAdd = () => {
        setShowcategory(false)
    }

    const handleShowAdd = () => {
        setCategory("")
        setShowcategory(true)
    }

    const handleShowEdit = (id, name) => {
        setShowcategoryedit(true)
        setID(id)
        setCategory(name)
    }

    const handleCloseEdit = () => {
        setShowcategoryedit(false)
    }

    const handleEdit = async () => {
        try {
            const res = await Axios.put(`/api/categoryAccessory/${id}`, { name: category }, {
                headers: { Authorization: token }
            })
            setCategory("")
            setShowcategoryedit(false)
            setCallback(!callback)
            toast.success("Update Success")

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await Axios.post('/api/categoryAccessory', { name: category }, {
                headers: { Authorization: token }
            })
            setCategory("")
            setShowcategory(false)
            setCallback(!callback)
            toast.success("Create Success")

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    useEffect(() => {
        const getNameTypes = () => {
            nametypes.forEach(nametype => {
                if (nametype.type == deleteId) {
                    setTypeId(nametype)
                }
                else {
                    console.log("khong co")
                }
            })
        }
        getNameTypes()

    })

    const handleDelete = async () => {
        try {

            if (typeid.type === deleteId) {
                setShow(false)
                toast.error("Không thể xóa vì có sản phẩm")
            }
            else {
                const res = await Axios.delete(`/api/categoryAccessory/${deleteId}`, {
                    headers: { Authorization: token }
                })
                setShow(false)
                setCallback(!callback)
                toast.success(res.data.msg)
                // setShow(false)
                // toast.success("xóa")
            }


        } catch (err) {
            toast.err(err.response.data.msg)
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
                        <div className="input-group">
                            <div className="input-group-prepend pl-0 pr-0">
                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-list d-flex"></i></span>
                            </div>
                            <input type="text" className="form-control col-11" name="name" id="name" value={category} placeholder="..." onChange={e => setCategory(e.target.value)} required />
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
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-title'>
                        Please enter the category name</div>
                    <div className="form">
                        <div className="input-group">
                            <div className="input-group-prepend pl-0 pr-0">
                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-list d-flex"></i></span>
                            </div>
                            <input type="text" className="form-control col-11" name="name" id="name" value={category} placeholder="..." onChange={e => setCategory(e.target.value)} required />
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
                                    categories.map((category, index) => (
                                        <tr key={category._id}>
                                            <th scope="row" className='col-2 text-center'>{index + 1}</th>
                                            <td className='col-5 text-center'>{category.name}</td>
                                            <td className='col-5 text-center'>
                                                <a onClick={() => handleShowEdit(category._id, category.name)}><i className="fa-solid fa-pen-to-square mr-2 text-primary" title='edit'></i></a>
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

export default LoaiPhuKien