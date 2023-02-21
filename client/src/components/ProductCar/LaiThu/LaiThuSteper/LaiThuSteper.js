import Axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function LaiThuSteper({ dailyData, steps, currentStep }) {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const { user, isAdmin, isLogged } = auth
    const [newStep, setNewStep] = useState([])
    const stepRef = useRef()
    const [car, setCar] = useState([])
    const [carItem, setCarItem] = useState([])
    const { id } = useParams()
    const [callback, setCallback] = useState(false)
    const history = useHistory()

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps]
        let count = 0

        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: false
                }
                count++
            }

            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true
                }
                count++
            }

            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false
                }
                count++
            }
        }
        return newSteps
    }

    useEffect(() => {
        const stepsState = steps.map((step, index) =>
            Object.assign({}, {
                description: step,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false
            })
        );

        stepRef.current = stepsState
        const current = updateStep(currentStep - 1, stepRef.current)
        setNewStep(current)
    }, [steps, currentStep])


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

    const css = {
        background: "#0078d6",
        color: "white"
    }

    const handleAllCar = () => {
        history.push("/")
    }

    return (
        <>
            <div className='LaiThuSteper position-relative ' onClick={handleAllCar}>
                <div className='LaiThuSteper-form d-flex align-items-center'>
                    <div className='LaiThuSteper-form-number d-flex flex-column' style={css}>
                        <div className='LaiThuSteper-form-number-boder'>
                            <span className='text-white font-weight-bold'>&#10003;</span>
                        </div>
                    </div>
                    <div className='LaiThuSteper-form-des d-flex flex-column ml-3'>
                        <span className='font-weight-bold'>
                            Dòng xe
                        </span>
                        <p className='m-0'>{carItem.name}</p>
                    </div>
                </div>
                <div className='LaiThuSteper-form-line' style={{ border: "1px solid #0078d6" }}></div>
            </div>
            {
                newStep?.map((step, index) => (
                    <div className='LaiThuSteper position-relative' key={index + 2}>
                        <div className='LaiThuSteper-form d-flex align-items-center'>
                            <div className='LaiThuSteper-form-number d-flex flex-column' style={{ background: step.completed ? "#0078d6" : index + 2 }}>
                                <div className='LaiThuSteper-form-number-boder' style={{ border: step.selected ? "1px solid #0078d6" : "1px solid #000" }}>
                                    <span style={{ color: step.completed ? "#fff" : "#000" }}>{step.completed ? <><span className='text-white font-weight-bold'>&#10003;</span></> : index + 2}</span>
                                </div>
                            </div>
                            <div className='LaiThuSteper-form-des d-flex flex-column ml-3'>
                                <span className={step.highlighted ? 'font-weight-bold' : 'text-muted'}>
                                    {step.description}
                                </span>
                                {
                                    step.description === "Đại lý"
                                        ?
                                        <>
                                            {
                                                step.completed ?
                                                    <>
                                                        <p className='m-0'>
                                                            {
                                                                step.description === "Đại lý" ? <>{dailyData.Name}</> : null
                                                            }

                                                        </p>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </>
                                        :
                                        null
                                }

                                {
                                    step.description === "Thời gian"
                                        ?
                                        <>
                                            {
                                                step.completed ?
                                                    <>
                                                        <p className='m-0'>
                                                            {
                                                                step.description === "Thời gian" ? <>Thời gian</> : null
                                                            }

                                                        </p>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </>
                                        :
                                        null
                                }

                                {
                                    step.description === "Thông tin cá nhân"
                                        ?
                                        <>
                                            {
                                                step.completed ?
                                                    <>
                                                        <p className='m-0'>
                                                            {
                                                                step.description === "Thông tin cá nhân" ? <>Thông tin cá nhân</> : null
                                                            }

                                                        </p>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        {
                            index !== newStep.length - 1
                                ?
                                <>
                                    <div className='LaiThuSteper-form-line' style={{ border: step.completed ? "1px solid #0078d6" : "1px solid #9f9f9f" }}></div>
                                </>
                                :
                                null
                        }
                    </div>
                ))
            }

        </>
    )
}

export default LaiThuSteper