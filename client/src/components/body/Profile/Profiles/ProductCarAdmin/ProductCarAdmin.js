import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Axios from 'axios';
import ProductCarAdminItem from './ProductCarAdminItem';
import { Button, Modal } from 'react-bootstrap';
import Loadding2 from '../../../../utils/Loadding/Loadding2';


function ProductCarAdmin() {
    const [nametype, setNametype] = useState([])
    const [callback, setCallback] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const token = useSelector(state => state.token)

    const showDele = () => {
        setShowDelete(true)
    }

    const handleCloseDele = () => {
        setShowDelete(false)
    }

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/nametype')
            setNametype(res.data)
        }
        getNameType()
    }, [callback])

    const handleCheck = (id) => {
        nametype.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setNametype([...nametype])
    }

    //console.log(nametype)

    const checkAll = () => {
        nametype.forEach(product => {
            product.checked = !isCheck
        })
        setNametype([...nametype])
        setIsCheck(!isCheck)
    }

    const deleteAllProduct = async (id, img) => {
        try {
            setLoading(true)
            const deleteAllImg = Axios.post(`/api/detroy_all_image`, { DestroyAllAvatar: img }, {
                headers: { Authorization: token }
            })
            const deleteProduct = Axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await deleteAllImg
            await deleteProduct

            setLoading(false)
            setCallback(!callback)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteAll = () => {
        //setLoading(true)
        nametype.forEach(product => {
            if (product.checked) {
                deleteAllProduct(product._id, product.avatar)
            }
        })
        setShowDelete(false)
        setLoading(false)
        setCallback(!callback)
    }

    return (
        <>
            <Modal
                show={showDelete}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category Car</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    Bạn có chắc là muốn xóa tất cả sản phẩm hay không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDele}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteAll}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {loading ? <Loadding2 /> :
                <div className='product-all col-12'>
                    <div className='row'>
                        <div className='add-car d-flex pb-3 pt-3 pr-3'>
                            <div className="delete-all pr-3">
                                <span className='Select-all pr-2'>Select all</span>
                                <input className='checkbox-all pr-2' type="checkbox" checked={isCheck} onChange={checkAll} disabled={nametype.length === 0} />
                                <button className='button-delete-all ml-2' disabled={isCheck === false} onClick={showDele}><i className="fa-solid fa-trash"></i></button>
                            </div>
                            <Link to="/create-product" className='controll-add-car'><i className='fa-solid fa-plus'></i></Link>
                        </div>
                        {
                            nametype.map((nametypes) => (
                                < ProductCarAdminItem key={nametypes._id} nametypes={nametypes} callback={callback} setCallback={setCallback} handleCheck={handleCheck} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCarAdmin