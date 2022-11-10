import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import imageUser from '../../../../../assets/images/add.png'
import Loading from '../../../../utils/Loadding/loadding'
import './CreateProduct.scss'


//markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
//


const initialState = {
    name: '',
    type: '',
    money: '',
    energy: '',
    description: '',
    descriptionHTML: '',
    amount: '',
    id: '',
    // err: '',
    // success: ''
}

function EditProduct() {
    const auth = useSelector(state => state.auth)
    const { isAdmin } = auth

    const token = useSelector(state => state.token)

    const param = useParams()

    const [product, setProduct] = useState(initialState)
    const [callback, setCallback] = useState(false)

    const [markdown, setMarkdown] = useState("")

    //const { description, descriptionHTML } = markdown

    const history = useHistory()

    const { name, type, money, energy, description, descriptionHTML, amount } = product

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

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const res = await Axios.get(`/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`)
    //         setProducts(res.data.products)
    //         setResult(res.data.result)
    //     }
    //     getProducts()
    // }, [callback, category, sort, search, page])

    useEffect(() => {
        const getProducts = async () => {
            const res = await Axios.get('/api/products')
            setProducts(res.data)
        }
        getProducts()
    }, [callback])


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
            setAvatar(JSON.stringify(res.data))
            toast.success("Upload Image Success")

        } catch (err) {

            toast.error(err.response.data.msg)
        }
    }

   // console.log(avatar)

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
            setColortypeone(JSON.stringify(res.data))
            toast.success("Upload Image Success")

        } catch (err) {

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
            setColortypetwo(JSON.stringify(res.data))
            toast.success("Upload Image Success")

        } catch (err) {

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
            setColortypethree(JSON.stringify(res.data))
            toast.success("Upload Image Success")

        } catch (err) {

            toast.error(err.response.data.msg)
        }
    }


    //

    //destroy
    const avatarDestroy = JSON.parse(avatar) 
    //console.log(avatarDestroy)
    
    const handleDistroy = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading(true)
            await Axios.post('/api/destroy_product_car', { public_id: avatarDestroy.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setAvatar(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const oneDestroy = JSON.parse(colortypeone) 

    const handleDistroy1 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading1(true)
            await Axios.post('/api/destroy_product_car', { public_id: oneDestroy.public_id }, {
                headers: { Authorization: token }
            })
            setLoading1(false)
            setColortypeone(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const twoDestroy = JSON.parse(colortypetwo) 

    const handleDistroy2 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading2(true)
            await Axios.post('/api/destroy_product_car', { public_id: twoDestroy.public_id }, {
                headers: { Authorization: token }
            })
            setLoading2(false)
            setColortypetwo(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const threeDestroy = JSON.parse(colortypethree) 

    const handleDistroy3 = async () => {
        try {
            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }
            setLoading3(true)
            await Axios.post('/api/destroy_product_car', { public_id: threeDestroy.public_id }, {
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

            await Axios.put(`/api/products/${product.id}`, {
                name: product.name,
                type: product.type,
                money: product.money,
                amount: product.amount,
                energy: product.energy,
                description: markdown.description,
                descriptionHTML: markdown.descriptionHTML,
                avatar: JSON.parse(avatar),
                colortypeone: JSON.parse(colortypeone),
                colortypetwo: JSON.parse(colortypetwo),
                colortypethree: JSON.parse(colortypethree)
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            history.push("/all-product")
            toast.success("Update Success!")

        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
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

    //markdown
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const handleEditorChange = ({ html, text }) => {
        setMarkdown({
            description: text,
            descriptionHTML: html
        })
    }
    //

    // edit
    //const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if (param.id) {
            //setOnEdit(true)
            products.forEach(productt => {
                if (productt.id == param.id) {
                    setProduct(productt)
                    setAvatar(productt.avatar)
                    setColortypeone(productt.colortypeone)
                    setColortypetwo(productt.colortypetwo)
                    setColortypethree(productt.colortypethree)
                    setMarkdown(productt)
                   // console.log(product)
                }
            })
        }
        else {
           // setOnEdit(false)
            setProduct(initialState)
            setAvatar(false)
            setColortypeone(false)
            setColortypetwo(false)
            setColortypethree(false)
            setMarkdown(false)
        }
    }, [param.id, products])
    //

    return (
        <>
            <div className='profile_item_body'>
                <div className='profile_item_info col-12 d-flex'>
                    <div className='form-create-product-car col-12'>
                        <div className='profile_item_form'>
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
                                                <option key={category.id} value={category.id} selected={product.type === category.id}>
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
                                                <option key={option.value} value={option.value} selected={product.energy == option.value}>
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
                                                    <img src={avatar ? avatarDestroy.url : imageUser} alt="" />
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
                                                    <img src={colortypeone ? oneDestroy.url : imageUser} alt="" />
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
                                                    <img src={colortypetwo ? twoDestroy.url : imageUser} alt="" />
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
                                                    <img src={colortypethree ? threeDestroy.url : imageUser} alt="" />
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
                                        {/* name='description' value={product.description} onChange={handleChangeInput} */}
                                        <div className="form-control description col-11" >
                                            <div className='description-title'>description</div>
                                            <div className='description-note'><i>Mô tả chi tiết sản phẩm</i></div>
                                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} value={markdown.description} onChange={handleEditorChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 d-flex justify-content-center pt-4'>
                            <button className="btn btn-danger btn-block mb-4 col-4 " disabled={loading || loading2 || loading3 || loading1} onClick={handleSubmit} type='submit'>Update</button>
                        </div>
                    </div >
                </div>
            </div >

        </>
    )
}

export default EditProduct