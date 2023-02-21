import React, { useContext, useState } from 'react'
import LaiThuSteper from './LaiThuSteper/LaiThuSteper'
import LaiThuSteperController from './LaiThuSteperController/LaiThuSteperController'
import { StepperContext } from './FormThongTin/FormThongTin'
import './LaiThu.scss'
import DaiLyXe from './Form/DaiLyXe'
import ThoiGian from './Form/ThoiGian'
import ThongTinCaNhan from './Form/ThongTinCaNhan'

function FormLaiThu() {
    const [currentStep, setCurrentStep] = useState(1)
    const state = useContext(StepperContext)
    const [dailyData, setDaiLyData] = state.dailyContent.dailyData

    const steps = [
        "Đại lý",
        "Thời gian",
        "Thông tin cá nhân"
    ]

    const displaySteps = (steps) => {
        switch (steps) {
            case 1: {
                return <DaiLyXe handleClick={handleClickDaiLy} />
            }

            case 2: {
                return <ThoiGian />
            }

            case 3: {
                return <ThongTinCaNhan />
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
                <div className='Steper vertical mt-5 col-3 d-flex flex-column justify-content-center'>
                    <LaiThuSteper
                        dailyData={dailyData}
                        steps={steps}
                        currentStep={currentStep}
                    />
                </div>
                <div className='col-9 mt-5'>
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