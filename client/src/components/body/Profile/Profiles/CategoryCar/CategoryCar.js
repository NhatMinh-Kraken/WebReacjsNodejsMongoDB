import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { read, utils } from 'xlsx'

const initialState = {
    err: '',
    success: ''
}
function CategoryCar() {
    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)

    const [deleteId, setDeleteId] = useState("")
    const [typeid, setTypeId] = useState([])
    const [keHoachBaoDuong, setKeHoachBaoDuong] = useState([])

    const [show, setShow] = useState(false)
    const [showCategory, setShowcategory] = useState(false)
    const [showCategoryEdit, setShowcategoryedit] = useState(false)

    const users = useSelector(state => state.users)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [categoryId, setCategoryId] = useState([])

    const [callback, setCallback] = useState(false)

    const [id, setID] = useState('')

    const [showKeHoach, setShowKeHoach] = useState(false)
    const [showSuaKeHoach, setShowSuaKeHoach] = useState(false)

    const [ClickKeHoach, setClickKeHoach] = useState(false)
    const [arrKeHoach, setArrKeHoach] = useState([])
    const [arrSuaKeHoach, setArrSuaKeHoach] = useState([])

    const [check, setCheck] = useState(false)
    const [checkData, setCheckData] = useState([])

    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const requiredFields = ["stt", "km", "thang", "LocGioDieuHoa", "DauPhanh", "BaoDuongHeThongDieuHoa", "PinChiaKhoaDieuKhien", "PinBoTBox", "NuocLamMat", "HangMucChung"];
    const [loadding, setLoadding] = useState(false)

    useEffect(() => {
        getCategories()
    }, [callback])

    const getCategories = async () => {
        const res = await Axios.get('/api/categorys')
        setCategories(res.data)
    }

    useEffect(() => {
        categories.forEach((c) => {
            if (c._id === id) {
                setCategoryId(c.ChiTietBaoDuong)
            }
        })
    }, [categories, id])
    // console.log(categoryId)

    const [nametypes, setNametypes] = useState([])
    // const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/products')
            setNametypes(res.data)
        }
        getNameType()
    }, [callback])


    useEffect(() => {
        category.ChiTietBaoDuong?.map(lt => {
            if (lt.BaoDuongHeThongDieuHoa || lt.DauPhanh || lt.HangMucChung || lt.LocGioDieuHoa || lt.NuocLamMat || lt.PinBoTBox || lt.PinChiaKhoaDieuKhien) {
                setCheck(true)
            }
        })
    }, [category.ChiTietBaoDuong])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setCategory({ ...category, [name]: value, err: '', success: '' })
    }

    const arr = []
    const handleChecked = (e, index, giatri) => {
        // console.log(index)
        // console.log(id)

        arr.push(giatri)
        console.log(arr)
        // const get = category.ChiTietBaoDuong?.find((c) => c._id === id)
        // console.log(get)

        // if (e.target.checked) {
        //     setCheckData([
        //         ...checkData,
        //         [e.target.name]: e.target.checked])
        // }
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
        setCategory("")
        setShowcategory(true)
    }

    const handleShowEdit = (giatri) => {
        setShowcategoryedit(true)
        setID(giatri._id)
        setCategory(giatri)
    }

    const handleCloseEdit = () => {
        setShowcategoryedit(false)
        setArrKeHoach("")
        setArrSuaKeHoach("")
        setClickKeHoach(false)
    }

    useEffect(() => {
        getAllKeHoachBaoDuong()
    }, [callback])

    const getAllKeHoachBaoDuong = async () => {
        const res = await Axios.get('/api/chitietbaoduong')
        setKeHoachBaoDuong(res.data)
    }

    const handleShowSuaKeHoach = () => {
        setShowSuaKeHoach(true)
    }

    const handleCloseSuaKeHoach = () => {
        setShowSuaKeHoach(false)
    }

    const handleShowKeHoach = () => {
        setShowKeHoach(true)
    }

    const handleCloseKeHoach = () => {
        setShowKeHoach(false)
    }

    const handleClickKeHoach = () => {
        setClickKeHoach(true)
        handleCloseKeHoach()
    }

    useEffect(() => {
        const arr = []
        if (ClickKeHoach) {
            for (let i = 0; i < keHoachBaoDuong?.length; i++) {
                arr.push(keHoachBaoDuong[i])
            }
            setArrKeHoach(arr)
        }
    }, [ClickKeHoach, keHoachBaoDuong])


    const handleEdit = async () => {
        try {
            const res = await Axios.put(`/api/categorys/${id}`, { name: category.name, ClickKeHoach: arrKeHoach ? arrKeHoach : arrSuaKeHoach }, {
                headers: { Authorization: token }
            })
            setCategory("")
            setShowcategoryedit(false)
            setArrKeHoach("")
            setClickKeHoach(false)
            setCallback(!callback)
            toast.success("Update Success")

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await Axios.post('/api/categorys', { name: category.name, ClickKeHoach: arrKeHoach }, {
                headers: { Authorization: token }
            })
            setCategory("")
            setShowcategory(false)
            setArrKeHoach("")
            setClickKeHoach(false)
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
                const res = await Axios.delete(`/api/categorys/${deleteId}`, {
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

    console.log(category.ChiTietBaoDuong)
    console.log(checkData)

    return (
        <>

            <Modal
                size="lg"
                show={showKeHoach}
                onHide={handleCloseKeHoach}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='bd-example nopadding'>
                        <table className="table table-hover table-bordered p-0">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope="col-1" className="text-center">Stt</th>
                                    <th scope="col-1" className="text-center">Km</th>
                                    <th scope="col-1" className="text-center">Tháng</th>
                                    <th scope="col-3" className="text-center">Lọc gió điều hòa</th>
                                    <th scope="col-3" className="text-center">Dầu phanh</th>
                                    <th scope="col-3" className="text-center">Hệ thống điều hòa</th>
                                    <th scope="col-2" className="text-center">Pin chìa khóa</th>
                                    <th scope="col-2" className="text-center">Pin BoT box</th>
                                    <th scope="col-2" className="text-center">Nước làm mát</th>
                                    <th scope="col-2" className="text-center">Hạng mục chung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    keHoachBaoDuong?.map((option, index) => (
                                        <tr key={option._id}>
                                            <td className=' text-center m-0'>{option.stt}</td>
                                            <td className='text-center'>{option.km}</td>
                                            <td className=' text-center'>{option.thang}</td>
                                            <td className=' text-center text-primary m-0'>{option.LocGioDieuHoa === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className='text-center text-primary m-0'>{option.DauPhanh === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className='text-center text-primary m-0'>{option.BaoDuongHeThongDieuHoa === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className='text-center text-primary m-0'>{option.PinChiaKhoaDieuKhien === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className=' text-center text-primary m-0'>{option.PinBoTBox === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className='text-center text-primary m-0'>{option.NuocLamMat === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                            <td className='text-center text-primary m-0'>{option.HangMucChung === 1 ? <><i className="fa-solid fa-circle-check"></i></> : <><i className="fa-regular fa-circle"></i></>}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseKeHoach}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickKeHoach}>Chọn</Button>
                </Modal.Footer>
            </Modal>

            {/* edit thông tin bao dưỡng */}
            <Modal
                size="lg"
                show={showSuaKeHoach}
                onHide={handleCloseSuaKeHoach}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit thông tin bảo dưỡng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='bd-example nopadding'>
                        <table className="table table-hover table-bordered p-0">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope="col-1" className="text-center">Stt</th>
                                    <th scope="col-1" className="text-center">Km</th>
                                    <th scope="col-1" className="text-center">Tháng</th>
                                    <th scope="col-3" className="text-center">Lọc gió điều hòa</th>
                                    <th scope="col-3" className="text-center">Dầu phanh</th>
                                    <th scope="col-3" className="text-center">Hệ thống điều hòa</th>
                                    <th scope="col-2" className="text-center">Pin chìa khóa</th>
                                    <th scope="col-2" className="text-center">Pin BoT box</th>
                                    <th scope="col-2" className="text-center">Nước làm mát</th>
                                    <th scope="col-2" className="text-center">Hạng mục chung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.ChiTietBaoDuong?.map((option, index) => (
                                        <tr key={option._id}>
                                            <td className=' text-center m-0'>{option.stt}</td>
                                            <td className='text-center'>{option.km}</td>
                                            <td className=' text-center'>{option.thang}</td>
                                            <td className=' text-center text-primary m-0'><input
                                                className='m-0'
                                                type="checkbox"
                                                name="LocGioDieuHoa"
                                                defaultValue="LocGioDieuHoa"
                                                // checked={option.LocGioDieuHoa === 1 ? true : false}
                                                onChange={(e) => handleChecked(e, index, option)}
                                            /></td>
                                            <td className='text-center text-primary m-0'><input
                                                className='m-0'
                                                type="checkbox"
                                                name="DauPhanh"
                                                defaultValue="DauPhanh"
                                                // checked={option.DauPhanh === 1 ? true : false}
                                                onChange={(e) => handleChecked(e, index, option)}
                                            /></td>
                                            <td className='text-center text-primary m-0'>
                                                <input
                                                    className='m-0'
                                                    type="checkbox"
                                                    name="BaoDuongHeThongDieuHoa"
                                                    //checked={option.BaoDuongHeThongDieuHoa === 1 ? true : false}
                                                    onChange={(e) => handleChecked(e, index, option)}
                                                /></td>
                                            <td className='text-center text-primary m-0'>
                                                <input
                                                    className='m-0'
                                                    type="checkbox"
                                                    name="PinChiaKhoaDieuKhien"
                                                    //checked={option.PinChiaKhoaDieuKhien === 1 ? true : false}
                                                    onChange={(e) => handleChecked(e, index, option)}
                                                /></td>
                                            <td className=' text-center text-primary m-0'><input
                                                className='m-0'
                                                type="checkbox"
                                                name="PinBoTBox"
                                                //checked={option.PinBoTBox === 1 ? true : false}
                                                onChange={(e) => handleChecked(e, index, option)}
                                            /></td>
                                            <td className='text-center text-primary m-0'>
                                                <input
                                                    className='m-0'
                                                    type="checkbox"
                                                    name="NuocLamMat"
                                                    //checked={option.NuocLamMat === 1 ? true : false}
                                                    onChange={(e) => handleChecked(e, index, option)}
                                                /></td>
                                            <td className='text-center text-primary m-0'>
                                                <input
                                                    className='m-0'
                                                    type="checkbox"
                                                    name="HangMucChung"
                                                    //checked={option.HangMucChung === 1 ? true : false}
                                                    onChange={(e) => handleChecked(e, index, option)}
                                                /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaKeHoach}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickKeHoach}>Sửa</Button>
                </Modal.Footer>
            </Modal>
            {/*  */}

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
                            <input type="text" className="form-control col-11" name="name" id="name" value={category.name} placeholder="..." onChange={handleChangeInput} required />
                        </div>
                    </div>
                    {
                        keHoachBaoDuong.length !== 0 &&
                        (
                            <>
                                <div className='pt-2'>
                                    <Button variant="primary" disabled={ClickKeHoach === true && ("disabled")} onClick={handleShowKeHoach}>{ClickKeHoach === true ? <><span>Đã chọn kế hoạch bảo dưỡng</span></> : <><span>Thêm kế hoạch bảo dưỡng</span></>}</Button>
                                </div>
                            </>
                        )
                    }
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
                        <div className="input-group">
                            <div className="input-group-prepend pl-0 pr-0">
                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-list d-flex"></i></span>
                            </div>
                            <input type="text" className="form-control col-11" name="name" id="name" value={category.name} placeholder="..." onChange={handleChangeInput} required />
                        </div>
                    </div>

                    {
                        category.ChiTietBaoDuong?.length !== 0
                            ?
                            <>
                                <div className='pt-2'>
                                    {/* <Button variant="primary" onClick={handleShowSuaKeHoach}>Sửa kế hoạch bảo dưỡng</Button> */}
                                    <Button variant="primary" onClick={handleShowKeHoach}>Xem kế hoạch bảo dưỡng</Button>
                                </div></>
                            :
                            <>
                                <div className='pt-2'>
                                    <Button variant="primary" disabled={ClickKeHoach === true && ("disabled")} onClick={handleShowKeHoach}>{ClickKeHoach === true ? <><span>Đã chọn kế hoạch bảo dưỡng</span></> : <><span>Thêm kế hoạch bảo dưỡng</span></>}</Button>
                                </div>
                            </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit(category._id)} >Update</Button>
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

export default CategoryCar