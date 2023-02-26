import React, { useContext, useEffect, useState } from 'react'
import LaiThuSteper from './LaiThuSteper/LaiThuSteper'
import LaiThuSteperController from './LaiThuSteperController/LaiThuSteperController'
import { StepperContext } from './FormThongTin/FormThongTin'
import './LaiThu.scss'
import DaiLyXe from './Form/DaiLyXe'
import ThoiGian from './Form/ThoiGian'
import ThongTinCaNhan from './Form/ThongTinCaNhan'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import End from './Form/End'

function FormLaiThu() {
    const [currentStep, setCurrentStep] = useState(1)
    const state = useContext(StepperContext)
    const [dailyData, setDaiLyData] = state.dailyContent.dailyData

    const auth = useSelector(state => state.auth)
    const { user } = auth

    const [car, setCar] = useState([])
    const [carItem, setCarItem] = useState([])
    const { id } = useParams()
    const [callback, setCallback] = useState(false)

    const [dates, setDates] = useState("")
    const [times, setTimes] = useState("")
    const [userData, setUserData] = useState("")

    //car
    useEffect(() => {
        const getProducts = async () => {
            const res = await Axios.get('/api/nametype')
            setCar(res.data)
        }
        getProducts()
    }, [callback])

    useEffect(() => {
        if (id) {
            car.forEach((c) => {
                if (c._id === id) {
                    setCarItem(c)
                }
            })
        }
    }, [car, id])

    const steps = [
        "Đại lý",
        "Thời gian",
        "Thông tin cá nhân",
    ]

    const displaySteps = (steps) => {
        switch (steps) {
            case 1: {
                return <DaiLyXe handleClick={handleClickDaiLy} />
            }

            case 2: {
                return <ThoiGian carItem={carItem} handleClick={handleClickTimesDates} />
            }

            case 3: {
                return <ThongTinCaNhan carItem={carItem} user={user} dailyData={dailyData} dates={dates} times={times} handleClick={handleClickUser} />
            }

            case 4: {
                return <End />
            }
            default:
        }
    }

    const handleClickDaiLy = (giatri, direction) => {
        let newStep = currentStep;

        setDaiLyData(giatri)

        direction === "next" ? newStep++ : newStep--

        //check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    const handleClickTimesDates = (d, t, direction) => {
        let newStep = currentStep;

        setDates(d)
        setTimes(t)

        direction === "next" ? newStep++ : newStep--

        //check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    const handleClickUser = (user, direction) => {
        let newStep = currentStep;
        setUserData(user)
        direction === "next" ? newStep++ : newStep--

        //check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--

        //check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
    }

    return (
        <>
            {/* <UseContextProvider> */}
            <div className='formLaiThu container col-12 d-flex'>
                <div className='Steper vertical mt-5 col-4 d-flex flex-column justify-content-center'>
                    <LaiThuSteper
                        dailyData={dailyData}
                        steps={steps}
                        currentStep={currentStep}
                        carItem={carItem}
                        dates={dates}
                        times={times}
                    />
                </div>
                <div className='col-8 mt-5'>
                    <div className='form-thongtin-steper'>
                        {displaySteps(currentStep)}
                    </div>
                </div>
            </div>
            <LaiThuSteperController handleClick={handleClick} currentStep={currentStep} steps={steps} />
            {/* </UseContextProvider> */}
        </>
    )
}

export default FormLaiThu