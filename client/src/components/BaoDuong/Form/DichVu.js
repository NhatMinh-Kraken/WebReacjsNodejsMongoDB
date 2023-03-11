import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import carSetting from '../../../assets/images/carSetting.png'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BaoDuongStepperContext } from '../FormThongTinBaoDuong/FormThongTinBaoDuong'
import Form from 'react-bootstrap/Form';

function DichVu({ handleClick, handleClickBack, currentStep }) {

  const [dichvu, setDichVu] = useState([])
  const [callback, setCallback] = useState(false)
  const [optiondichvu, setOptionDichVu] = useState([])
  const [optionNoLoaiDichVu, setOptionNoLoaiDichVu] = useState([])
  const [show, setShow] = useState(false)
  const [option, setOption] = useState([])
  const [isCheckAll, setIsCheckAll] = useState(false)

  const [clickCheck, setClickCheck] = useState([])
  const state = useContext(BaoDuongStepperContext)

  const [check, setCheck] = state.optionBaoDuongContent.OptionBaoDuongData

  useEffect(() => {
    const get = async () => {
      const ret = await Axios.get('/api/getProductToType')
      setOptionDichVu(ret.data)
    }
    get()
  }, [callback])

  useEffect(() => {
    const get = async () => {
      const ret = await Axios.get('/api/get-optionbaoduong')
      setOptionNoLoaiDichVu(ret.data)
    }
    get()
  }, [callback])


  const handleShow = (giatri) => {
    setShow(true)
    setOption(giatri)
  }

  const handleClose = () => {
    setShow(false)
    setOption("")
  }


  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setCheck(optionNoLoaiDichVu.map(li => li._id));
    if (isCheckAll) {
      setCheck([]);
    }
  };

  const handleCheck = (e, giatri) => {
    console.log("giatri: ", giatri)
    if (e.target.checked) {
      setCheck([
        ...check, giatri._id
      ])
    }
    else {
      setCheck(
        check.filter((c) => c !== giatri._id)
      )
    }
  }

  console.log("check:", check)


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
        {/* <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleCheck(e, option)}>Lựa chọn</Button>
        </Modal.Footer> */}
      </Modal>

      <div className='Form-BaoDuong-DichVu pt-3'>
        <div className='container'>
          <div className='Form-BaoDuong-DichVu-header'>
            <div className='d-flex'>
              <span className='Form-BaoDuong-DichVu-header-span'>Dịch vụ</span>
              <p className='m-0 d-flex align-items-center pl-2'>Không bắt buộc</p>
            </div>
            <span>Chọn một hoặc nhiều dịch vụ.</span>
          </div>
          <div className='Form-BaoDuong-DichVu-body d-flex flex-column pt-3'>
            <div className='d-flex check-box-items-baoduong'>
              <Form.Check className="pt-3 pb-3 font-weight-bold check-box-items"
                type="checkbox"
                name="check"
                label="Chọn tất cả"
                onChange={handleSelectAll}
                checked={isCheckAll}
              />
            </div>
            {
              optiondichvu.map(gt => (
                <>
                  <div className='Form-BaoDuong-DichVu-body-header d-flex align-items-center' key={gt._id}>
                    <img src={carSetting} loading='lazy' /><span className='pl-2'>{gt._id.name}</span>
                  </div>
                  <div className='Form-BaoDuong-DichVu-body-items d-flex col-12'>
                    {
                      gt.records.map((g, index) => (
                        <>
                          <div className='Form-BaoDuong-DichVu-items col-4 mr-3' key={g._id}>
                            <div className='d-flex flex-column'>
                              <div className='Form-BaoDuong-DichVu-items-check d-flex align-items-center col-12'>
                                <div className='Form-BaoDuong-DichVu-items-name col-10 p-0'>{g.name}</div>
                                <div className='Form-items-check col-2 d-flex p-0 justify-content-end'>
                                  <input className='check-box-items' type="checkbox" name='check' checked={check.includes(g._id)} onChange={(e) => handleCheck(e, g)} />
                                </div>
                              </div>
                              <div className='Form-BaoDuong-DichVu-items-thongtin' onClick={() => handleShow(g)}>
                                <i className="fa-solid fa-chevron-right"></i>
                                <span className='pl-1'>Chi tiết</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    }
                  </div>
                </>
              ))
            }
          </div>
          <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-end'>
            <Button onClick={() => handleClick("next")} className='bg-primary' >{check.length !== 0 ? "Tiếp tục" : "Tiếp tục và không chọn dịch vụ"}</Button>
          </div>
        </div>
      </div>
      <div className='container pt-5 pb-2'>
        <div className='d-flex col-12'>
          <div className='col-6 d-flex justify-align-content-around'>
            <button onClick={() => handleClickBack(setCheck)} className={`button-back px-4 py-2 ${currentStep === 1 ? "opacity-50" : ""}`}><i className="fa-solid fa-arrow-left pr-2"></i> Back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DichVu