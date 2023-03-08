import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick'
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { BaoDuongStepperContext } from '../FormThongTinBaoDuong/FormThongTinBaoDuong';

function NguyenVong({ handleClick, handleClickBack, currentStep }) {
  const [allUserCV, setAllUserCV] = useState([])
  const state = useContext(BaoDuongStepperContext)
  const [callback, setCallback] = useState(false)
  const [dates, setDates] = state.timesAndDatesContent.DateData;
  const [checkCV, setCheckCV] = state.convanContent.CoVanData
  const [times, setTimes] = state.timesAndDatesContent.TimesData
  const [click, setClick] = useState(false)
  const [showCheck, setShowCheck] = useState("")

  useEffect(() => {
    const get = async () => {
      const res = await Axios.get('/user/findNVCV')
      setAllUserCV(res.data)
    }
    get()
  }, [callback])


  const hanldeCheck = (index, giatri) => {
    setShowCheck(index)
    setCheckCV(giatri)
  }

  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  const ThoiGian = [
    {
      value: "08:00", label: "08:00"
    },
    {
      value: "08:30", label: "08:30"
    },
    {
      value: "09:00", label: "09:00"
    },
    {
      value: "09:30", label: "09:30"
    },
    {
      value: "10:00", label: "10:00"
    },
    {
      value: "10:30", label: "10:30"
    },
    {
      value: "11:00", label: "11:00"
    },
    {
      value: "11:30", label: "11:30"
    },
    {
      value: "13:00", label: "13:00"
    },
    {
      value: "13:30", label: "13:30"
    },
    {
      value: "14:00", label: "14:00"
    },
    {
      value: "14:30", label: "14:30"
    },
    {
      value: "15:00", label: "15:00"
    },
    {
      value: "15:30", label: "15:30"
    },
    {
      value: "16:00", label: "16:00"
    },
    {
      value: "16:30", label: "16:30"
    },
  ]


  const hanldeCheckTime = (gt) => {
    setTimes(gt)
  }

  console.log(dates, times)

  return (
    <>
      <div className='form-nguyen-vong'>
        <div className='container'>
          <div className='Form-NguyenVong-header'>
            <div className='d-flex'>
              <span className='Form-NguyenVong-header-span'>Nguyện vọng</span>
              <p className='m-0 d-flex align-items-center pl-2'>Không bắt buộc</p>
            </div>
            <span>Nếu bạn muốn được phục vụ với cố vấn dịch vụ riêng, vui lòng chọn các tùy chọn bên dưới</span>
          </div>
          <div className='Form-NguyenVong-body d-flex flex-column pt-3'>
            <Slider {...setting}>
              {
                allUserCV.map((c, index) => (
                  <>
                    <div className='mr-3'>
                      <div className='Form-NguyenVong-co-van p-4 d-flex align-items-center col-12' key={c._id}>
                        <div className='Form-NguyenVong-co-van-img d-flex align-items-center justify-content-center col-2'>
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className='col-8'>
                          <span className='font-weight-bold mr-1'>Cố vấn</span>
                          <span className='font-italic'>{c.name}</span>
                        </div>
                        <div className='click-co-van col-2 d-flex justify-content-end'>
                          <input className='check-box-items-covan' type="checkbox" name='check' checked={checkCV._id === c._id && (true)} onChange={() => hanldeCheck(index, c)} />
                        </div>
                      </div>
                    </div>

                  </>
                ))
              }
            </Slider>
          </div>
          <div className='Form-NguyenVong-body-time pt-5'>
            <div className='Form-NguyenVong-time-header d-flex flex-column'>
              <span className='Form-NguyenVong-time-header-span'>Lịch hẹn</span>
              <span>Kiểm tra các cuộc hẹn có sẵn và chọn một cuộc hẹn phù hợp với lịch trình của bạn</span>
            </div>
            <div className='Form-NguyenVong-time-body'>
              {
                dates.length !== 0 && (
                  <>
                    <div className='Form-NguyenVong-time-body-check d-flex p-4 mb-3'>
                      {times.length !== 0 && (<><div className='Form-NguyenVong-time-body-check-true d-flex justify-content-center align-items-center mr-2'><i className="fa-solid fa-check"></i></div></>)} Lịch hẹn đã chọn: <span className='font-weight-bold ml-2'>{dates}</span> {times.length !== 0 && (<><span className='font-weight-bold ml-2'>vào lúc {times}</span></>)}
                    </div>
                  </>
                )
              }

              <div className='col-12 d-flex p-0'>
                <div className='Calendar-form pt-2 col-6 p-0 mr-1'>
                  <Calendar onChange={(c) => {
                    const values = moment(c).format('DD-MM-YYYY')
                    setDates(values)
                  }} />
                </div>
                <div className='col-6 p-0'>
                  {
                    dates.length !== 0 && (
                      <div className='Form-NguyenVong-body-check-time col-12 d-flex'>
                        <div className='row'>
                          {
                            ThoiGian.map(c => (
                              <>
                                <div className='Form-check-time col-3'>
                                  <div className='Form-check-time-border text-center p-3' style={{ backgroundColor: c.label === times && ("#0078d6") }} onClick={() => hanldeCheckTime(c.label)}><span>{c.label}</span></div>
                                </div>
                              </>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          {
            dates.length !== 0 && (
              <div className='form-thongtin-daily-body-controll pt-4 d-flex justify-content-end'>
                <Button disabled={times.length === 0 && ("disabled")} onClick={() => handleClick("next")} className='bg-primary' >Tiếp tục</Button>
              </div>
            )
          }
        </div>
      </div>
      <div className='container pt-5 pb-2'>
        <div className='d-flex col-12'>
          <div className='col-6 d-flex justify-align-content-around'>
            <button onClick={() => handleClickBack(setDates, setTimes, setCheckCV)} className={`button-back px-4 py-2 ${currentStep === 1 ? "opacity-50" : ""}`}><i className="fa-solid fa-arrow-left pr-2"></i> Back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NguyenVong