import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import imageUser from '../../../../../assets/images/add.png'
import Loading from '../../../../utils/Loadding/loadding'
import './CreateProduct.scss'

// import { GlobalState } from '../../../../../../src/GlobalState '


const initialState = {
    product_car_id: '',
    name: '',
    type: '',
    money: '',
    energy: '',
    description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
    sold: '',
    amount: '',
    id: '',
    err: '',
    success: ''
}

function CreateProduct() {
    const auth = useSelector(state => state.auth)
    const { isAdmin } = auth

    const token = useSelector(state => state.token)

    const [product, setProduct] = useState(initialState)
    const [callback, setCallback] = useState(false)

    const [open, setOpen] = useState(false);

    const [avatar, setAvatar] = useState(false);
    const [colortypeone, setColortypeone] = useState(false);
    const [colortypetwo, setColortypetwo] = useState(false);
    const [colortypethree, setColortypethree] = useState(false);

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)

    // product
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
        const getProducts = async () => {
            const res = await Axios.get(`/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    }, [callback, category, sort, search, page])
    //    

    //category
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const res = await Axios.get('/api/categorys')
            setCategories(res.data)
        }
        getCategories()
    }, [callback])
    //

    //upload image
    const changeUpload = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            const file = e.target.files[0]

            if (!file) return toast.error("No files were uploaded.")

            if (file.size > 1024 * 1024)
                return toast.error("Size too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await Axios.post('/api/upload_product_car', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading(false)
            setAvatar(res.data)
            toast.success("Upload Image Success")

        } catch (err) {
            setProduct({ ...product, err: err.response.data.msg, success: '' })
            toast.error(err.response.data.msg)
        }
    }

    const changeUpload1 = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            const file = e.target.files[0]

            if (!file) return toast.error("No files were uploaded.")

            if (file.size > 1024 * 1024)
                return toast.error("Size too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading1(true)
            const res = await Axios.post('/api/upload_product_car', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading1(false)
            setColortypeone(res.data)
            toast.success("Upload Image Success")

        } catch (err) {
            setProduct({ ...product, err: err.response.data.msg, success: '' })
            toast.error(err.response.data.msg)
        }
    }

    const changeUpload2 = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            const file = e.target.files[0]

            if (!file) return toast.error("No files were uploaded.")

            if (file.size > 1024 * 1024)
                return toast.error("Size too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading2(true)
            const res = await Axios.post('/api/upload_product_car', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading2(false)
            setColortypetwo(res.data)
            toast.success("Upload Image Success")

        } catch (err) {
            setProduct({ ...product, err: err.response.data.msg, success: '' })
            toast.error(err.response.data.msg)
        }
    }

    const changeUpload3 = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            const file = e.target.files[0]

            if (!file) return toast.error("No files were uploaded.")

            if (file.size > 1024 * 1024)
                return toast.error("Size too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading3(true)
            const res = await Axios.post('/api/upload_product_car', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading3(false)
            setColortypethree(res.data)
            toast.success("Upload Image Success")

        } catch (err) {
            setProduct({ ...product, err: err.response.data.msg, success: '' })
            toast.error(err.response.data.msg)
        }
    }

    //

    //destroy
    const handleDistroy = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading(true)
            await Axios.post('/api/destroy_product_car', { public_id: avatar.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setAvatar(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDistroy1 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading1(true)
            await Axios.post('/api/destroy_product_car', { public_id: colortypeone.public_id }, {
                headers: { Authorization: token }
            })
            setLoading1(false)
            setColortypeone(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDistroy2 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading2(true)
            await Axios.post('/api/destroy_product_car', { public_id: colortypetwo.public_id }, {
                headers: { Authorization: token }
            })
            setLoading2(false)
            setColortypetwo(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDistroy3 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading3(true)
            await Axios.post('/api/destroy_product_car', { public_id: colortypethree.public_id }, {
                headers: { Authorization: token }
            })
            setLoading3(false)
            setColortypethree(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    //

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
            }
            if (!avatar || !colortypeone || !colortypetwo || !colortypethree) {
                toast.error("No avatar Upload")
            }

            await Axios.post('/api/products', {
                ...product, 
                avatar: avatar.url, 
                colortypeone: colortypeone.url, 
                colortypetwo: colortypetwo.url, 
                colortypethree: colortypethree.url
            }, {
                headers: { Authorization: token }
            })

            setProduct(initialState)
            setAvatar(false)
            setColortypeone(false)
            setColortypetwo(false)
            setColortypethree(false)

            toast.success("Create Success!")

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    //

    const optionEnergy = [
        {
            value: "0", label: "Xăng"
        },
        {
            value: "1", label: "Điện"
        }
    ]

    const styleUpload = {
        display: avatar ? "block" : "none"
    }

    const styleUpload1 = {
        display: colortypeone ? "block" : "none"
    }

    const styleUpload2 = {
        display: colortypetwo ? "block" : "none"
    }

    const styleUpload3 = {
        display: colortypethree ? "block" : "none"
    }

    return (
        <>
            <div className='profile_item_body'>
                <div className='profile_item_info col-12 d-flex'>
                    <div className='form-create-product-car col-12'>
                        <div className='profile_item_form'>
                            <div className='form-row'>
                                <div className='form col-12'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr " id="inputGroupPrepend1"><i className="fa-solid fa-key d-flex"></i></span>
                                        </div>
                                        <input type="text" className="form-controls col-11" name="product_car_id" id="product_car_id" placeholder="product_car_id" defaultValue={product.product_car_id} onChange={handleChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form col-12 mt-4'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr " id="inputGroupPrepend1"><i className="fa fa-user d-flex"></i></span>
                                        </div>
                                        <input type="text" className="form-controls col-11" name="name" id="name" placeholder="Tên xe" defaultValue={product.name} onChange={handleChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form col-12 mt-4'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-bars d-flex"></i></span>
                                        </div>
                                        {/* <input type="text" className="form-controls col-11" name="type" id="type" placeholder="Loại xe" defaultValue={product.type}/> */}
                                        <select className="custom-selects col-4" name="type" id="type" defaultValue={product.type} onChange={handleChangeInput}>
                                            <option value="">Hãy chọn loại xe</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form col-12 mt-4'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-money-bill d-flex"></i></span>
                                        </div>
                                        <input type="number" className="form-controls col-11" name="money" id="money" placeholder="Giá bán" defaultValue={product.money} onChange={handleChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form col-12 mt-4'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-charging-station d-flex"></i></span>
                                        </div>
                                        {/* <input type="text" className="form-controls col-11" name="energy" id="energy" placeholder="Energy" /> */}
                                        <select className="custom-selects col-4" name="energy" id="energy" defaultValue={product.energy} onChange={handleChangeInput}>
                                            <option value="">Hãy chọn loại năng lượng</option>
                                            {optionEnergy.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form col-12 mt-4'>
                                    <div className="input-group">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-list-ol d-flex"></i></span>
                                        </div>
                                        <input type="number" className="form-controls col-11" name="amount" id="amount" placeholder="Số lượng" defaultValue={product.amount} onChange={handleChangeInput} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='suggestions col-12 pt-5 pl-0'>
                            <button className="input-group-prepend pl-0"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}>
                                <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-image d-flex"></i></span>
                                <div className='suggestions-title d-flex'>
                                    Lựa chọn hình ảnh, đại diện cho sản phẩm của mình
                                </div>
                                <i className="fa-solid fa-caret-down d-flex pl-3"></i>
                            </button>
                            <div className='noted col-6 d-flex'>
                                <p> * Dụng lượng file tối đa 1 MB</p>
                                <p>  * Định dạng:.JPEG, .PNG</p>
                            </div>
                        </div>
                        <Collapse in={open}>
                            <div className='collapse-image'>
                                <div className='image-product col-12 d-flex pt-3'>
                                    <div className='profile_item_avatar'>
                                        {loading
                                            ?
                                            <>
                                                <div className='profile_item_avatar_product'>
                                                    <div className='loading-cr'><span>...</span></div>
                                                </div>
                                                <span>Image 1</span>
                                            </>
                                            : <>
                                                <div id='file_img_product' style={styleUpload}>
                                                    <span className='destroy' onClick={handleDistroy}>X</span>
                                                </div>
                                                <div className='profile_item_avatar_product'>
                                                    <img src={avatar ? avatar.url : imageUser} alt="" />
                                                    <span className='spans' style={{ display: avatar ? "none" : "block" }}>
                                                        <i className="fa-solid fa-camera"></i>
                                                        <input type="file" name='file' id="file_up" onChange={changeUpload} />
                                                    </span>
                                                </div>
                                                <span>Image 1</span>
                                            </>
                                        }
                                    </div>
                                    <div className='profile_item_avatar'>
                                        {loading1
                                            ?
                                            <>
                                                <div className='profile_item_avatar_product'>
                                                    <div className='loading-cr'><span>...</span></div>
                                                </div>
                                                <span>Image 2</span>
                                            </>
                                            : <>
                                                <div id='file_img_product' style={styleUpload1}>
                                                    <span className='destroy' onClick={handleDistroy1}>X</span>
                                                </div>
                                                <div className='profile_item_avatar_product'>
                                                    <img src={colortypeone ? colortypeone.url : imageUser} alt="" />
                                                    <span className='spans' style={{ display: colortypeone ? "none" : "block" }}>
                                                        <i className="fa-solid fa-camera"></i>
                                                        <input type="file" name='file' id="file_up" onChange={changeUpload1} />
                                                    </span>
                                                </div>
                                                <span>Image 2</span>
                                            </>
                                        }
                                    </div>
                                    <div className='profile_item_avatar'>
                                        {loading2
                                            ?
                                            <>
                                                <div className='profile_item_avatar_product'>
                                                    <div className='loading-cr'><span>...</span></div>
                                                </div>
                                                <span>Image 3</span>
                                            </>
                                            : <>
                                                <div id='file_img_product' style={styleUpload2}>
                                                    <span className='destroy' onClick={handleDistroy2}>X</span>
                                                </div>
                                                <div className='profile_item_avatar_product'>
                                                    <img src={colortypetwo ? colortypetwo.url : imageUser} alt="" />
                                                    <span className='spans' style={{ display: colortypetwo ? "none" : "block" }}>
                                                        <i className="fa-solid fa-camera"></i>
                                                        <input type="file" name='file' id="file_up" onChange={changeUpload2} />
                                                    </span>
                                                </div>
                                                <span>Image 3</span>
                                            </>
                                        }
                                    </div>
                                    <div className='profile_item_avatar'>
                                        {loading3
                                            ?
                                            <>
                                                <div className='profile_item_avatar_product'>
                                                    <div className='loading-cr'><span>...</span></div>
                                                </div>
                                                <span>Image 4</span>
                                            </>
                                            : <>
                                                <div id='file_img_product' style={styleUpload3}>
                                                    <span className='destroy' onClick={handleDistroy3}>X</span>
                                                </div>
                                                <div className='profile_item_avatar_product'>
                                                    <img src={colortypethree ? colortypethree.url : imageUser} alt="" />
                                                    <span className='spans' style={{ display: colortypethree ? "none" : "block" }}>
                                                        <i className="fa-solid fa-camera"></i>
                                                        <input type="file" name='file' id="file_up" onChange={changeUpload3} />
                                                    </span>
                                                </div>
                                                <span>Image 4</span>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <div className='profile_item_form'>
                            <div className='form-row'>
                                <div className='form col-12 pt-5'>
                                    <div className='input-group'>
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-pen d-flex"></i></span>
                                        </div>
                                        <textarea className="form-control description col-11" name='description' value={product.description} onChange={handleChangeInput}>Giới thiệu</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 d-flex justify-content-center pt-4'>
                            <button className="btn btn-danger btn-block mb-4 col-4 " disabled={loading} onClick={handleSubmit} type='submit'>Create</button>
                        </div>
                    </div >
                </div>
            </div >

        </>
    )
}

export default CreateProduct