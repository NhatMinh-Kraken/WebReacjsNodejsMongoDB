import React, { useContext, useState } from 'react'
import '../BaoDuong/item/FormBaoDuong.scss'
import BaoDuongSteps from './BaoDuongSteps/BaoDuongSteps'

import Car from '../BaoDuong/Form/Car'
import DaiLyCar from '../BaoDuong/Form/DaiLyCar'
import DichVu from '../BaoDuong/Form/DichVu'
import NguyenVong from '../BaoDuong/Form/NguyenVong'
import TongQuan from '../BaoDuong/Form/TongQuan'
import BaoDuongStepsController from './BaoDuongStepsController/BaoDuongStepsController'
import { BaoDuongStepperContext } from './FormThongTinBaoDuong/FormThongTinBaoDuong'

function FormBaoDuong() {
    const [currentStep, setCurrentStep] = useState(1)
    const steps = [
        "Xe",
        "Đại lý",
        "Dịch vụ",
        "Nguyện Vọng",
        "Tổng Quan"
    ]

    const state = useContext(BaoDuongStepperContext)

    const [loaiXeNhap, setLoaiXeNhap] = state.loaiXeNhapContent.LoaiXeNhapData
    const [energy, setEnergy] = state.energyContent.EnergyData
    const [thongtinNhap, setThongTinNhap] = state.thongTinNhapContent.ThongTinNhapData

    const [clickDaiLy, setClickDaiLy] = state.daiLyCarContent.ClickDaiLyData

    const [check, setCheck] = state.optionBaoDuongContent.OptionBaoDuongData

    const [dates, setDates] = state.timesAndDatesContent.DateData;
    const [checkCV, setCheckCV] = state.convanContent.CoVanData
    const [times, setTimes] = state.timesAndDatesContent.TimesData

    const displaySteps = (steps) => {
        switch (steps) {
            case 1: {
                return <Car handleClick={handleClick} />
            }

            case 2: {
                return <DaiLyCar handleClick={handleClick} handleClickBack={handleClickBackFormDaiLy} currentStep={currentStep} />
            }

            case 3: {
                return <DichVu handleClick={handleClick} handleClickBack={handleClickBackDichVu} currentStep={currentStep} />
            }

            case 4: {
                return <NguyenVong handleClick={handleClick} handleClickBack={handleClickBackNguyenVong} currentStep={currentStep} />
            }

            case 5: {
                return <TongQuan handleClickBack={handleClickBackTongQuan} currentStep={currentStep} />
            }
            default:
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" && (newStep++)
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleClickBackFormDaiLy = (setClickDaiLy) => {
        let newStep = currentStep;
        newStep--
        setClickDaiLy([])
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleClickBackDichVu = (setCheck) => {
        let newStep = currentStep;
        newStep--
        setCheck([])
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleClickBackNguyenVong = (setDates, setTimes, setCheckCV) => {
        let newStep = currentStep;
        newStep--
        setDates([])
        setTimes([])
        setCheckCV([])
        setCheck([])
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const handleClickBackTongQuan = () => {
        let newStep = currentStep;
        newStep--
        setDates([])
        setCheckCV([])
        setTimes([])
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const two = 2

    return (
        <>
            <div className='formBaoDuong mx-auto container'>
                <div className='formBaoDuong-header pt-5'>
                    <h1>Đặt lịch bảo dưỡng</h1>
                </div>
                <div className='formBaoDuong-Step horizontal mt-5'>
                    <BaoDuongSteps
                        steps={steps}
                        currentStep={currentStep} />
                </div>
                <div className='form-thongtin-steper-baoduong pb-5'>
                    {displaySteps(currentStep)}
                </div>
            </div>
        </>
    )
}

export default FormBaoDuong