import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormGroup, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { fetchAllUsers, dispatchGetAllUsers } from '../../../../../src/redux/action/userAction'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../../Profile/Profiles/ProfileUser.scss'

import { read, utils } from 'xlsx'

import Loadding from '../../../utils/Loadding/Loadding2'

import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import { path } from '../../../utils/constant'
import 'mapbox-gl/dist/mapbox-gl.css';

import './AllDaiLy.scss'

const initialState = {
    name: '',
    numberphone: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
}
function AllDaiLy() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)

    const requiredFields = ["ID", "Name", "Latitude", "Longitude", "Address", "Phone", "Email"];

    const [deleteId, setDeleteId] = useState("")

    const [show, setShow] = useState(false)

    const [onEdit, setOnEdit] = useState(false)
    const [giatri, setGiaTri] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    // const users = useSelector(state => state.users)

    const [excelRows, setExcelRows] = useState([]);
    // const [loading, setLoading] = useState(false
    const [callback, setCallback] = useState(false)

    const [daily, setDaiLy] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [clickDaiLy, setClickDaiLy] = useState([])

    const [loadding, setLoadding] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

    const [toado, setToaDo] = useState(null)
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "420px",
        latitude: 11.134113,
        longitude: 106.554409,
        zoom: 8
    })

    useEffect(() => {
        getAllDaiLy()
    }, [callback])

    const getAllDaiLy = async () => {
        const res = await Axios.get('/api/daily')
        setDaiLy(res.data)
    }

    const handleMarkerClick = (id, lat, long, dl) => {
        setCurrentPlaceId(id)
        setViewport({ ...viewport, latitude: lat, longitude: long })
        setClickDaiLy(dl)
    }

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true);
        setDeleteId(id)
    }


    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setClickDaiLy({ ...clickDaiLy, [name]: value })
    }

    const handleDelete = async () => {
        try {
            setLoadding(true)
            const res = await Axios.delete(`/api/daily/${deleteId}`, {
                headers: { Authorization: token }
            })
            setShow(false)
            setLoadding(false)
            toast.success(res.data.msg)
            setCallback(!callback)
            getAllDaiLy()
            setClickDaiLy([])

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleEdit = (giatri) => {
        setOnEdit(true)
        setClickDaiLy(giatri)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoadding(true)
            if (!isAdmin) {
                toast.error("You're not an admin")
            }
            const res = await Axios.put(`/api/putForOne/${clickDaiLy._id}`, {
                Name: clickDaiLy.Name,
                Address: clickDaiLy.Address,
                Phone: clickDaiLy.Phone,
                Email: clickDaiLy.Email
            }, {
                headers: { Authorization: token }
            })
            setLoadding(false)
            toast.success(res.data.msg)
            setCallback(!callback)
            setOnEdit(false)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
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
                await Axios.get("/api/daily")
            ).data;
            const jokeList = jokesResponse || [];

            const jokes = excelRows.map((obj) => ({
                _id: jokeList.find((x) => x.jokeId == obj["ID"])?._id,
                jokeId: obj["ID"] || "",
                Name: obj["Name"] || "",
                Latitude: obj["Latitude"] || "",
                Longitude: obj["Longitude"] || "",
                Address: obj["Address"] || "",
                Phone: obj["Phone"] || "",
                Email: obj["Email"] || "",
            }));

            const updatedJokes = jokes.filter((x) => x._id);
            const newJokes = jokes.filter((x) => !x._id);

            if (updatedJokes.length) {
                const result = (
                    await Axios.post(
                        '/api/dailyUpdate',
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
                        "/api/daily",
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

            getAllDaiLy();
            setLoadding(false);
        } catch (err) {
            console.log(err)
            toast.error(`Dữ liệu không phụ hợp. Vui lòng tham khảo "["ID", "Name", "Email", "Phone", "ChucVu", "ChucVuCuThe"]" `)
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
                    Bạn có chắc muốn xóa đại lý này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>
            {
                loadding
                    ?
                    <>
                        <Loadding />
                    </>
                    :
                    <>
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
                                </div>
                                <div className='bd-example'>
                                    <ReactMapGL
                                        style={{ width: "100%", height: "400px" }}
                                        mapStyle="mapbox://styles/minhnguyen7/clece19sp001501qnjewr6dee"
                                        mapboxAccessToken={path.TOKENMAP}
                                        initialViewState={{
                                            ...viewport
                                        }}
                                        onViewportChange={(viewport) => setViewport(viewport)}
                                    >
                                        {
                                            daily.map(dl => (
                                                <>
                                                    <Marker
                                                        key={dl._id}
                                                        latitude={dl.Latitude}
                                                        longitude={dl.Longitude}
                                                        offsetLeft={-20}
                                                        offsetTop={-30}
                                                        style={{ cursor: "pointer", }}
                                                        // onClick={(e) => setToaDo(e)}
                                                        onClick={() => handleMarkerClick(dl._id, dl.Latitude, dl.Longitude, dl)}
                                                    >
                                                        <i className="fa-solid fa-location-dot text-danger" style={{ width: 30, height: 35.35, fontSize: 35 }}></i>
                                                    </Marker>

                                                    {
                                                        dl._id === currentPlaceId && (
                                                            <Popup
                                                                latitude={dl.Latitude}
                                                                longitude={dl.Longitude}
                                                                closeButton={true}
                                                                closeOnClick={false}
                                                                anchor="bottom"
                                                                style={{ cursor: "pointer", }}
                                                                onClose={() => setCurrentPlaceId(null)}
                                                            >
                                                                <div className='card-address'>
                                                                    <p className='m-0'>{dl.Name}</p>
                                                                </div>

                                                            </Popup>
                                                        )
                                                    }

                                                </>
                                            ))
                                        }

                                        <NavigationControl position="bottom-right" />
                                        <GeolocateControl
                                            position="top-left"
                                            trackUserLocation
                                        />
                                    </ReactMapGL>

                                    {
                                        clickDaiLy.length !== 0
                                            ?
                                            <>
                                                <div className='form-thongtin-daily pt-5' style={{ height: onEdit ? "350px" : "280px" }}>
                                                    <div className='form-thongtin-daily-body p-3'>
                                                        <div className='form-thongtin-daily-body-title pb-2 d-flex align-items-center'>
                                                            <span className='text-primary col-2' style={{ width: "11.666667%" }}> Tên đại lý:</span>
                                                            {onEdit
                                                                ?
                                                                <>
                                                                    <Form.Control
                                                                        className='w-75 col-10'
                                                                        required
                                                                        type="text"
                                                                        name='Name'
                                                                        defaultValue={clickDaiLy.Name}
                                                                        onChange={handleChangeInput}
                                                                    />
                                                                </>
                                                                :
                                                                <>
                                                                    <span>{clickDaiLy.Name}</span>
                                                                </>
                                                            }
                                                        </div>
                                                        <div className='pb-2 d-flex align-items-center'>
                                                            <span className='col-2' style={{ width: "11.666667%" }}>
                                                                <i className="fa-solid fa-location-dot text-primary pr-2"></i><span className='text-primary'>Địa chỉ:</span>
                                                            </span>
                                                            {
                                                                onEdit
                                                                    ?
                                                                    <>
                                                                        <Form.Control
                                                                            className='w-75 col-10'
                                                                            required
                                                                            type="text"
                                                                            name='Address'
                                                                            defaultValue={clickDaiLy.Address}
                                                                            onChange={handleChangeInput}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span>{clickDaiLy.Address}</span>
                                                                    </>
                                                            }
                                                        </div>
                                                        <div className='pb-2 d-flex align-items-center'>
                                                            <span className='col-2' style={{ width: "11.666667%" }}><i className="fa-solid fa-phone-volume text-primary pr-2"></i><span className='text-primary'>Phone:</span></span>
                                                            {
                                                                onEdit
                                                                    ?
                                                                    <>
                                                                        <Form.Control
                                                                            className='w-75 col-10'
                                                                            required
                                                                            type="text"
                                                                            name='Phone'
                                                                            defaultValue={clickDaiLy.Phone}
                                                                            onChange={handleChangeInput}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span>{clickDaiLy.Phone}</span>
                                                                    </>
                                                            }
                                                        </div>
                                                        <div className='pb-2 d-flex align-items-center'>
                                                            <span className='col-2' style={{ width: "11.666667%" }}>
                                                                <i className="fa-solid fa-envelope text-success pr-2"></i><span className='text-success'>Email:</span>
                                                            </span>
                                                            {
                                                                onEdit
                                                                    ?
                                                                    <>
                                                                        <Form.Control
                                                                            className='w-75 col-10'
                                                                            required
                                                                            type="text"
                                                                            name='Email'
                                                                            defaultValue={clickDaiLy.Email}
                                                                            onChange={handleChangeInput}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span>{clickDaiLy.Email}</span>
                                                                    </>
                                                            }
                                                        </div>
                                                        <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-center'>
                                                            {
                                                                onEdit
                                                                    ?
                                                                    <>
                                                                        <Button onClick={handleSave} className='mr-2' style={{ width: "110px" }}><i className="fa-solid fa-pen-to-square pr-2"></i>Save</Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Button onClick={() => handleEdit(clickDaiLy)} className='mr-2' style={{ width: "110px" }}><i className="fa-solid fa-pen-to-square pr-2"></i>Edit</Button>
                                                                    </>
                                                            }
                                                            <Button onClick={() => handleShow(clickDaiLy._id)} className='bg-danger' style={{ width: "110px" }}><i className="fa-solid fa-trash pr-2"></i>Delete</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default AllDaiLy