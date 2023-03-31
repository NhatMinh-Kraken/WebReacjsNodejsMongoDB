import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'react-chartjs-2';
// import 'chartjs-adapter-moment';

function Text() {

    const [thongKeChart, setThongKeChart] = useState([])
    const [callback, setCallBack] = useState(false)
    const canvasRef = useRef(null);
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/FilterToYear')
            setThongKeChart(res.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const arr = []
        for (let i = 0; i < thongKeChart.length; i++) {
            arr.push({
                year: thongKeChart[i]._id,
                value: thongKeChart[i].records?.length
            })
        }
        setDataChart(arr)
    }, [thongKeChart])

    useEffect(() => {
        const c = () => {
            const cData = {
                type: 'bar',
                data: {
                    labels: dataChart?.map(item => item.year),
                    datasets: [
                        {
                            label: 'Data',
                            data: dataChart?.map(item => item.value),
                            backgroundColor: 'rgba(75,192,192,1)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js/Auto Example',
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                            ticks: {
                                source: 'auto',
                                maxRotation: 0,
                                autoSkip: true,
                            },
                        },
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 10,
                            },
                        },
                    },
                },
            }
            setDataChart(cData)
        }
        c()
    }, [dataChart])

    // const datas = {
    //     labels: dataChart?.map((item) => item?.year),
    //     datasets: [
    //         {
    //             label: 'My First Dataset',
    //             data: dataChart?.map((item) => item?.value),
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // console.log(datas)

    // const options = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 ticks: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         ],
    //     },
    // };

    // useEffect(() => {
    //     if (canvasRef && canvasRef.current) {
    //         const myChartRef = canvasRef.current.getContext("2d")
    //         new Chart(myChartRef, {
    //             type: 'line',
    //             data: datas,
    //             options: options,
    //         });
    //     }
    // }, []);


    return (
        <>
            <Chart type={dataChart.type} data={dataChart.data} options={dataChart.options} />
        </>
    )
}

export default Text