import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormGroup, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../../redux/action/userAction'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../../Profiles/ProfileUser.scss'

import { read, utils } from 'xlsx'

import Loadding from '../../../../utils/Loadding/Loadding2'

const initialState = {
    name: '',
    numberphone: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
}
function ProfileAllUser() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)

    const requiredFields = ["ID", "Name", "Email", "Phone", "Password", "ChucVu", "ChucVuCuThe"];

    const [deleteId, setDeleteId] = useState("")

    const [show, setShow] = useState(false)
    const [showAll, setShowAll] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);

    // const users = useSelector(state => state.users)

    const [addUser, setAddUser] = useState(false)

    const [excelRows, setExcelRows] = useState([]);
    // const [loading, setLoading] = useState(false
    const [callback, setCallback] = useState(false)

    const [users, setUsers] = useState([])

    const [excel, setExcel] = useState()

    const [loadding, setLoadding] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

    useEffect(() => {
        getAllUser()
    }, [callback])

    const getAllUser = async () => {
        const res = await Axios.get('/user/all_infor')
        setUsers(res.data)
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }


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
        setAddUser(false)
        setShowAll(false)
    }

    const address = userAll.nameWard + ", " + userAll.nameDis + ", " + userAll.nameCity

    const handleShowAdd = () => {
        setAddUser(true)
        setShowAll(true)
    }

    const handleAddUser = () => {

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
                await Axios.get("/user/all_infor")
            ).data;
            const jokeList = jokesResponse || [];

            const jokes = excelRows.map((obj) => ({
                _id: jokeList.find((x) => x.jokeId == obj["ID"])?._id,
                jokeId: obj["ID"] || "",
                name: obj["Name"] || "",
                email: obj["Email"] || "",
                numberphone: obj["Phone"] || "",
                password: obj["Password"] || "",
                chucvu: obj["ChucVu"] || "",
                chucvucuthe: obj["ChucVuCuThe"] || "",
            }));

            const updatedJokes = jokes.filter((x) => x._id);
            const newJokes = jokes.filter((x) => !x._id);

            if (updatedJokes.length) {
                const result = (
                    await Axios.post(
                        '/user/update-nv-user',
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
                        "/user/insert-nv-user",
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

            getAllUser();
            setLoadding(false);
        } catch (err) {
            console.log(err)
            toast.error(`Dữ liệu không phụ hợp. Vui lòng tham khảo "["ID", "Name", "Email", "Phone","Password", "ChucVu = "Nhân viên"", "ChucVuCuThe = ví dụ "1" or "2"]" `)
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
                    Add user
                </Modal.Header>
                <Modal.Body>
                    {
                        addUser
                            ?
                            <>
                                <div className='tab-content'>
                                    <Form >
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Label>Họ và tên</Form.Label>
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
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    className='w-100'
                                                    required
                                                    type="text"
                                                    defaultValue={data.numberphone}
                                                    name='numberphone'
                                                    onChange={handleChangeInput}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    className='w-100'
                                                    required
                                                    type="password"
                                                    defaultValue={data.password}
                                                    name='password'
                                                    onChange={handleChangeInput}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Label>Repeat password</Form.Label>
                                                <Form.Control
                                                    className='w-100'
                                                    required
                                                    type="password"
                                                    defaultValue={data.cf_password}
                                                    name='cf_password'
                                                    onChange={handleChangeInput}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Form >
                                </div>
                            </>
                            :
                            <>
                                <table className="table table-bordered">
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
                            </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        addUser ?
                            <>
                                <Button type="submit" onClick={handleAddUser}>Submit form</Button>
                            </>
                            :
                            null
                    }
                    <Button variant="secondary" onClick={handleCloseAll}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item_body'>
                <div className='profile_item_info col-12'>
                    <div className='d-flex col-12'>
                        <Row className="mb-3 col-6 d-flex">
                            <Form.Group as={Col} md="12 text-left" className='d-flex' controlId="validationCustom01">
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
                                    <Form.Text>
                                        {
                                            "ví dụ như : ChucVu = 'Nhân viên' ChucVuCuThe = ví dụ '1' => nhân viên kỹ thuật"
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
                        </Row>
                        <div className=' col-6 category_item pb-3 d-flex align-items-center justify-content-end'>
                            <button onClick={(handleShowAdd)}><i className="fa-solid fa-plus" title='add'></i></button>
                        </div>
                    </div>
                    <div className='bd-example'>
                        <table className="table table-hover table-bordered">
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope="col-1" className="text-center">#</th>
                                    <th scope="col-3" className="text-center">Name</th>
                                    <th scope="col-4" className="text-center">Email</th>
                                    <th scope="col-1" className="text-center">Admin</th>
                                    <th scope="col-1" className="text-center">Employee</th>
                                    <th scope="col-2" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <th scope="row" className='col-1 text-center'>{index + 1}</th>
                                            <td className='col-3 text-center'>{user.name}</td>
                                            <td className='col-4 text-center'>{user.email}</td>
                                            <td className='col-1 text-center m-0'>{user.role === 1 ? <i className="fa-solid fa-circle-check text-primary"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</td>
                                            <td className='col-1 text-center m-0'>{user.chucvu === "Nhân viên" ? <i className="fa-solid fa-circle-check text-primary"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</td>
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