import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function DichVuBaoDuongChung({ datLichBaoDuongUser, setCallback, callback, handleClick, id }) {
  const token = useSelector(state => state.token)
  // const [callback, setCallback] = useState(false)

  const [optionBuoc1, setOptionBuoc1] = useState([])
  const [optiondichvuChung, setOptionDichVuChung] = useState([])
  const [show, setShow] = useState(false)
  const [option, setOption] = useState([])
  const [dem, setDem] = useState(0)
  const [optionChung, setOptionChung] = useState([])

  const css = {
    border: "1px solid #1fd249",
    //background: "#d4edda"
  }

  const handleShow = (giatri) => {
    setShow(true)
    setOption(giatri)
  }

  const handleClose = () => {
    setShow(false)
    setOption([])
  }

  useEffect(() => {
    setOptionBuoc1(datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1)
  }, [datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1])


  useEffect(() => {
    let tamp = 0
    for (let i = 0; i < optionBuoc1?.length; i++) {
      if (optionBuoc1[i].HoanThanh === 1) {
        tamp++
      }
    }
    setDem(tamp)
  }, [optionBuoc1, callback])


  const handleHoanThanh = async (giatri) => {
    try {
      await Axios.put(`/api/hoanthanh-optionB1/${id}`, { HoanThanh: 1, IdOption: giatri._id }, {
        headers: { Authorization: token }
      })
      setCallback(!callback)
      toast.success("Susscess !!!")
    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err)
    }
  }

  console.log(optionBuoc1)

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết option bảo dưỡng</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-5'>
          <div className='form-chitiet-baoduong'>
            <div className='form-chitiet-baoduong-header'>{option.name}</div>
            <div className='form-chitiet-baoduong-body pt-2'><i className="fa-solid fa-gear pr-1"></i>{option.mota}</div>
          </div>
        </Modal.Body>
      </Modal>

      <div className='form-dichvu-baoduong-chung'>
        <div className='form-dichvu-baoduong-chung-header d-flex col-12'>
          <div className='d-flex flex-column col-6'>
            <span>Dịch vụ bảo dưỡng chung</span>
            <p className='m-0'>Đã hoàn Thành : {dem} / {optionBuoc1?.length}</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            {
              datLichBaoDuongUser.Buoc1.HoanThanhB1 === 1 && (
                <>
                  <div className='chungchi-hoanthanh p-3'>
                    <span>Hoàn Thành </span>
                    <i className="fa-solid fa-medal"></i>
                  </div>
                </>
              )
            }
          </div>
        </div>
        <div className='form-dichvu-baoduong-chung-body pt-3 col-12'>
          {
            optionBuoc1.length === 0
              ?
              <>
                <span className='d-flex text-danger justify-content-center'>Khách hàng không chọn dịch vụ chung</span>
              </>
              :
              <>
                <div className='row'>
                  {
                    optionBuoc1?.map((lt, index) => (
                      <>
                        <div className='form-dichvu-baoduong-chung-text col-4 p-3 m-1' style={lt.HoanThanh === 1 ? css : null} key={lt._id}>
                          <div className='d-flex pt-2 pb-3 col-12 p-0'>
                            <div className='form-dichvu-baoduong-chung-text-stt d-flex justify-content-center align-items-center col-2 p-0'>{index + 1}</div>
                            <div className='form-dichvu-baoduong-chung-text-name d-flex align-items-center pl-2 col-7 pb-0 pr-0'>
                              {lt.name}
                            </div>
                            <div className='form-dichvu-baoduong-chung-text-chitiet d-flex align-items-center justify-content-end pl-2 col-4 p-0' onClick={() => handleShow(lt)}>
                              chi tiết
                            </div>
                          </div>
                          <div className='d-flex col-12 p-0'>
                            <div className={`form-dichvu-baoduong-chung-text-trang-thai d-flex flex-column justify-content-around p-0 ${lt.HoanThanh === 0 ? "col-6" : "col-12"}`}>
                              {
                                lt.HoanThanh === 0 ?
                                  <>
                                    <span className='text-danger d-flex align-items-center font-weight-bold'>Chưa hoàn thành</span>
                                  </>
                                  :
                                  <>
                                    <span className='text-success d-flex align-items-center font-weight-bold justify-content-center'>Đã hoàn thành</span>
                                    <div className='d-flex col-12'>
                                      <p className='text-success m-0 col-6'>Ngày: {lt.NgayHoanThanh}</p>
                                      <p className='text-success m-0 col-6 d-flex justify-content-end'>Thời gian: {lt.ThoiGianHoanThanh}</p>
                                    </div>
                                  </>
                              }
                            </div>
                            {
                              lt.HoanThanh === 0 && (<>
                                <div className='form-dichvu-baoduong-chung-text-button col-6 p-0 d-flex justify-content-end'>
                                  <Button className='bg-success' style={{ width: "130px" }} onClick={() => handleHoanThanh(lt)}>Hoàn thành</Button>
                                </div>
                              </>)
                            }
                          </div>
                        </div>
                      </>
                    ))
                  }
                </div>
              </>
          }

        </div>
      </div>

      {
        dem === optionBuoc1?.length && (<>
          <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-end'>
            <Button onClick={handleClick} className='bg-primary' style={{ width: "150px" }}>Tiếp tục bước 2</Button>
          </div>
        </>)
      }
    </>
  )
}

export default DichVuBaoDuongChung