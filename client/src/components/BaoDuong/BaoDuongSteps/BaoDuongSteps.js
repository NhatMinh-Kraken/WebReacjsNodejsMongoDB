import React, { useEffect, useRef, useState } from 'react'



function BaoDuongSteps({ steps, currentStep }) {
    const [newStep, setNewStep] = useState([])
    const stepRef = useRef()

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps]
        let count = 0

        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: false
                }
                count++
            }

            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
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

    const css = {
        backgroundColor: "#0078d6",
        border: "1px solid #0078d6",
    }
    return (
        <>
            <div className='p-4 d-flex justify-content-between align-items-center' >
                {
                    newStep.map((step, index) => (
                        <div className='d-flex align-items-center position-relative' key={index + 1}>
                            <div className='BaoDuongSteps' style={step.completed ? css : null}>
                                <div className='BaoDuongSteps-border-number d-flex align-items-center justify-content-center' style={{ border: step.selected ? "1px solid #0078d6" : "1px solid #000" }}>
                                    {step.completed ? (
                                        <span>&#10003;</span>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                            </div>
                            <div className='BaoDuongSteps-des d-flex align-items-center mt-16 ml-1' style={{ color: step.completed && ("#0078d6") }}>
                                <span>{step.description}</span>
                            </div>
                            {
                                index !== newStep.length - 1 &&
                                (
                                    <div className='position-relative'>
                                        <div className='BaoDuongSteps-boder' style={step.completed ? css : null} ></div>
                                    </div>
                                )
                            }

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BaoDuongSteps