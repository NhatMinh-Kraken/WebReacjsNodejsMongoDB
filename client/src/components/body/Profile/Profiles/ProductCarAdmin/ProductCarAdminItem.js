import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading2 from '../../../../utils/Loadding/Loadding2'

function ProductCarAdminItem({ nametypes, setCallback, callback, handleCheck }) {
    const [isHover, setIsHover] = useState(false)

    const [show, setShow] = useState(false)

    const [deleteId, setDeleteId] = useState("")

    const token = useSelector(state => state.token)

    const [loading, setLoading] = useState(false)

    //console.log(nametypes.avatar)

    const handleHover = () => {
        setIsHover(true)
    }

    const handleNotHover = () => {
        setIsHover(false)
    }

    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 3500,
        smartSpeed: 450,
        nav: false,
        responsive: false
    };

    const handleShow = (id) => {
        setShow(true)
        setDeleteId(id)
    }

    const handleClose = () => {
        setShow(false)
    }

    //console.log(deleteId)

    const handleDeleteImage = async () => {
        try {
            await Axios.post(`/api/detroy_all_image`, { DestroyAllAvatar: nametypes.avatar }, {
                headers: { Authorization: token }
            })
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.err(err.response.data.msg)
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)

            handleDeleteImage()

            const res = await Axios.delete(`/api/products/${deleteId}`, {
                headers: { Authorization: token }
            })
            setShow(false)
            setLoading(false)
            toast.success(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            toast.err(err.response.data.msg)
        }
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
                    <Modal.Title>Delete Product Car</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    Are you sure you want to delete the product? Vehicle data will be lost!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {loading ? <Loading2 /> :
                <div className='product-card col-4' onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                    <input type="checkbox" checked={nametypes.checked} onChange={() => handleCheck(nametypes._id)} className={`custom-control-inputs opacity-1`} id="customCheck1" />
                    <div className='product-card-link' >
                        <div className='product-car-header'>
                            <div className='product-card-name'>
                                <span>{nametypes.name}</span>
                            </div>
                            <div className='product-card-type'>
                                {
                                    nametypes
                                    && nametypes.type
                                    && nametypes.type.name
                                    && <span>{nametypes.type.name}</span>
                                }

                            </div>
                            <div className='product-card-money'>
                                <span>{nametypes.money}</span>
                            </div>
                        </div>
                        <div className='product-card-bodys'>
                            <OwlCarousel id="customer-testimonoals" className="product owl-carousel owl-theme" {...options}>
                                {
                                    nametypes.avatar.map((img, index) => (
                                        <div className='item p-0' style={{ width: "240px" }}>
                                            <div className='product-card-img'>
                                                <img key={index} src={img.url} alt={img.url} loading="lazy" />
                                            </div>
                                        </div>
                                    ))
                                }

                            </OwlCarousel>
                        </div>
                    </div>
                    <div className={`product-car-control ${isHover ? "visible" : "hidden"} ${isHover ? "opacity-1" : "opacity-0"}`}>
                        <div className='product-car-detail heights-48'>
                            <Link to={`/edit-product/${nametypes._id}`} className='detail-product'><i className="fa-solid fa-pen-to-square d-flex pr-3"></i>Edit</Link>
                        </div>
                        <div className='product-car-detail heights-48'>
                            <a onClick={() => handleShow(nametypes._id)} className='detail-product'><i className="fa-solid fa-trash d-flex pr-3"></i>Delete</a>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCarAdminItem