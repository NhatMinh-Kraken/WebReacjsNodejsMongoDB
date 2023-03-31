import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment'

import FormThongKeAllNV from './Form/FormThongKeAllNV';
import FormThongKeKhachHangItem from './Form/FormThongKeKhachHangItem';

import Chart from 'chart.js/auto';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
)

function FormThongKeKhachHang() {

    const [allNhanVienCV, setAllNhanVienCV] = useState([])
    const [allNhanVienCVLength, setAllNhanVienCVLength] = useState([])
    const [allDonBaoDuong, setAllDonBaoDuong] = useState([])
    const [callback, setCallBack] = useState(false)
    const [allKH, setAllKH] = useState([])
    const [allKHHT, setAllKHHT] = useState([])
    const [thongKeChart, setThongKeChart] = useState([])
    const [thongKeChartMonth, setThongKeChartMonth] = useState([])
    const [yearClick, setYearClick] = useState("")

    const [sum, setSum] = useState(0)

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/get-findKHDonBaoDuong')
            setAllKH(res.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/user/findNVCV')
            setAllNhanVienCV(res.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/get-datlichbaoduong-covan')
            setAllNhanVienCVLength(res.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/get-datlichbaoduong')
            setAllDonBaoDuong(res.data)
        }
        get()
    }, [callback])

    const Year = async () => {
        const res = await Axios.get('/api/FilterToYear')
        setThongKeChart(res.data)
    }

    useEffect(() => {
        const Month = async () => {
            setThongKeChart([])
            const res = await Axios.get('/api/FilterToMonth')
            setThongKeChartMonth(res.data)
        }
        Month()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/FilterToYear')
            setThongKeChart(res.data)
        }
        get()
    }, [callback])

    console.log(thongKeChart)

    const clickYear = (gt) => {
        setYearClick(gt)
    }

    console.log(thongKeChartMonth)

    useEffect(() => {
        const arr = []
        for (let i = 0; i < thongKeChartMonth.length; i++) {
            if (thongKeChartMonth[i]._id?.year === Number(yearClick)) {
                arr.push(thongKeChartMonth[i])
            }
        }
        setThongKeChart(arr)
    }, [thongKeChartMonth, yearClick])

    console.log(thongKeChart)

    const datas = {
        labels: thongKeChart?.map((item) => (
            item._id?.month ? item._id?.month : item?._id
        )
        ),
        datasets: [
            {
                label: 'Tháng/Năm',
                data: thongKeChart?.map((item) => item?.records.length),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    // const d = moment("2023-03-23T17:00:00.000+00:00").format("DD-MM-YYYY")
    // console.log(d)

    return (
        <>

            <Tabs
                defaultActiveKey="AllNhanVien"
                id="uncontrolled-tab-example"
                className="mb-3 button-tabs"
            >
                <Tab eventKey="AllNhanVien" title="Thống kê nhân viên">
                    <>
                        <FormThongKeAllNV allNhanVienCVLength={allNhanVienCVLength} allNhanVienCV={allNhanVienCV} />
                    </>
                </Tab>
                <Tab eventKey="KhachHang" title="Thống kê khách hàng">
                    <>
                        <FormThongKeKhachHangItem allKH={allKH} />
                    </>
                </Tab>
                <Tab eventKey="BieuDo" title="Biểu đồ">
                    <>
                        <div className="">
                            <div className='Controller-buton d-flex justify-content-end'>
                                <Button className='mr-2' style={{ width: "150px" }} variant='primary' onClick={Year}>Theo năm</Button>
                                <Form.Select aria-label="Default select example" style={{ width: "150px" }} onChange={(e) => clickYear(e.target.value)}>
                                    <option>Tháng theo năm</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </Form.Select>
                                {/* <Button variant='primary' style={{ width: "150px" }} >Theo tháng</Button> */}
                            </div>
                            <div className='form-body-thongke'>
                                <Line data={datas} options={options}></Line>
                            </div>
                        </div>
                    </>
                </Tab>
            </Tabs>
        </>
    )
}

export default FormThongKeKhachHang