import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './items/ThoiGian.scss'
import 'antd/dist/antd.min.css';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

import Button from 'react-bootstrap/Button'
const { RangePicker } = DatePicker;


function ThoiGian({ carItem, handleClick }) {
  const [dates, setDates] = useState("")
  const [times, setTimes] = useState("")

  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 3500,
    smartSpeed: 450,
    nav: false,
    responsive: false
  };

  return (
    <>
      <div className='form-thoigian'>
        <div className='container'>
          <div className='row'>
            <div className='form-thoigian-header pb-5'>
              <span>Đặt lịch hẹn lái thử loại xe: {carItem.type && carItem.type.name && <b>{carItem.type.name}</b>}</span>
            </div>
            <div className='col-7'>
              <div className='form-thoigian-img'>
                <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                  {
                    carItem.avatar?.map((img, index) => (
                      <div key={index} className='item p-0 m-auto' style={{ width: "240px" }}>
                        <div className='product-card-img'>
                          <img src={img.url} alt={img.url} loading="lazy" />
                        </div>
                      </div>
                    ))
                  }
                </OwlCarousel>
              </div>
              <div className='form-thoigian-note d-flex justify-content-center pb-3'><span className='form-thoigian-note-span d-flex justify-content-center'>Sẳn sàng đặt lịch</span></div>
              <div className='form-thoigian-name-car d-flex justify-content-center pb-3'><span className='form-thoigian-name-car-span d-flex justify-content-center'>{carItem.name}</span></div>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='form-thoigian-information d-flex justify-content-end pb-3 col-6 pr-0'>
                  {
                    carItem.energy === 0
                      ?
                      <>
                        <div className='d-flex '>
                          <i className="fa-solid fa-gas-pump text-success pr-1 d-flex align-items-center"></i>
                          <span className='text-success'>
                            Xăng
                          </span>
                        </div>
                      </>
                      :
                      <>
                        <div className='d-flex '>
                          <i className="fa-solid fa-charging-station text-warning pr-1 d-flex align-items-center"></i>
                          <span className='text-warning'>
                            Điện
                          </span>
                        </div>
                      </>
                  }
                </div>
                <div className='col-1'></div>
                <div className='form-thoigian-information d-flex justify-align-content-around pb-3 col-6 pl-0'>
                  {
                    carItem.tudong === 0
                      ?
                      <>
                        <div className='d-flex '>
                          <i className="fa-solid fa-gas-pump text pr-1 d-flex align-items-center"></i>
                          <span className='text-success'>
                            Số sàn
                          </span>
                        </div>
                      </>
                      :
                      <>
                        <div className='d-flex '>
                          <i className="fa-solid fa-sitemap text-black pr-1 d-flex align-items-center"></i>
                          <span className='text-warning'>
                            Tự động
                          </span>
                        </div>
                      </>
                  }
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='form-thoigian-right'>
                <div className='form-thoigian-right-header'>
                  <span className='font-weight-bold'>Đặt lịch {carItem.type.name}</span>
                  <div className='d-flex'>
                    {
                      carItem.energy === 0
                        ?
                        <p className='font-italic font-weight-bold text-muted m-0'>Xe chạy xăng</p>
                        :
                        <p className='font-italic font-font-font-weight-bolder text-muted m-0'>Xe chạy điện</p>
                    }
                    ,
                    {
                      carItem.tudong === 0
                        ?
                        <p className='font-italic font-weight-bold text-muted m-0 pl-1'> Số sàn</p>
                        :
                        <p className='font-italic font-font-font-weight-bolder text-muted m-0 pl-1'>Tự động</p>
                    }
                    ,
                    <p className='font-italic font-weight-bold text-muted m-0 pl-1'>{carItem.name}</p>
                  </div>
                </div>
                <div className='form-thoigian-right-body pt-3'>
                  <div className='form-thoigian-right-body-calendar'>
                    <DatePicker onChange={(value) => {
                      //const values = moment(value[0]).format('DD-MM-YYYY')
                      setDates(value.format('DD/MM/YYYY'))
                    }}
                      // dateFormat="DD-MM-YYYY" 
                      defaultDate={dates}
                    />
                  </div>
                  <div className='form-thoigian-right-body-time pt-3'>
                    <p className='m-0 pb-2'>Bạn muốn đặt lịch vào thời gian nào:</p>
                    <div className='form-thoigian-right-body-timepicker'>
                      <TimePicker onChange={(value) => {
                        setTimes(value.format('h:mm:ss'))
                      }}
                        defaultValue={times} />
                    </div>
                  </div>
                </div>
                <div className='form-thoigian-right-body-button pt-3'>
                  <div className='form-thoigian-right-body-button-datlich mt-5 mb-4 d-flex justify-content-center'>
                    <Button onClick={() => handleClick(dates, times, "next")}>Đặt một buổi lái thử</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThoiGian