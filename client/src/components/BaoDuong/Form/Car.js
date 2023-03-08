import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import img from '../../../assets/images/vehicle.png'

import { BaoDuongStepperContext } from '../FormThongTinBaoDuong/FormThongTinBaoDuong'
import Button from 'react-bootstrap/Button';

function Car({ handleClick }) {
  const state = useContext(BaoDuongStepperContext)

  const [show, setShow] = useState(false)
  const [showTT, setShowTT] = useState(false)
  const [showEnergy, setShowEnergy] = useState(false)
  const [showLoaiXe, setShowLoaiXe] = useState(false)
  const [loaixe, setLoaiXe] = useState([])
  const [loaiXeNhap, setLoaiXeNhap] = state.loaiXeNhapContent.LoaiXeNhapData
  const [energy, setEnergy] = state.energyContent.EnergyData
  const [thongtinNhap, setThongTinNhap] = state.thongTinNhapContent.ThongTinNhapData
  const [callback, setCallback] = useState(false)

  const MoForm = () => {
    setShow(true)
    setShowLoaiXe(true)
  }

  const MoFormEnergy = (giatri) => {
    setShowEnergy(true)
    setShowLoaiXe(false)
    setLoaiXeNhap(giatri)
  }

  const QuayVeLoaiXe = () => {
    setShowLoaiXe(true)
    setShowEnergy(false)
  }

  const QuayVeEnergy = () => {
    setShowEnergy(true)
    setShowTT(false)
  }

  const MoFormThongTin = (giatri) => {
    setShowTT(true)
    setShowEnergy(false)
    setEnergy(giatri)
  }

  const handleChangeInput = e => {
    const { name, value } = e.target
    setThongTinNhap({ ...thongtinNhap, [name]: value })
  }

  useEffect(() => {
    const get = async () => {
      const res = await Axios.get('/api/categorys')
      setLoaiXe(res.data)
    }
    get()
  }, [callback])

  return (
    <>
      <div className='form-car-baoduong pt-5 pl-5 pb-3 pr-5'>
        <div className='form-car-baoduong-header'>
          <span className='font-weight-bold'>Thông số xe của tôi</span>
          <p className='m-0'>Đối với chào giá dịch vụ ràng buộc, chúng tôi cần bạn cung cấp một số thông tin về xe của bạn.</p>
        </div>
        <div className='form-car-baoduong-body d-flex'>
          <div className='col-6 d-flex align-items-center'>
            <div className='form-car-baoduong-body-thongtin p-4'>
              <div className='form-baoduong-thongtin-car-header pb-3 text-center'>
                <span>Chọn loại phương tiện của bạn cho đặt chỗ này:</span>
              </div>
              <div className='form-baoduong-thongtin-car-body'>
                <div className='form-baoduong-thongtin-car-body-border d-flex col-12'>
                  {
                    show === false && (<button className='form-baoduong-thongtin-car-body-button border-0 p-3 d-flex justify-content-center' onClick={MoForm}><span>Chọn một mô hình</span></button>)
                  }
                  {
                    showLoaiXe === true && (
                      <>
                        <div className='row'>
                          {
                            loaixe.map(lx => (
                              <>
                                <div className='d-flex pr-2 pb-3 col-4' key={lx._id}>
                                  <button className='form-baoduong-thongtin-car-body-button border-0 p-3' onClick={() => MoFormEnergy(lx)} style={{ width: "150" }}><span>{lx.name}</span></button>
                                </div>
                              </>
                            ))
                          }
                        </div>
                      </>
                    )
                  }
                  {
                    showEnergy === true && (
                      <>
                        <div className='FormThongTinCar-User col-12 p-0'>
                          <div className='FormThongTinCar-User-loaixe-back d-flex align-items-center col-12 p-3'>
                            <div className='col-2 p-0'>
                              <div className='FormThongTinCar-User-back' onClick={QuayVeLoaiXe}>
                                <i className="fa-solid fa-chevron-left"></i>
                              </div>
                            </div>
                            <div className='FormThongTinCar-User-loaixe p-2 col-10'>
                              <span className='font-weight-bold d-flex justify-content-end'>Mẫu loại xe đã chọn: {loaiXeNhap.name}</span>
                            </div>
                          </div>
                          <div className='FormThongTinCar-Energy pt-3'>
                            <div className='FormThongTinCar-Energy-header'>
                              <span>Lựa chọn loại hình năng lượng: </span>
                            </div>
                            <div className='d-flex pr-2 pb-3 pt-3'>
                              <button className='form-baoduong-thongtin-car-body-button border-0 p-3 mr-2' onClick={() => MoFormThongTin("1")} style={{ width: "150" }}><span><i className='fa-solid fa-gas-pump pr-1'></i>Năng lương xăng</span></button>
                              <button className='form-baoduong-thongtin-car-body-button border-0 p-3' onClick={() => MoFormThongTin("2")} style={{ width: "150" }}><span><i className='fa-solid fa-charging-station pr-1'></i>Năng lương điện</span></button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                  {
                    showTT === true && (
                      <>
                        <div className='FormThongTinCar-User col-12 p-0'>
                          <div className='FormThongTinCar-User-loaixe-back d-flex align-items-center col-12 p-3'>
                            <div className='col-2 p-0'>
                              <div className='FormThongTinCar-User-back' onClick={QuayVeEnergy}>
                                <i className="fa-solid fa-chevron-left"></i>
                              </div>
                            </div>
                            <div className='FormThongTinCar-User-loaixe d-flex flex-column col-10'>
                              <span className='font-weight-bold font-weight-bold d-flex justify-content-end'>Mẫu loại xe đã chọn: {loaiXeNhap.name}</span>
                              <p className='m-0  d-flex justify-content-end'>Năng lượng: {energy === "1" ? "Xăng" : "Điện"}</p>
                            </div>
                          </div>
                          <div className='FormThongTinCar-User-header'>
                            <div className='pt-2 d-flex flex-column'>
                              <label className='label-FormThongTinCar-User'>Biển số của tôi</label>
                              <input type="text" required className='input-FormThongTinCar-User p-2' name='BienSo' onChange={handleChangeInput} />
                            </div>

                            <div className='pt-2 d-flex flex-column'>
                              <label className='label-FormThongTinCar-User'>Quãng đường đi (số km)</label>
                              <input type="text" required className='input-FormThongTinCar-User p-2' name='QuangDuongDi' onChange={handleChangeInput} />
                            </div>

                            <div className='pt-4 d-flex justify-content-center'>
                              <Button onClick={() => handleClick("next")} disabled={thongtinNhap.length === 0 && ("disabled")} className='bg-primary' style={{ width: "130px" }}>Tiếp tục</Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='form-car-baoduong-body-img p-3'>
              <img src={img} alt="img" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Car