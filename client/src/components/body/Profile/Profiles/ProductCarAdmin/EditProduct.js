import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import imageUser from '../../../../../assets/images/add.png'
import Loading2 from '../../../../utils/Loadding/Loadding2'
import './CreateProduct.scss'
import Form from 'react-bootstrap/Form';

//markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Modal } from 'react-bootstrap';
//

import Steering_Wheel from '../../../../../assets/images/steering-wheel.svg'


const initialState = {
    name: '',
    type: '',
    money: '',
    energy: '',
    description: '',
    descriptionHTML: '',
    specifications: '',
    specificationsHTML: '',
    amount: '',
    id: '',
    tudong: ''
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
    const [specifications, setSpecifications] = useState("")
    const [descriptionInterior, setDescriptionInterior] = useState("")
    const [descriptionConvenient, setDescriptionConvenient] = useState("")

    const [check, setCheck] = useState(false)
    const [num, setNum] = useState(0)
    const [checkLaiThu, setCheckLaiThu] = useState(false)
    const [numLaiThu, setNumLaiThu] = useState(0)
    //const { description, descriptionHTML } = markdown

    const history = useHistory()

    const { name, type, money, energy, description, descriptionHTML, amount } = product

    const [open, setOpen] = useState(false);

    const [avatar, setAvatar] = useState(false);
    const [colortypeone, setColortypeone] = useState(false);
    const [colortypetwo, setColortypetwo] = useState(false);
    const [colortypethree, setColortypethree] = useState(false);

    const [show, setShow] = useState(false)

    const [images, setImages] = useState([])
    const [imagesNew, setImagesNew] = useState([])
    //const [imagesAll, setImagesAll] = useState([])

    const [loading, setLoading] = useState(false)

    // product
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)



    useEffect(() => {
        if (param.id) {
            //setOnEdit(true)
            products.forEach(productt => {
                if (productt._id == param.id) {
                    setProduct(productt)
                    setImages(productt.avatar)
                    // setAvatar(productt.avatar)
                    // setColortypeone(productt.colortypeone)
                    // setColortypetwo(productt.colortypetwo)
                    // setColortypethree(productt.colortypethree)
                    setMarkdown(productt)
                    setSpecifications(productt)
                    setDescriptionInterior(productt)
                    setDescriptionConvenient(productt)
                    // console.log(product)
                }
            })
        }
        else {
            // setOnEdit(false)
            setProduct('')
            // setAvatar(false)
            // setColortypeone(false)
            // setColortypetwo(false)
            // setColortypethree(false)
            setMarkdown(false)
            setSpecifications(false)
            setDescriptionConvenient(false)
            setDescriptionInterior(false)
        }
    }, [param.id, products])

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

    const handleCheck = e => {
        setCheck(!check)
        setNum(num + 1)
    }

    const handleCheckLaiThu = e => {
        setCheckLaiThu(!checkLaiThu)
        setNumLaiThu(numLaiThu + 1)
    }

    //upload image
    const changeUpload = async (e) => {
        try {
            const files = Array.from(e.target.files)
            let num = 0

            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }

            if (files.length === 0) {
                return toast.error("Files does not exist.")
            }

            files.forEach(file => {
                if (file.size > 1024 * 1024) {
                    return toast.error("Size too large.")
                }

                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    return toast.error("File format is incorrect.")
                }

                const render = new FileReader()
                num += 1
                if (num <= 13) {
                    render.readAsDataURL(file)
                    render.onloadend = () => {
                        setImages(oldArray => [...oldArray, render.result])
                        setImagesNew(oldArray => [...oldArray, render.result])
                    }
                }
                else {
                    toast.error("Select up to 13.")
                }
            })

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    //

    // console.log(images)
    // console.log(imagesNew)


    //destroy
    const deleteImage = async (id, index) => {
        try {

            if (!isAdmin) {
                toast.error("You're not an admin")
                window.location.reload()
            }

            if (window.confirm("Bạn có chắc là muốn xóa tấm ảnh này hay không? nó có thể ảnh hưởng đến trải nghiệm ảnh của bạn và khách hàng ? hãy cân nhắc kỹ !!!!")) {

                setLoading(true)
                const newArr = [...images]
                newArr.splice(index, 1)
                setImages(newArr)

                const res = await Axios.post('/api/destroy_product_car', { public_id: id }, {
                    headers: { Authorization: token }
                })
                //console.log(id)
                // setCallback(!callback)
                // toast.success(res.data.msg)
                setLoading(false)
                setShow(true)
            }

        } catch (err) {
            toast.error(err.response.data.msg)
            setLoading(false)
        }
    }

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!isAdmin) {
                toast.error("You're not an admin")
            }
            if (!images) {
                toast.error("No avatar Upload")
            }

            await Axios.put(`/api/productsDelete/${product._id}`, {
                name: product.name,
                type: product.type,
                money: product.money,
                amount: product.amount,
                energy: product.energy,
                description: markdown.description,
                descriptionHTML: markdown.descriptionHTML,
                specifications: specifications.specifications,
                specificationsHTML: specifications.specificationsHTML,
                descriptionInterior: descriptionInterior.descriptionInterior,
                descriptionInteriorHTML: descriptionInterior.descriptionInteriorHTML,
                descriptionConvenient: descriptionConvenient.descriptionConvenient,
                descriptionConvenientHTML: descriptionConvenient.descriptionConvenientHTML,
                avatar: images,
                tudong: product.tudong
                // colortypeone: JSON.parse(colortypeone),
                // colortypetwo: JSON.parse(colortypetwo),
                // colortypethree: JSON.parse(colortypethree)
            }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setShow(false)
            setCallback(!callback)
            toast.success("Susscess !!!")

        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    //

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    useEffect(() => {
        products?.forEach((pr) => {
            if (pr._id === param.id) {
                setCheck(pr.checkThinhHanh === 1 ? true : false)
                setCheckLaiThu(pr.laithu === 1 ? true : false)
            }
        })
    }, [product, param.id])

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!isAdmin) {
                toast.error("You're not an admin")
            }
            if (!images) {
                toast.error("No avatar Upload")
            }

            await Axios.put(`/api/products/${product._id}`, {
                name: product.name,
                type: product.type,
                money: product.money,
                amount: product.amount,
                energy: product.energy,
                description: markdown.description,
                descriptionHTML: markdown.descriptionHTML,
                specifications: specifications.specifications,
                specificationsHTML: specifications.specificationsHTML,
                descriptionInterior: descriptionInterior.descriptionInterior,
                descriptionInteriorHTML: descriptionInterior.descriptionInteriorHTML,
                descriptionConvenient: descriptionConvenient.descriptionConvenient,
                descriptionConvenientHTML: descriptionConvenient.descriptionConvenientHTML,
                avatar: imagesNew,
                checkThinhHanh: check ? 1 : 0,
                laithu: checkLaiThu ? 1 : 0,
                tudong: product.tudong
                // colortypeone: JSON.parse(colortypeone),
                // colortypetwo: JSON.parse(colortypetwo),
                // colortypethree: JSON.parse(colortypethree)
            }, {
                headers: { Authorization: token }
            })
            setLoading(false)
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

    const optionAuto = [
        {
            value: "0", label: "Xe số sàn"
        },
        {
            value: "1", label: "Xe tự động "
        }
    ]

    //markdown
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const handleEditorChangeDescription = ({ html, text }) => {
        setMarkdown({
            description: text,
            descriptionHTML: html
        })
    }
    //

    //  
    const mdParsers = new MarkdownIt(/* Markdown-it options */);

    const handleEditorChangedSpecifications = ({ html, text }) => {
        setSpecifications({
            specifications: text,
            specificationsHTML: html
        })
    }
    //

    const handleEditorChangedDescriptionInterior = ({ html, text }) => {
        setDescriptionInterior({
            descriptionInterior: text,
            descriptionInteriorHTML: html
        })
    }

    const handleEditorChangedDescriptionConvenient = ({ html, text }) => {
        setDescriptionConvenient({
            descriptionConvenient: text,
            descriptionConvenientHTML: html
        })
    }

    // edit
    //const [onEdit, setOnEdit] = useState(false)


    //

    return (
        <>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    Ảnh bạn đã xóa thành công !!!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmitImage} type="submit">Kết thúc</Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item_body'>
                {loading ? <Loading2 /> :
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
                                                    <option key={category._id} value={category._id} selected={product.type === category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className='col-4 d-flex justify-content-center align-items-center'>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Thịnh hành"
                                                    checked={check}
                                                    onChange={handleCheck}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form col-12 mt-4'>
                                        <div className="input-group">
                                            <div className="input-group-prepend ">
                                                <span className="input-group-text boderr" id="inputGroupPrepend1"><img className='img-steering-wheel d-flex' src={Steering_Wheel} /></span>
                                            </div>
                                            {/* <input type="text" className="form-controls col-11" name="energy" id="energy" placeholder="Energy" /> */}
                                            <select className="custom-selects col-4" name="tudong" id="tudong" defaultValue={product.tudong} onChange={handleChangeInput}>
                                                <option value="">Hãy chọn loại hình vận hành</option>
                                                {optionAuto.map((option) => (
                                                    <option key={option.value} value={option.value} selected={product.tudong == option.value}>
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
                                        <div className='profile_item_avatars'>
                                            <div className='profile_item_avatar_product col-3'>
                                                <img src={imageUser} alt="" />
                                                <span className='spans'>
                                                    <i className="fa-solid fa-camera"></i>
                                                    <input type="file" name='file' id="file_up" multiple onChange={changeUpload} accept="image/*" />
                                                </span>
                                            </div>
                                            <div className='custom-all-img col-9 d-flex'>
                                                <div className='row img-up mx-0 w-100'>
                                                    {
                                                        images.map((img, index) => (
                                                            <div key={index} className="file_img my-1">
                                                                <img src={img.url ? img.url : img} alt="1" className='img-thumbnail rounded' />
                                                                <span disabled={loading} onClick={() => deleteImage(img.public_id, index)}>X</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
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
                                                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} value={markdown.description} onChange={handleEditorChangeDescription} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='profile_item_form'>
                                <div className='form-row'>
                                    <div className='form col-12 pt-5'>
                                        <div className='input-group'>
                                            <div className="input-group-prepend ">
                                                <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-pen d-flex"></i></span>
                                            </div>
                                            {/* name='description' value={product.description} onChange={handleChangeInput} */}
                                            <div className="form-control description col-11" >
                                                <div className='description-title'>specifications</div>
                                                <div className='description-note'><i>Mô tả thông số kỹ thuật</i></div>
                                                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParsers.render(text)} value={specifications.specifications} onChange={handleEditorChangedSpecifications} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='profile_item_form'>
                                <div className='form-row'>
                                    <div className='form col-12 pt-5'>
                                        <div className='input-group'>
                                            <div className="input-group-prepend ">
                                                <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-pen d-flex"></i></span>
                                            </div>
                                            {/* name='description' value={product.description} onChange={handleChangeInput} */}
                                            <div className="form-control description col-11" >
                                                <div className='description-title'>Interior</div>
                                                <div className='description-note'><i>Mô tả nội thất</i></div>
                                                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParsers.render(text)} value={descriptionInterior.descriptionInterior} onChange={handleEditorChangedDescriptionInterior} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='profile_item_form'>
                                <div className='form-row'>
                                    <div className='form col-12 pt-5'>
                                        <div className='input-group'>
                                            <div className="input-group-prepend ">
                                                <span className="input-group-text boderr" id="inputGroupPrepend1"><i className="fa-solid fa-pen d-flex"></i></span>
                                            </div>
                                            {/* name='description' value={product.description} onChange={handleChangeInput} */}
                                            <div className="form-control description col-11" >
                                                <div className='description-title'>Convenient</div>
                                                <div className='description-note'><i>Mô tả tiện nghi</i></div>
                                                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParsers.render(text)} value={descriptionConvenient.descriptionConvenient} onChange={handleEditorChangedDescriptionConvenient} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Form className='d-flex align-items-center flex-column pt-3 '>
                                <Form.Text>Cân nhắc kỹ có nên cho khách hàng lái thử hay không !!</Form.Text>
                                <Form.Check
                                    type="checkbox"
                                    label="Cho phép lái thử"
                                    checked={checkLaiThu}
                                    onChange={handleCheckLaiThu}
                                />
                            </Form>
                            <div className='col-12 d-flex justify-content-center pt-4'>
                                <button className="btn btn-danger btn-block mb-4 col-4 " disabled={loading} onClick={handleSubmit} type='submit'>Update</button>
                            </div>
                        </div >
                    </div>
                }
            </div >

        </>
    )
}

export default EditProduct