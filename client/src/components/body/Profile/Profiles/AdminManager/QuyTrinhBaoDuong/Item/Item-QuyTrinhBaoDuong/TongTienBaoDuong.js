import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../../../../../../assets/images/logo.png'
import ReactToPrint from 'react-to-print';

function TongTienBaoDuong({ handleClick, datLichBaoDuongUser, setCallback, callback, LichBaoDuongUser, id }) {

  const token = useSelector(state => state.token)
  const [demHt1, setDemHt1] = useState(0)
  const [optionBuoc1, setOptionBuoc1] = useState([])
  const [demHt2, setDemHt2] = useState(0)
  const [optionBuoc2, setOptionBuoc2] = useState([])
  const [khachhang, setKhachHang] = useState([])
  const componentRef = useRef();
  const [tonggiaB1, setTongGiaB1] = useState("")
  const [tonggiaB2, setTongGiaB2] = useState("")

  useEffect(() => {
    setOptionBuoc1(datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1)
  }, [datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1])

  useEffect(() => {
    setOptionBuoc2(datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2)
  }, [datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2])

  useEffect(() => {
    let tamp = 0
    for (let i = 0; i < optionBuoc2?.length; i++) {
      if (optionBuoc2[i].HoanThanh === 1) {
        tamp++
      }
    }
    setDemHt2(tamp)
  }, [optionBuoc2, callback])

  useEffect(() => {
    let tamp = 0
    for (let i = 0; i < optionBuoc1?.length; i++) {
      if (optionBuoc1[i].HoanThanh === 1) {
        tamp++
      }
    }
    setDemHt1(tamp)
  }, [optionBuoc2, callback])

  const dem = demHt1 + demHt2

  const demOption = optionBuoc1?.length + optionBuoc2?.length

  useEffect(() => {
    LichBaoDuongUser.map(lt => {
      if (lt._id === datLichBaoDuongUser.IdDonDatLichBaoDuong?._id) {
        setKhachHang(lt)
      }
    })
  }, [LichBaoDuongUser, datLichBaoDuongUser.IdDonDatLichBaoDuong._id])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < optionBuoc1?.length; i++) {
      sum += Number(optionBuoc1[i].money);
    }
    setTongGiaB1(sum)
  }, [optionBuoc1])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < optionBuoc2?.length; i++) {
      sum += Number(optionBuoc2[i].money);
    }
    setTongGiaB2(sum)
  }, [optionBuoc2])

  const sum = tonggiaB1 + tonggiaB2

  const handleClickGuiKhachHang = async () => {
    try {
      const res = await Axios.put(`/api/gui-email-thongtin-khachhang-baoduong/${id}`, {
        khachhang, GuiMailKhachHang: 1
      }, {
        headers: { Authorization: token }
      })
      setCallback(!callback)
      toast.success(res.data.msg)
    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err)
    }
  }

  const handleClickGuiChoCoVan = async () => {
    try {
      const res = await Axios.put(`/api/gui-email-thongtin-covan-baoduong/${id}`, {
        khachhang, GuiMailCoVan: 1
      }, {
        headers: { Authorization: token }
      })
      setCallback(!callback)
      toast.success(res.data.msg)
    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err)
    }
  }

  return (
    <>
      <div className='form-dichvu-baoduong-tongtien' id="print-content" ref={componentRef}>
        <div className='form-dichvu-baoduong-tongtin-header d-flex col-12 pb-2'>
          <div className='d-flex flex-column col-6'>
            <span>Tổng giá tiền option hoàn thành</span>
            <p className='m-0'>Đã hoàn Thành : {dem} / {demOption}</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            {
              datLichBaoDuongUser.HoanThanhTatCa === 1 && (
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
        <div className='form-dichvu-baoduong-tongtien-mr'>
          {/* <div className='form-dichvu-baoduong-tongtien-bg'> */}
          <div className='form-tong-tien-baoduong-body p-4'>
            <div className='form-tongtin-baoduong-body-header-top d-flex justify-content-center align-items-center p-3'>
              <span>Hóa đơn</span>
              <img src={logo} alt="img" />
            </div>
            <div className='form-dichvu-baoduong-tongtien-bg p-3'>
              <div className='form-tongtin-baoduong-body-user'>
                <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                  <span><i className="fa-solid fa-user pr-2"></i>Thông tin cá nhân khách hàng</span>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Họ và tên: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.IdUser?.name}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Email: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.IdUser?.email}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Số điện thoại: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.IdUser?.numberphone}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Địa chỉ: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.IdUser?.address}</p>
                </div>

                <p className='boder m-0 mb-3 mt-3'></p>
              </div>

              <div className='form-tongtin-baoduong-body-user'>
                <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                  <span><i className="fa-solid fa-car pr-2"></i>Thông tin xe khách hàng</span>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Loại xe: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.IdLoaiXe?.name}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Biển số: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.BienSo}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Quãng đường đi: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.QuangDuongDi} km</p>
                </div>

                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 pt-3 col-12'>
                  <div className='col-6 p-0'>
                    <div className='col-12 p-0 d-flex text-success'>
                      <span className='font-weight-bold col-6 pr-1 '>Ngày đăng ký: </span>
                      <p className='m-0 col-6 p-0'>{khachhang.dates}</p>
                    </div>
                  </div>
                  <div className='col-6 p-0'>
                    <div className='col-12 p-0 d-flex text-success'>
                      <span className='font-weight-bold col-6 pr-1'>thời gian đăng ký: </span>
                      <p className='m-0 col-6 p-0'>{khachhang.times}</p>
                    </div>
                  </div>
                </div>

                <p className='boder m-0 mb-3 mt-3'></p>
              </div>

              <div className='form-tongtin-baoduong-body-user'>
                <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                  <span><i className="fa-solid fa-location-dot pr-2"></i>Thông tin đại lý</span>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Tên đại lý: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.Iddaily?.Name}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Email đại lý: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.Iddaily?.Email}</p>
                </div>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Địa chỉ đại lý: </span>
                  <p className='m-0 col-9 p-0'>{khachhang.Iddaily?.Address}</p>
                </div>

                <p className='boder m-0 mb-3 mt-3'></p>
              </div>
              <div className='form-tongtin-baoduong-body-header pb-1'>
                <span><i className="fa-solid fa-list pr-2"></i>Option bảo dưỡng Bước 1:</span>
              </div>
              <div className='form-tongtin-baoduong-body d-flex flex-column'>
                {
                  optionBuoc1?.map(lt => (
                    lt.HoanThanh === 1 && (
                      <>
                        <div className='option-baoduong d-flex pl-3 col-12'>
                          <span className='font-weight-bold col-5 pr-1'>{lt.name}:</span>
                          <p className='m-0 col-7 p-0 d-flex justify-content-end'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lt.money)}</p>
                        </div>
                      </>
                    )
                  ))
                }
                <p className='boder m-0 mb-3 mt-3'></p>
              </div>

              <div className='form-tongtin-baoduong-body-header'>
                <span><i className="fa-solid fa-list pr-2"></i>Option bảo dưỡng Bước 2:</span>
              </div>
              <div className='form-tongtin-baoduong-body d-flex flex-column'>
                {
                  optionBuoc2?.map(lt => (
                    lt.HoanThanh === 1 && (
                      <>
                        <div className='option-baoduong d-flex pl-3 col-12'>
                          <span className='font-weight-bold col-5 pr-1'>{lt.name}:</span>
                          <p className='m-0 col-7 p-0 d-flex justify-content-end'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lt.money)}</p>
                        </div>
                      </>
                    )
                  ))
                }

                <p className='boder m-0 mb-3 mt-3'></p>
              </div>

              <div className='form-tongtin-baoduong-body-user'>
                <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                  <span className='font-weight-bold col-3 pr-1'>Tổng giá tiền: </span>
                  <p className='m-0 col-9 p-0 d-flex justify-content-end'>
                    {
                      Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum)
                    }
                  </p>
                </div>
                <p className='border-p m-0 mb-3 mt-3'></p>
              </div>

              <div className='d-flex col-12 justify-content-center'>
                <div className={` d-flex justify-content-center ${khachhang.IdCoVan ? "col-4" : "col-6"}`}>
                  <Button onClick={handleClick} className='bg-primary' style={{ width: "150px" }}>Quay về bước 2</Button>
                </div>
                <div className={` d-flex justify-content-center ${khachhang.IdCoVan ? "col-4" : "col-6"}`}>
                  {
                    datLichBaoDuongUser.GuiMailKhachHang === 1
                      ?
                      <>
                        <Button onClick={handleClickGuiKhachHang} disabled className='bg-success' style={{ width: "180px" }}>Đã gửi gmail cho khách hàng</Button>
                      </>
                      :
                      <>
                        <Button onClick={handleClickGuiKhachHang} className='bg-success' style={{ width: "180px" }}>Gửi khách hàng</Button>
                      </>
                  }
                </div>
                {
                  khachhang.IdCoVan &&
                  (
                    <>
                      <div className='col-4 d-flex justify-content-center'>
                        {
                          datLichBaoDuongUser.GuiMailCoVan === 1
                            ?
                            <>
                              <Button onClick={handleClickGuiChoCoVan} disabled className='bg-success' style={{ width: "150px" }}>Đã gửi gmail cho cố vấn</Button>
                            </>
                            :
                            <>
                              <Button onClick={handleClickGuiChoCoVan} className='bg-success' style={{ width: "150px" }}>Gửi cố vấn</Button>
                            </>
                        }
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current}
        />
      </div>  
    </>
  )
}

export default TongTienBaoDuong