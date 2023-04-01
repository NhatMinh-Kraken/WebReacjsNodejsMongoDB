import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { read, utils } from 'xlsx'

function KeHoachBaoDuong() {
  const [excelRows, setExcelRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const requiredFields = ["stt", "km", "thang", "LocGioDieuHoa", "DauPhanh", "BaoDuongHeThongDieuHoa", "PinChiaKhoaDieuKhien", "PinBoTBox", "NuocLamMat", "HangMucChung"];
  const [loadding, setLoadding] = useState(false)
  const [callback, setCallback] = useState(false)
  const token = useSelector(state => state.token)
  const [keHoachBaoDuong, setKeHoachBaoDuong] = useState([])

  const [showCheckEditClick, setShowCheckEditClick] = useState(false)
  const [data, setData] = useState([])
  const [showDL, setShowDL] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const [checkLocGioDieuHoa, setCheckLocGioDieuHoa] = useState(false)
  const [numLocGioDieuHoa, setNumLocGioDieuHoa] = useState(0)

  const [checkDauPhanh, setCheckDauPhanh] = useState(false)
  const [numDauPhanh, setNumDauPhanh] = useState(0)

  const [checkBaoDuongHeThongDieuHoa, setCheckBaoDuongHeThongDieuHoa] = useState(false)
  const [numBaoDuongHeThongDieuHoa, setNumBaoDuongHeThongDieuHoa] = useState(0)

  const [checkPinChiaKhoaDieuKhien, setCheckPinChiaKhoaDieuKhien] = useState(false)
  const [numPinChiaKhoaDieuKhien, setNumPinChiaKhoaDieuKhien] = useState(0)

  const [checkPinBoTBox, setCheckPinBoTBox] = useState(false)
  const [numPinBoTBox, setNumPinBoTBox] = useState(0)

  const [checkNuocLamMat, setCheckNuocLamMat] = useState(false)
  const [numNuocLamMat, setNumNuocLamMat] = useState(0)

  const [checkHangMucChung, setCheckHangMucChung] = useState(false)
  const [numHangMucChung, setNumHangMucChung] = useState(0)

  useEffect(() => {
    getAllKeHoachBaoDuong()
  }, [callback])

  const getAllKeHoachBaoDuong = async () => {
    const res = await Axios.get('/api/chitietbaoduong')
    setKeHoachBaoDuong(res.data)
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
        await Axios.get("/api/chitietbaoduong")
      ).data;
      const jokeList = jokesResponse || [];

      const jokes = excelRows.map((obj) => ({
        _id: jokeList.find((x) => x.stt == obj["stt"])?._id,
        stt: obj["stt"] || "", //jokeId
        km: obj["km"] || "",
        thang: obj["thang"] || "",
        LocGioDieuHoa: obj["LocGioDieuHoa"] || "",
        DauPhanh: obj["DauPhanh"] || "",
        BaoDuongHeThongDieuHoa: obj["BaoDuongHeThongDieuHoa"] || "",
        PinChiaKhoaDieuKhien: obj["PinChiaKhoaDieuKhien"] || "",
        PinBoTBox: obj["PinBoTBox"] || "",
        NuocLamMat: obj["NuocLamMat"] || "",
        HangMucChung: obj["HangMucChung"] || "",
      }));

      const updatedJokes = jokes.filter((x) => x._id);
      const newJokes = jokes.filter((x) => !x._id);

      if (updatedJokes.length) {
        const result = (
          await Axios.post(
            '/api/chitietbaoduongUpdate',
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
            "/api/chitietbaoduong",
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

      getAllKeHoachBaoDuong();
      setCallback(!callback)
      setLoadding(false);
    } catch (err) {
      console.log(err)
      toast.error(`Dữ liệu không phụ hợp. Vui lòng tham khảo "stt", "km", "thang", "LocGioDieuHoa", "DauPhanh", "BaoDuongHeThongDieuHoa", "PinChiaKhoaDieuKhien", "PinBoTBox", "NuocLamMat", "HangMucChung" `)
    }
  }

  const handleShowEdit = (giatri) => {
    setShowCheckEditClick(true)
    setData(giatri)
  }

  const ClickCloseCheckEdit = () => {
    setShowCheckEditClick(false)
    setData("")
  }

  const handleClickEditCheck = async () => {
    try {
      const res = await Axios.put(`/api/chitietbaoduong/${data._id}`, {
        km: data.km,
        thang: data.thang,
        LocGioDieuHoa: checkLocGioDieuHoa ? 1 : 2,
        DauPhanh: checkDauPhanh ? 1 : 2,
        BaoDuongHeThongDieuHoa: checkBaoDuongHeThongDieuHoa ? 1 : 2,
        PinChiaKhoaDieuKhien: checkPinChiaKhoaDieuKhien ? 1 : 2,
        PinBoTBox: checkPinBoTBox ? 1 : 2,
        NuocLamMat: checkNuocLamMat ? 1 : 2,
        HangMucChung: checkHangMucChung ? 1 : 2
      }, {
        headers: { Authorization: token }
      })
      ClickCloseCheckEdit()
      toast.success(res.data.msg)
      setNumLocGioDieuHoa(0)
      setNumDauPhanh(0)
      setNumBaoDuongHeThongDieuHoa(0)
      setNumPinChiaKhoaDieuKhien(0)
      setNumPinBoTBox(0)
      setNumNuocLamMat(0)
      setNumHangMucChung(0)
      setCallback(!callback)
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }

  const handleShowDelete = (id) => {
    setShowDL(true)
    setDeleteId(id)
  }

  const handleCloseDelete = () => {
    setDeleteId("")
    setShowDL(false)
  }

  const handleDelete = async () => {
    try {
      const res = await Axios.delete(`/api/chitietbaoduong/${deleteId}`, {
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

  const handleChangeInput = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  useEffect(() => {
    setCheckLocGioDieuHoa(data.LocGioDieuHoa === 1 ? true : false)
    setCheckDauPhanh(data.DauPhanh === 1 ? true : false)
    setCheckBaoDuongHeThongDieuHoa(data.BaoDuongHeThongDieuHoa === 1 ? true : false)
    setCheckPinChiaKhoaDieuKhien(data.PinChiaKhoaDieuKhien === 1 ? true : false)
    setCheckPinBoTBox(data.PinBoTBox === 1 ? true : false)
    setCheckNuocLamMat(data.NuocLamMat === 1 ? true : false)
    setCheckHangMucChung(data.HangMucChung === 1 ? true : false)
  }, [data])


  const handleCheckLocGioDieuHoa = e => {
    setCheckLocGioDieuHoa(!checkLocGioDieuHoa)
    setNumLocGioDieuHoa(numLocGioDieuHoa + 1)
  }

  const handleCheckDauPhanh = e => {
    setCheckDauPhanh(!checkDauPhanh)
    setNumDauPhanh(numDauPhanh + 1)
  }

  const handleCheckBaoDuongHeThongDieuHoa = e => {
    setCheckBaoDuongHeThongDieuHoa(!checkBaoDuongHeThongDieuHoa)
    setNumBaoDuongHeThongDieuHoa(numBaoDuongHeThongDieuHoa + 1)
  }

  const handleCheckPinChiaKhoaDieuKhien = e => {
    setCheckPinChiaKhoaDieuKhien(!checkPinChiaKhoaDieuKhien)
    setNumPinChiaKhoaDieuKhien(numPinChiaKhoaDieuKhien + 1)
  }

  const handleCheckPinBoTBox = e => {
    setCheckPinBoTBox(!checkPinBoTBox)
    setNumPinBoTBox(numPinBoTBox + 1)
  }

  const handleCheckNuocLamMat = e => {
    setCheckNuocLamMat(!checkNuocLamMat)
    setNumNuocLamMat(numNuocLamMat + 1)
  }

  const handleCheckHangMucChung = e => {
    setCheckHangMucChung(!checkHangMucChung)
    setNumHangMucChung(numHangMucChung + 1)
  }

  return (
    <>
      <Modal
        size="lg"
        show={showCheckEditClick}
        onHide={ClickCloseCheckEdit}
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
                <tr>
                  <td className=' text-center m-0'>{data.stt}</td>
                  <td className='text-center'>
                    <Form.Control type="text" name="km" defaultValue={data.km} onChange={handleChangeInput} />
                  </td>
                  <td className=' text-center'>
                    <Form.Control type="text" name="thang" defaultValue={data.thang} onChange={handleChangeInput} />
                  </td>
                  <td className=' text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="LocGioDieuHoa"
                      checked={checkLocGioDieuHoa}
                      onChange={handleCheckLocGioDieuHoa}
                    />
                  </td>
                  <td className='text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="DauPhanh"
                      checked={checkDauPhanh}
                      onChange={handleCheckDauPhanh}
                    />
                  </td>
                  <td className='text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="BaoDuongHeThongDieuHoa"
                      checked={checkBaoDuongHeThongDieuHoa}
                      onChange={handleCheckBaoDuongHeThongDieuHoa}
                    />
                  </td>
                  <td className='text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="PinChiaKhoaDieuKhien"
                      checked={checkPinChiaKhoaDieuKhien}
                      onChange={handleCheckPinChiaKhoaDieuKhien}
                    />
                  </td>
                  <td className=' text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="PinBoTBox"
                      checked={checkPinBoTBox}
                      onChange={handleCheckPinBoTBox}
                    />
                  </td>
                  <td className='text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="NuocLamMat"
                      checked={checkNuocLamMat}
                      onChange={handleCheckNuocLamMat}
                    />
                  </td>
                  <td className='text-center text-primary m-0'>
                    <input
                      className='m-0'
                      type="checkbox"
                      name="HangMucChung"
                      checked={checkHangMucChung}
                      onChange={handleCheckHangMucChung}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
            </Row>
          </div>
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
                  <th scope="col-2" className="text-center"><i className="fa-solid fa-gear"></i></th>
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
                      <td className='text-center'>
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

export default KeHoachBaoDuong