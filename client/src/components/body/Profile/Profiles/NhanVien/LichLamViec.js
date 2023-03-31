import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import FormAllDon from './Form/FormAllDon';
import FormLichLamViec from './Form/FormLichLamViec';
import garage from '../../../../../assets/images/garage.jpg'
import logo from '../../../../../assets/images/logo.png'
import FormDonHoanThanh from './Form/FormDonHoanThanh';

function LichLamViec() {
  const auth = useSelector(state => state.auth)
  const { user } = auth
  const [allLichLamViec, setAllLichLamViec] = useState([])
  const [callback, setCallBack] = useState(false)

  const [donBaoDuong, setDonBaoDuong] = useState([])
  const [donBaoDuongUser, setDonBaoDuongUser] = useState([])

  const [lichLamViecUser, setlichLamViecUser] = useState([])
  const [DonHoanThanh, setDonHoanThanh] = useState([])
  const [QuyTrinhBaoDuong, setQuyTrinhBaoDuong] = useState([])

  const [clickDonBaoDuong, setClickDonBaoDuong] = useState("")
  const [datLichBaoDuongUser, setDatLichBaoDuongUser] = useState([])
  const [optionBuoc1, setOptionBuoc1] = useState([])
  const [optionBuoc2, setOptionBuoc2] = useState([])
  const [tonggiaB1, setTongGiaB1] = useState("")
  const [tonggiaB2, setTongGiaB2] = useState("")
  const [donDatLichUser, setDonDatLichUser] = useState([])
  const [showHT, setShowHT] = useState(false)

  useEffect(() => {
    const get = async () => {
      const res = await Axios.get('/api/lichlamviec')
      setAllLichLamViec(res.data)
    }
    get()
  }, [callback])

  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('/api/get-datlichbaoduong')
      setDonBaoDuong(res.data)
    }
    getData()
  }, [callback])


  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('/api/quytrinhbaoduong')
      setQuyTrinhBaoDuong(res.data)
    }
    getData()
  }, [callback])


  useEffect(() => {
    const arr = []
    for (let i = 0; i < allLichLamViec.length; i++) {
      if (allLichLamViec[i].idCoVan?._id === user._id) {
        arr.push(allLichLamViec[i])
      }
    }

    setlichLamViecUser(arr)
  }, [allLichLamViec, user])


  useEffect(() => {
    const arrBD = []
    for (let i = 0; i < donBaoDuong.length; i++) {
      if (donBaoDuong[i].IdCoVan?._id === user._id) {
        arrBD.push(donBaoDuong[i])
      }
    }
    setDonBaoDuongUser(arrBD)
  }, [donBaoDuong, user])


  useEffect(() => {
    const arr = []
    for (let i = 0; i < donBaoDuongUser.length; i++) {
      if (donBaoDuongUser[i].checked === 1) {
        arr.push(donBaoDuongUser[i])
      }
    }
    setDonHoanThanh(arr)
  }, [donBaoDuongUser])

  // hoan thanh 


  const ClickDonHangHT = (giatri) => {
    setClickDonBaoDuong(giatri)
    setShowHT(true)
  }

  console.log(clickDonBaoDuong)

  const handleCloseHT = () => {
    setClickDonBaoDuong([])
    setShowHT(false)
    setDatLichBaoDuongUser([])
    setDonDatLichUser([])
    setOptionBuoc1([])
    setOptionBuoc2([])
    setTongGiaB1([])
    setTongGiaB2([])
  }

  useEffect(() => {
    QuyTrinhBaoDuong.map((c) => {
      if (c.IdDonDatLichBaoDuong._id === clickDonBaoDuong?._id) {
        setDatLichBaoDuongUser(c)
      }
    })
  }, [QuyTrinhBaoDuong, callback, clickDonBaoDuong])

  useEffect(() => {
    DonHoanThanh.map((c) => {
      if (c._id === clickDonBaoDuong?._id) {
        setDonDatLichUser(c)
      }
    })
  }, [DonHoanThanh, callback, clickDonBaoDuong])

  useEffect(() => {
    setOptionBuoc1(datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1)
  }, [datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1])

  useEffect(() => {
    setOptionBuoc2(datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2)
  }, [datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < optionBuoc1?.length; i++) {
      if (optionBuoc1[i].HoanThanh) {
        sum += Number(optionBuoc1[i].money);
      }
    }
    setTongGiaB1(sum)
  }, [optionBuoc1])

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < optionBuoc2?.length; i++) {
      if (optionBuoc2[i].HoanThanh) {
        sum += Number(optionBuoc2[i].money);
      }
    }
    setTongGiaB2(sum)
  }, [optionBuoc2])

  const sum = tonggiaB1 + tonggiaB2


  // console.log(lichLamViecUser)
  return (
    <>
      <div className='lich-lam-viec'>
        <Tabs
          defaultActiveKey="LichLamViec"
          id="uncontrolled-tab-example"
          className="mb-3 button-tabs"
        >
          <Tab eventKey="LichLamViec" title="Lịch làm việc">
            <>
              <FormLichLamViec lichLamViecUser={lichLamViecUser} />
            </>
          </Tab>
          <Tab eventKey="AllDon" title="Tất cả đơn bảo dưỡng">
            <>
              <FormAllDon donBaoDuongUser={donBaoDuongUser} garage={garage} sum={sum} handleCloseHT={handleCloseHT} optionBuoc1={optionBuoc1} optionBuoc2={optionBuoc2} showHT={showHT} donDatLichUser={donDatLichUser} datLichBaoDuongUser={datLichBaoDuongUser} ClickDonHangHT={ClickDonHangHT} DonHoanThanh={DonHoanThanh} QuyTrinhBaoDuong={QuyTrinhBaoDuong} logo={logo}/>
            </>
          </Tab>
          <Tab eventKey="DonHoanThanh" title="Đơn hoàn thành">
            <>
              <FormDonHoanThanh sum={sum} handleCloseHT={handleCloseHT} optionBuoc1={optionBuoc1} optionBuoc2={optionBuoc2} showHT={showHT} donDatLichUser={donDatLichUser} datLichBaoDuongUser={datLichBaoDuongUser} ClickDonHangHT={ClickDonHangHT} DonHoanThanh={DonHoanThanh} QuyTrinhBaoDuong={QuyTrinhBaoDuong} garage={garage} logo={logo} />
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default LichLamViec