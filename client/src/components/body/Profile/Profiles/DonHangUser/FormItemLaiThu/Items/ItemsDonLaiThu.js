import React from 'react'

function ItemsDonLaiThu({ lt, garage }) {
    console.log(lt)

    const formatMoney = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lt.Idcar.money)
    return (
        <>
            {
                lt.length === 0
                    ?
                    <>
                        <span className='d-flex justify-content-center align-items-center text-danger'>Không có đơn hàng</span>
                    </>
                    :
                    <>
                        <div className='form-laithu-view-user mb-3'>
                            <div className='pb-3'>
                                <div className='form-laithu-view-user-header p-2 col-12 d-flex'>
                                    <div className='col-8 d-flex p-0 '>
                                        {/* <div className='d-flex col-1 align-items-center'>{index + 1}</div> */}
                                        <div className='d-flex col-3 align-items-center'>
                                            <img src={garage} alt="img" />
                                            <span className='d-flex align-items-center pl-2'>{lt.Iddaily.Name}</span>
                                        </div>
                                        <div className='d-flex flex-column col-9 p-0 align-items-center justify-content-center'>
                                            <p className='m-0'>{lt.Iddaily.Address}</p>
                                        </div>

                                    </div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <div className='pl-2 pr-2 d-flex justify-content-center align-items-center'>
                                            {
                                                lt.duyet === 1 ? <><span className='text-success'>Đã duyệt</span></> : <><span className='text-danger'>Chưa duyệt</span></>
                                            }
                                        </div>
                                        <div className='pl-2 pr-2 d-flex justify-content-center align-items-center'>
                                            {
                                                lt.checked === 1 ? <><span className='text-success'>Đã hoàn thành</span></> : <><span className='text-danger'>Chưa hoàn thành</span></>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='form-laithu-view-user-body p-2 col-12 d-flex'>
                                    <div className='form-laithu-view-body d-flex col-12 p-0'>
                                        <div className='form-laithu-view-body-img col-3'>
                                            <img src={lt.Idcar.avatar[0].url} alt="img" />
                                        </div>
                                        <div className='d-flex flex-column pl-3 col-3'>
                                            <div className='form-laithu-view-body-name'>
                                                <span>Loại xe: {lt.type}</span>
                                            </div>
                                            <div className='form-laithu-view-body-name'>
                                                <span>Tên xe: {lt.Idcar.name}</span>
                                            </div>
                                            <div className='form-laithu-view-body-name'>
                                                <span className='text-secondary'>{lt.Idcar.tudong === 1 ? <>Mẫu xe tự động</> : <>Mẫu xe số sàn</>}</span>
                                            </div>
                                        </div>
                                        <div className='d-flex col-3 flex-column'>
                                            <div className='form-laithu-view-body-date-times'>
                                                <span className='text-success'>Ngày: {lt.dates}</span>
                                            </div>
                                            <div className='form-laithu-view-body-date-times'>
                                                <span className='text-primary'>Thời gian: {lt.times}</span>
                                            </div>
                                        </div>
                                        <div className='d-flex col-3 justify-content-end'>
                                            <div className='form-laithu-view-body-money'>
                                                <span className='text-warning'>Giá xe: {formatMoney}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default ItemsDonLaiThu