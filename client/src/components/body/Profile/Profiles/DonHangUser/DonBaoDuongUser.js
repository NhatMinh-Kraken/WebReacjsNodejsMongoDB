import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormAllDonBaoDuong from './FormItemBaoDuong/FormAllDonBaoDuong';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import '../DonHangUser/DonBaoDuong.scss'
import garage from '../../../../../assets/images/garage.jpg'
import logo from '../../../../../assets/images/logo.png'
import FormBaoDuongChuaDuyet from './FormItemBaoDuong/FormBaoDuongChuaDuyet';
import FormAllDonBaoDuongHoanThanh from './FormItemBaoDuong/FormAllDonBaoDuongHoanThanh';

function DonBaoDuongUser() {
  const auth = useSelector(state => state.auth)

  const { user } = auth
  const [allBaoDuong, setAllBaoDuong] = useState([])
  const [allBaoDuongUser, setAllBaoDuongUser] = useState([])
  const [allBaoDuongChuaDuyet, setAllBaoDuongChuaDuyet] = useState([])
  const [allBaoDuongHoanThanh, setAllBaoDuongHoanThanh] = useState([])
  const [callback, setCallBack] = useState(false)
  const [show, setShow] = useState(false)
  const [showHT, setShowHT] = useState(false)

  const [datLichBaoDuongUser, setDatLichBaoDuongUser] = useState([])
  const [LichBaoDuongUser, setLichBaoDuongUser] = useState([])
  const [datLichBaoDuong, setDatLichBaoDuong] = useState([])

  const [optionBuoc1, setOptionBuoc1] = useState([])
  const [optionBuoc2, setOptionBuoc2] = useState([])
  const [tonggiaB1, setTongGiaB1] = useState("")
  const [tonggiaB2, setTongGiaB2] = useState("")

  const [clickDonBaoDuong, setClickDonBaoDuong] = useState("")
  const [donDatLichUser, setDonDatLichUser] = useState([])

  useEffect(() => {
    const get = async () => {
      const res = await Axios.get('/api/get-datlichbaoduong')
      setAllBaoDuong(res.data)
    }
    get()
  }, [callback])

  useEffect(() => {
    let arr = []

    for (let i = 0; i < allBaoDuong.length; i++) {
      if (allBaoDuong[i].IdUser._id === user._id) {
        arr.push(allBaoDuong[i])
      }
    }
    setAllBaoDuongUser(arr)

  }, [allBaoDuong, user])

  useEffect(() => {
    let arr = []

    for (let i = 0; i < allBaoDuongUser.length; i++) {
      if (allBaoDuongUser[i].Duyet !== 1) {
        arr.push(allBaoDuongUser[i])
      }
    }
    setAllBaoDuongChuaDuyet(arr)

  }, [allBaoDuongUser])

  useEffect(() => {
    let arr = []

    for (let i = 0; i < allBaoDuongUser.length; i++) {
      if (allBaoDuongUser[i].checked === 1) {
        arr.push(allBaoDuongUser[i])
      }
    }
    setAllBaoDuongHoanThanh(arr)

  }, [allBaoDuongUser])

  useEffect(() => {
    const get = async () => {
      const ret = await Axios.get('/api/get-datlichbaoduong')
      setLichBaoDuongUser(ret.data)
    }
    get()
  }, [callback])

  //console.log(LichBaoDuongUser)

  useEffect(() => {
    const get = async () => {
      const ret = await Axios.get('/api/quytrinhbaoduong')
      setDatLichBaoDuong(ret.data)
    }
    get()
  }, [callback])

  // console.log(datLichBaoDuong)
  // console.log(clickDonBaoDuong)

  useEffect(() => {
    datLichBaoDuong.map((c) => {
      if (c.IdDonDatLichBaoDuong._id === clickDonBaoDuong?._id) {
        setDatLichBaoDuongUser(c)
      }
    })
  }, [datLichBaoDuong, callback, clickDonBaoDuong])

  // console.log(datLichBaoDuongUser)


  useEffect(() => {
    LichBaoDuongUser.map((c) => {
      if (c._id === clickDonBaoDuong?._id) {
        setDonDatLichUser(c)
      }
    })
  }, [LichBaoDuongUser, callback, clickDonBaoDuong])

  const ClickDonHang = (giatri) => {
    setClickDonBaoDuong(giatri)
    setShow(true)
  }

  const ClickDonHangHT = (giatri) => {
    setClickDonBaoDuong(giatri)
    setShow(true)
  }

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

  const handleClose = () => {
    setClickDonBaoDuong([])
    setShow(false)
    setDatLichBaoDuongUser([])
    setDonDatLichUser([])
    setOptionBuoc1([])
    setOptionBuoc2([])
    setTongGiaB1([])
    setTongGiaB2([])
  }

  useEffect(() => {
    setOptionBuoc1(datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1)
  }, [datLichBaoDuongUser.Buoc1?.IdOptionBaoDuongB1])

  useEffect(() => {
    setOptionBuoc2(datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2)
  }, [datLichBaoDuongUser.Buoc2?.IdOptionBaoDuongB2])

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

  return (
    <>
      <Tabs
        defaultActiveKey="AllDonLaiThu"
        id="uncontrolled-tab-example"
        className="mb-3 button-tabs"
      >
        <Tab eventKey="AllDonLaiThu" title="Tất cả đơn bảo dưỡng">
          <>
            <FormAllDonBaoDuong sum={sum} handleClose={handleClose} optionBuoc1={optionBuoc1} optionBuoc2={optionBuoc2} show={show} donDatLichUser={donDatLichUser} datLichBaoDuongUser={datLichBaoDuongUser} ClickDonHang={ClickDonHang} allBaoDuongUser={allBaoDuongUser} garage={garage} logo={logo} />
          </>
        </Tab>
        <Tab eventKey="DonChoDuyet" title="Đơn chưa duyệt">
          <><FormBaoDuongChuaDuyet allBaoDuongChuaDuyet={allBaoDuongChuaDuyet} garage={garage} logo={logo} /></>
        </Tab>
        <Tab eventKey="DonHoangThanh" title="Đơn hoàng thành">
          <><FormAllDonBaoDuongHoanThanh sum={sum} handleCloseHT={handleCloseHT} optionBuoc1={optionBuoc1} optionBuoc2={optionBuoc2} showHT={showHT} donDatLichUser={donDatLichUser} datLichBaoDuongUser={datLichBaoDuongUser} ClickDonHangHT={ClickDonHangHT} allBaoDuongHoanThanh={allBaoDuongHoanThanh} garage={garage} logo={logo} /></>
        </Tab>
      </Tabs>
    </>
  )
}

export default DonBaoDuongUser