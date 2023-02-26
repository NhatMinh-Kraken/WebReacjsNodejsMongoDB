import React from 'react'

function LaiThuSteperController({ handleClick, currentStep, steps }) {
  return (
    <>
      <div className='container pt-5 pb-5'>
        <div className='d-flex col-12'>
          <div className='col-6 d-flex justify-align-content-around'>
            <button onClick={handleClick} className={`button-back px-4 py-2 ${currentStep === 1 ? "opacity-50" : ""}`}><i className="fa-solid fa-arrow-left pr-2"></i> Back</button>
          </div>
          {/* <div className='col-6 d-flex justify-content-center'>
            <button onClick={() => handleClick("next")} className='button-next px-4 py-2'>{currentStep === steps.length ? "Confirm" : "Next"}<i className={`${currentStep === steps.length ? "" : "fa-solid fa-arrow-right pl-2"}`}></i></button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default LaiThuSteperController