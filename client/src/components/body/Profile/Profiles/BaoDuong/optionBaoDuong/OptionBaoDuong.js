import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { read, utils } from 'xlsx'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Modal } from 'react-bootstrap';

import '../optionBaoDuong/optionBaoDuong.scss'

function OptionBaoDuong() {
    const [loadding, setLoadding] = useState(false)
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [optionBaoDuong, setOptionBaoDuong] = useState([])
    const [loaibaoduong, setLoaiBaoDuong] = useState(null)
    const requiredFields = ["Stt", "Name", "Mota", "Money"];
    const [showDL, setShowDL] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [data, setData] = useState([])
    const [callback, setCallback] = useState(false)
    const [checkId, setCheckId] = useState([])
    const [deleteId, setDeleteId] = useState("")
    const [checkEditClick, setCheckEditClick] = useState([])
    const [showCheckEditClick, setShowCheckEditClick] = useState(false)
    const [loaihinhbaoduong, setLoaiHinhBaoDuong] = useState([])
    const [idLoaiDichVuEdit, setIdLoaiDichVuEdit] = useState("")

    const [clickCheck, setClickCheck] = useState(false)

    useEffect(() => {
        getAllOption()
        const getLoaiBaoDuong = async () => {
            const res = await Axios.get('/api/loaibaoduong')
            setLoaiBaoDuong(res.data)
        }
        getLoaiBaoDuong()
    }, [callback])

    const getAllOption = async () => {
        const res = await Axios.get('/api/get-optionbaoduong')
        setOptionBaoDuong(res.data)
    }

    const changeExcel = async (e) => {
        try {
            const file = e.target.files[0]
            setSelectedFile(file);
            const reader = new FileReader()
            reader.onload = (e) => {
                const dataFile = e.target.result;
                const workbook = read(dataFile, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                setExcelRows(json);
            }
            reader.readAsArrayBuffer(file);
        } catch (err) {
            console.log(err)
        }
    }

    const uploadData = async () => {
        try {
            setLoadding(true)
            const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);

            let requiredValidation = false;

            if (firstItemKeys.length) {
                requiredFields.forEach((element) => {
                    if (!firstItemKeys.find((x) => x === element)) {
                        requiredValidation = true;
                    }
                });
            }

            if (requiredValidation) {
                alert("Required fields " + JSON.stringify(requiredFields));
                setLoadding(false);
                return;
            }

            const jokesResponse = (
                await Axios.get("/api/get-optionbaoduong")
            ).data;
            const jokeList = jokesResponse || [];

            const jokes = excelRows.map((obj) => ({
                _id: jokeList.find((x) => x.jokeId == obj["Stt"])?._id,
                jokeId: obj["Stt"] || "",
                name: obj["Name"] || "",
                mota: obj["Mota"] || "",
                money: obj["Money"] || "",
            }));

            const updatedJokes = jokes.filter((x) => x._id);
            const newJokes = jokes.filter((x) => !x._id);

            if (updatedJokes.length) {
                const result = (
                    await Axios.post(
                        '/api/update-optionbaoduong',
                        updatedJokes,
                        {
                            headers: { Authorization: token }
                        }
                    )
                ).data;

                if (result) {
                    toast.success("Successfully updated " + updatedJokes.length + " documents");
                }

                setSelectedFile(null);
                setExcelRows([]);
            }

            if (newJokes.length) {
                const result = (
                    await Axios.post(
                        "/api/insert-optionbaoduong",
                        newJokes,
                        {
                            headers: { Authorization: token }
                        }
                    )
                ).data;

                if (result) {
                    toast.success("Successfully added " + newJokes.length + " documents");
                }

                setSelectedFile(null);
                setExcelRows([]);
            }

            getAllOption();
            setCallback(!callback)
            setLoadding(false);
        } catch (err) {
            console.log(err)
            toast.error(`Dữ liệu không phụ hợp. Vui lòng tham khảo "["Stt", "Name", "Mota", "Money"]" `)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const handleShowEdit = (giatri) => {
        setShowAll(true)
        setData(giatri)
        setIdLoaiDichVuEdit(giatri.IdLoaiDichVu._id ? giatri.IdLoaiDichVu._id : null)
    }

    const handleCloseAll = () => {
        setShowAll(false)
        setData("")
        setIdLoaiDichVuEdit("")
    }

    const handleShowDelete = (id) => {
        setDeleteId(id)
        setShowDL(true)
    }

    const handleCloseDelete = () => {
        setDeleteId("")
        setShowDL(false)
    }

    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`/api/delete-optionbaoduong/${deleteId}`, {
                headers: { Authorization: token }
            })
            setShowDL(false)
            setData("")
            setCallback(!callback)
            toast.success("Delete Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleEdit = async () => {
        try {
            const res = await Axios.put(`/api/put-optionbaoduong/${data._id}`, { name: data.name, money: data.money, mota: data.mota, IdLoaiDichVu: data.IdLoaiDichVu }, {
                headers: { Authorization: token }
            })
            setShowAll(false)
            setData("")
            setCallback(!callback)
            toast.success("Update Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    const ClickCheckEdit = (giatri) => {
        setCheckEditClick(giatri)
        setShowCheckEditClick(true)
    }

    const ClickCloseCheckEdit = () => {
        setCheckEditClick("")
        setShowCheckEditClick(false)
    }

    const handleClickEditCheck = async () => {
        try {
            if (loaihinhbaoduong) {
                await Axios.post('/api/post-editMultipleCheck', {
                    checkId,
                    loaihinhbaoduong
                }, {
                    headers: { Authorization: token }
                })
                setLoaiHinhBaoDuong([])
                setClickCheck(false)
                setCheckId("")
                setShowCheckEditClick(false)
                setCallback(!callback)

                toast.success("Update Success")
            }
            else {
                toast.success("Hãy chọn loại hình bảo dưỡng")
            }
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <>

            <Modal
                show={showCheckEditClick}
                onHide={ClickCloseCheckEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Danh sách</Form.Label>
                                {
                                    checkId.length !== 0 && (
                                        <>
                                            {
                                                checkId.map(gt => (
                                                    <>
                                                        <div className='text-success' key={gt._id}>
                                                            <i className="fa-solid fa-circle-check pr-2"></i>
                                                            <span className='font-weight-light'>{gt.name}</span>
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>lựa chọn loại hình bảo dưỡng</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    className='w-100'
                                    required
                                    name='IdLoaiDichVu'
                                    onChange={e => setLoaiHinhBaoDuong(e.target.value)}>
                                    <option>Open this select menu</option>
                                    {
                                        loaibaoduong?.map((op) => (
                                            <option key={op._id} value={op._id}>{op.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ClickCloseCheckEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickEditCheck}>Edit</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showDL}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    Bạn có chắc muốn xóa mục này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAll}
                onHide={handleCloseAll}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    Add user
                </Modal.Header>
                <Modal.Body>
                    <div className='tab-content'>
                        <Form >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>tên option</Form.Label>
                                    <Form.Control
                                        className='w-100'
                                        required
                                        type="text"
                                        defaultValue={data.name}
                                        name='name'
                                        onChange={handleChangeInput}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className='w-100'
                                        required
                                        defaultValue={data.mota}
                                        name='mota'
                                        onChange={handleChangeInput}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Giá tiền</Form.Label>
                                    <Form.Control
                                        className='w-100'
                                        required
                                        type="text"
                                        defaultValue={data.money}
                                        name='money'
                                        onChange={handleChangeInput}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Loại bảo dưỡng</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        className='w-100'
                                        required
                                        name='IdLoaiDichVu'
                                        onChange={handleChangeInput}>
                                        <option>Open this select menu</option>
                                        {
                                            loaibaoduong?.map((op) => (
                                                <option key={op._id} value={op._id} selected={idLoaiDichVuEdit == op._id}>{op.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </Form >
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleEdit}>Submit form</Button>
                    <Button variant="secondary" onClick={handleCloseAll}>Close</Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item_body'>
                <div className='profile_item_info col-12'>
                    <div className='d-flex col-12'>
                        <Row className="mb-3 col-12 d-flex">
                            <Form.Group as={Col} md="6 text-left" className='d-flex' controlId="validationCustom01">
                                <div className='d-flex flex-column'>
                                    <Form.Control
                                        onClick={e => (e.target.value = null)}
                                        className='fileXslx'
                                        required
                                        type="file"
                                        name='file'
                                        onChange={changeExcel}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    />
                                    <Form.Text>
                                        {
                                            "NOTE: The headers in the Excel file should be as follows!. => "
                                        }
                                        {
                                            requiredFields.join(", ")
                                        }
                                    </Form.Text>
                                </div>

                                <div className='pl-2 d-flex'>
                                    {
                                        selectedFile?.name
                                            ?
                                            <>
                                                <Button className='button-xslx' color="success" onClick={uploadData}>Upload</Button>
                                            </>
                                            :
                                            null
                                    }
                                </div>
                            </Form.Group>
                            <div className='col-6 d-flex justify-content-end'>
                                {
                                    checkId.length !== 0 && (
                                        <span className='span-edit-cricle '><Button onClick={ClickCheckEdit} className=''><i className="fa-solid fa-pen-to-square"></i></Button><p className=' m-0'>Sửa thông tin option bảo dưỡng hàng loạt </p></span>
                                    )
                                }
                            </div>
                        </Row>
                    </div>
                    <div className='bd-example'>
                        <table className="table table-hover table-bordered">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope="col-1" className="text-center"></th>
                                    <th scope="col-1" className="text-center">#</th>
                                    <th scope="col-2" className="text-center">Name</th>
                                    <th scope="col-4" className="text-center">Mô tả</th>
                                    <th scope="col-1" className="text-center">Giá tiền</th>
                                    <th scope="col-2" className="text-center">Loại hình bảo dưỡng</th>
                                    <th scope="col-2" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    optionBaoDuong?.map((option, index) => (
                                        <tr key={option._id}>
                                            <td className='col-1 text-center m-0'>
                                                <input type="checkbox" checked={clickCheck} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setClickCheck(true)
                                                        setCheckId([
                                                            ...checkId,
                                                            {
                                                                _id: option._id,
                                                                name: option.name,
                                                                money: option.money,
                                                                moto: option.moto,
                                                                IdLoaiDichVu: option.IdLoaiDichVu
                                                            }
                                                        ])
                                                    }
                                                    else {
                                                        setCheckId(
                                                            checkId.filter((c) => c._id !== option._id)
                                                        )
                                                    }
                                                }
                                                } className={`custom-control-inputs opacity-1`} id="customCheck1" />
                                            </td>
                                            <td className='col-1 text-center m-0'>{option.jokeId}</td>
                                            <td className='col-2 text-center'>{option.name}</td>
                                            <td className='col-4 text-center'>{option.mota}</td>
                                            <td className='col-1 text-center m-0'>{option.money}</td>
                                            <td className='col-2 text-center m-0'>{
                                                option.IdLoaiDichVu
                                                    ?
                                                    <>
                                                        {
                                                            option.IdLoaiDichVu.name
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        chưa có
                                                    </>
                                            }</td>
                                            <td className='col-2 text-center'>
                                                <a onClick={() => handleShowEdit(option)}><i className="fa-solid fa-pen-to-square text-success mr-2" title='edit'></i></a>
                                                <a onClick={() => handleShowDelete(option._id)}><i className="fa-solid fa-trash text-danger" title='delete'></i></a>
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

export default OptionBaoDuong