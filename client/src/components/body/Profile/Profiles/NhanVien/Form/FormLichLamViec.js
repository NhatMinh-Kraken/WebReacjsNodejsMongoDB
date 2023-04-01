import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal } from 'react-bootstrap';

function FormLichLamViec({ lichLamViecUser }) {
    const [dates, setDates] = useState([])
    const localizer = momentLocalizer(moment);
    const [titleDates, setTitleDates] = useState([])
    const [show, setShow] = useState(false)

    const events = lichLamViecUser.map(c => {
        return {
            _id: c._id,
            title: c.title,
            start: moment(c.start).toDate(),
            end: moment(c.end).toDate(),
            idCoVan: c.idCoVan,
            IdDonBaoDuong: c.IdDonBaoDuong
        }
    })

    const handleShow = (c) => {
        setTitleDates(c)
        setShow(true)
    }

    console.log(titleDates)

    const handleClose = () => {
        setTitleDates("")
        setShow(false)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>thông tin chi tiết lịch làm việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='lich-lam-viec-header text-center'>
                        <h4>{titleDates.title}</h4>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 d-flex'>
                                <div className='col-6'>
                                    Bắt đầu: {moment(titleDates.start).format("DD-MM-YYYY h:mm:ss")}
                                </div>
                                <div className='col-6'>
                                    Kết thúc: {moment(titleDates.end).format("DD-MM-YYYY h:mm:ss")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='TrangThai pt-3 text-center font-weight-bold'>
                        {
                            titleDates.IdDonBaoDuong?.checked === 0
                                ?
                                <>
                                    <span className="text-danger">Chưa hoàn thành</span>
                                </>
                                :
                                <>
                                    <span className="text-success">Chưa hoàn thành</span>
                                </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Calendar
                events={events}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100vh' }}
                onSelectEvent={handleShow}
            />
        </>
    )
}

export default FormLichLamViec