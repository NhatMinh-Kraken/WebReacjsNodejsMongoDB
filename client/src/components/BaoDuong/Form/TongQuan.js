import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import { BaoDuongStepperContext } from '../FormThongTinBaoDuong/FormThongTinBaoDuong';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function TongQuan({ handleClickBack, currentStep }) {
  const auth = useSelector(state => state.auth)
  const { isLogged, user } = auth
  const token = useSelector(state => state.token)
  const [validated, setValidated] = useState(false);
  const [thongtin, setThongTin] = useState([])

  const [checkEmail, setCheckEmail] = useState(false)
  const [num, setNum] = useState(0)

  //data
  const state = useContext(BaoDuongStepperContext)

  const [loaiXeNhap, setLoaiXeNhap] = state.loaiXeNhapContent.LoaiXeNhapData
  const [energy, setEnergy] = state.energyContent.EnergyData
  const [thongtinNhap, setThongTinNhap] = state.thongTinNhapContent.ThongTinNhapData

  const [clickDaiLy, setClickDaiLy] = state.daiLyCarContent.ClickDaiLyData

  const [check, setCheck] = state.optionBaoDuongContent.OptionBaoDuongData

  const [dates, setDates] = state.timesAndDatesContent.DateData;
  const [checkCV, setCheckCV] = state.convanContent.CoVanData
  const [times, setTimes] = state.timesAndDatesContent.TimesData
  const [datesNoFormat, setDatesNoFormat] = state.timesAndDatesContent.DateNoFData;
  const [callback, setCallback] = useState(false)

  const [optionNoLoaiDichVu, setOptionNoLoaiDichVu] = useState([])

  const history = useHistory()
  const [money, setMoney] = useState([])
  const [Tong, setTong] = useState("")

  useEffect(() => {
    const get = async () => {
      const ret = await Axios.get('/api/get-optionbaoduong')
      setOptionNoLoaiDichVu(ret.data)
    }
    get()
  }, [callback])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleCheck = () => {
    setCheckEmail(!checkEmail)
    setNum(num + 1)
  }

  const handleChangeInput = e => {
    const { name, value } = e.target
    setThongTin({ ...thongtin, [name]: value })
  }

  const diachivuthe = [user.nameWard, user.nameDis, user.nameCity].join(', ')

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await Axios.post('/api/update-datlichbaoduong', {
        IdLoaiXe: loaiXeNhap._id,
        IdUser: user._id,
        energy: energy,
        BienSo: thongtinNhap.BienSo,
        QuangDuongDi: thongtinNhap.QuangDuongDi,
        Iddaily: clickDaiLy._id,
        IdOptionBaoDuong: check,
        nhanxung: thongtin.nhanxung,
        name: thongtin.name ? thongtin.name : user.name,
        email: thongtin.email ? thongtin.email : user.email,
        numberphone: thongtin.numberphone ? thongtin.numberphone : user.numberphone,
        address: thongtin.address ? thongtin.address : user.address,
        mabuuchinh: thongtin.mabuuchinh,
        address_cuthe: thongtin.address_cuthe ? thongtin.address_cuthe : diachivuthe,
        checkEmail: checkEmail ? 1 : 0,
        IdCoVan: checkCV._id,
        dates: dates,
        times: times,

        datesNoF: moment(datesNoFormat).format('MM-DD-YYYY'),
        dayMonthYear: datesNoFormat,

        TenLoaiXe: loaiXeNhap.name,
        TenDaiLy: clickDaiLy.Name,
        DiaChiDaiLy: clickDaiLy.Address,
        TenKhachHang: user.name,
        EmailKhachHang: user.email,
        NameCoVan: checkCV.name,
        SDTCoVan: checkCV.numberphone,
        Tong: Tong,
        day: moment(datesNoFormat).format('DD'),
        month: moment(datesNoFormat).format('MM'),
        year: moment(datesNoFormat).format('YYYY')
      })

      history.push("/")
      toast.success("Đăng ký bảo dưỡng thành công! Chúng tôi sẽ gửi thông báo đến bạn trong thời gian sớm nhất.")
    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err)
    }
  }

  console.log(check)

  useEffect(() => {
    const arr = []

    check.map(c => {
      for (let i = 0; i < optionNoLoaiDichVu.length; i++) {
        if (c === optionNoLoaiDichVu[i]._id) {
          arr.push(optionNoLoaiDichVu[i].money)
        }
      }
    })

    setMoney(arr)
  }, [check, optionNoLoaiDichVu])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < money?.length; i++) {
      sum += Number(money[i]);
    }
    setTong(sum)
  }, [money])

  return (
    <>
      <div className='form-tong-quan'>
        <div className='container'>
          <div className='Form-TongQuan-header'>
            <div className='d-flex'>
              <span className='Form-TongQuan-header-span'>Tổng quan</span>
            </div>
            <span>Vui lòng kiểm tra thông tin của bạn và nhấp vào "Đặt lịch bảo dưỡng" ở cuối trang.</span>
          </div>
          <div className='Form-TongQuan-body d-flex flex-column pt-3'>
            <div className='col-12 d-flex p-0'>
              <div className='form-thongtin col-6'>
                <div className='form-thongtin-header pt-3'>
                  <span className='font-weight-bold'>Làm thế nào chúng tôi có thể liên lạc với bạn?</span>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                      <Form.Label>Nhân xưng</Form.Label>
                      <Form.Select aria-label="Default select example" name='nhanxung' className='select-controller-border' onChange={handleChangeInput}>
                        <option>Vui lòng chọn một</option>
                        <option value="1">Anh</option>
                        <option value="2">Chị</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        className='input-controller-border'
                        required
                        type="text"
                        name='name'
                        placeholder="Họ và tên"
                        defaultValue={user.name}
                        onChange={handleChangeInput}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a họ và tên.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        className='input-controller-border'
                        type="text"
                        name="email"
                        placeholder="email"
                        defaultValue={user.email}
                        onChange={handleChangeInput}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        className='input-controller-border'
                        type="text"
                        name="numberphone"
                        placeholder="phone"
                        defaultValue={user.numberphone}
                        onChange={handleChangeInput}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a phone.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <div className='thongtin-diachi pb-2'>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="dieu-khoan">
                          <span className='font-weight-bold'>Địa chỉ của bạn là gì ? <p className='m-0'>Không bắt buộc !</p></span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Form>
                            <Row className="mb-3">
                              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                  className='input-controller-border'
                                  required
                                  type="text"
                                  name='address'
                                  placeholder="địa chỉ"
                                  defaultValue={user.address}
                                  onChange={handleChangeInput}
                                />
                              </Form.Group>

                              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                                <Form.Label>mã bưu chính</Form.Label>
                                <Form.Control
                                  className='input-controller-border'
                                  required
                                  type="text"
                                  name='mabuuchinh'
                                  placeholder="Mã bưu chính"
                                  onChange={handleChangeInput}
                                />
                              </Form.Group>

                              <Form.Group as={Col} md="12" className='pt-3' controlId="validationCustom01">
                                <Form.Label>Địa chỉ cụ thể</Form.Label>
                                <Form.Control
                                  className='input-controller-border'
                                  required
                                  type="text"
                                  name='address_cuthe'
                                  placeholder="Địa chỉ cụ thể"
                                  defaultValue={diachivuthe}
                                  onChange={handleChangeInput}
                                />
                              </Form.Group>
                            </Row>
                          </Form>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>

                  <div className='dieu-khoan-top col-12 p-0 pb-5'>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="dieu-khoan">
                          <span className='font-weight-bold'>Tôi đồng ý nhận thông tin qua:</span>
                        </Accordion.Header>
                        <Accordion.Body className='dieu-khoan-body'>
                          <Form.Check className="pt-3 pb-3 font-weight-bold"
                            type="checkbox"
                            name="checkEmail"
                            label="Gửi thông báo qua Email"
                            onChange={handleCheck}
                            checked={checkEmail}
                          />
                          <span className='font-italic font-weight-light text-dieukhoan'>Tôi theo đây xác nhận đồng ý rằng Công ty TNHH Mercedes-Benz Việt Nam (“NNM”), Tập đoàn Mercedes-Benz Group NNM, các đại lý được ủy quyền của NNM và/hoặc các công ty khác được chỉ định bởi NNM và/hoặc Mercedes-Benz Group NNM có quyền thu thập, lưu giữ, sử dụng, phân tích, chuyển giao và cập nhật dữ liệu cá nhân đã được tôi cung cấp qua hình thức đã chọn, cho các mục đích chăm sóc khách hàng, gởi thông tin khuyến mãi, tiến hành các hoạt động tiếp thị liên quan đến các sản phẩm và dịch vụ được cung cấp bởi NNM, Mercedes-Benz Group NNM, các đại lý ủy quyền của NNM, và/hoặc các công ty khác được chỉ định bởi NNM và/hoặc Mercedes-Benz Group NNM.</span>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Form>
              </div>
              <div className='col-6'>
                <div className='form-thongtin-right'>
                  <div className='form-thongtin-right-header pt-3'>
                    <span className='font-weight-bold'>Chi tiết đặt lịch của bạn</span>
                  </div>
                  <div className='form-thongtin-right-body pt-3'>
                    <div className='form-thongtin-body-right-date-time d-flex flex-column'>
                      <span>Chúng tôi sẽ gặp bạn </span>
                      <span className='dates-times'>ngày {dates} vào lúc {times}</span>
                    </div>
                    <div className='form-thongtin-body-right-thongtinxe pt-3 d-flex flex-column'>
                      <span>Chi tiết xe của bạn </span>
                      <span className='items-nhap'>Mercedes-benz </span>
                      <span className='items-nhap'>Loại xe: <span>{loaiXeNhap.name}</span></span>
                      <span className='items-nhap'>Loại năng lương: <span>{energy === 2 ? <><span className='text-warning'>Điện</span></> : <><span className='text-success'>Xăng</span></>}</span></span>
                      <span className='items-nhap'>Biển số: <span>{thongtinNhap.BienSo}</span></span>
                      <span className='items-nhap'>Số kilomet: <span>{thongtinNhap.QuangDuongDi} km</span></span>
                    </div>
                    <div className='form-thongtin-body-right-thongtinxe pt-3 d-flex flex-column'>
                      <span>Đại lý mà bạn mún đến </span>
                      <span className='items-nhap'>Tên đại lý: <span>{clickDaiLy.Name}</span></span>
                      <span className='items-nhap'>Địa chỉ: <span>{clickDaiLy.Address}</span></span>
                    </div>
                    <div className='form-thongtin-body-right-thongtinxe scroll-ldv pt-3 d-flex flex-column'>
                      <span>Loại hình dịch vụ bảo dưỡng </span>
                      {
                        check.length !== 0 ?
                          <>
                            <span className='items-nhap'>Mục tiêu bảo dưỡng:</span>
                            {
                              check.map(c => (
                                <>
                                  {
                                    optionNoLoaiDichVu.map(d => (
                                      <>
                                        <div className='d-flex col-12'>
                                          <span className='pl-1 col-6'>{d._id === c && (<>{d.name}</>)}</span>
                                          <span className='col-6 d-flex justify-content-end'>{d._id === c && (<>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.money)}</>)}</span>
                                        </div>
                                      </>
                                    ))
                                  }
                                </>
                              ))
                            }
                          </>
                          :
                          <>
                            <span className='items-nhap'>Loại hình bảo dưỡng: <span>Bảo dưỡng tất cả</span></span>
                          </>
                      }
                    </div>
                    <div className='form-thongtin-body-right-thongtinxe pt-3 d-flex flex-column'>
                      <span>Cố vấn bạn muốn </span>
                      {
                        checkCV.length !== 0 ?
                          <>
                            <span className='items-nhap'>Tên cố vấn: <span>{checkCV.name}</span></span>
                            <span className='items-nhap'>số điện thoại: <span>{checkCV.numberphone}</span></span>
                          </>
                          :
                          <>
                            <p className='m-0'>Chưa có cố vấn được chọn</p>
                          </>
                      }
                    </div>
                  </div>
                  <div className='form-thong-tin-baogia pt-3'>
                    <div className='form-thong-tin-baogia-header d-flex col-12 p-0'>
                      <div className='form-thong-tin-baogia-header-left col-6 p-0'>
                        <span className='items-nhap'>Báo giá ước tính</span>
                        <p>Chi phí bổ sung có thể được áp dụng.</p>
                        <p>Thanh toán sẽ chỉ được thực hiện sau khi bạn chấp thuận với Đối tác Mercedes-Benz của bạn.</p>
                      </div>
                      <div className='form-thong-tin-baogia-header-right d-flex justify-content-end col-6 p-0'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Tong)}</div>
                    </div>
                    <div className='pt-3'>
                      <span className='luu-y'>Để có thể thực hiện sửa chữa hoặc dịch vụ theo thông số kỹ thuật của nhà sản xuất, khi tiếp nhận xe trong phạm vi đã đặt trước, xưởng sẽ tiến hành kiểm tra xem có cần thiết phải làm thêm gì hay không. Điều này có thể dẫn đến chi phí bổ sung. Tất cả giá đã bao gồm thuế giá trị gia tăng theo luật định.</span>
                    </div>
                  </div>
                </div>
                <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-end'>
                  <Button disabled={thongtin.length === 0 && ("disabled")} onClick={handleClick} className='bg-primary' >Đặt lịch bảo dưỡng</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container pt-5 pb-2'>
        <div className='d-flex col-12'>
          <div className='col-6 d-flex justify-align-content-around'>
            <button onClick={() => handleClickBack(setDates, setTimes)} className={`button-back px-4 py-2 ${currentStep === 1 ? "opacity-50" : ""}`}><i className="fa-solid fa-arrow-left pr-2"></i> Back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TongQuan