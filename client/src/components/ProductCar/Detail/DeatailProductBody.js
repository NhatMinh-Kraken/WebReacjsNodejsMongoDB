import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './DetailBody.scss'

import { Link, animateScroll as scroll } from 'react-scroll'

import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

// date range picker
import 'antd/dist/antd.min.css';
import { DatePicker } from 'antd';
import moment from 'moment';
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import Steering_Wheel from '../../../assets/images/steering-wheel.svg'
const { RangePicker } = DatePicker;
//


const initialState = {
    smoney1: 291480000, smoney2: 1560000, smoney3: 437000, smoney4: 20000000, smoney5: 340000
}

function DeatailProductBody() {

    const auth = useSelector(state => state.auth)
    const { isLogged, user } = auth
    const token = useSelector(state => state.token)
    const history = useHistory()

    const param = useParams()
    const [detailItem, setDetailItem] = useState([])

    const [isShown, setIsShown] = useState(false);
    const [isShownRight, setIsShownRight] = useState(false)

    const [avatar, setAvatar] = useState(false);
    const [colortypeone, setColortypeone] = useState(false);
    const [colortypetwo, setColortypetwo] = useState(false);
    const [colortypethree, setColortypethree] = useState(false);

    const [sumMoney, setSumMoney] = useState(initialState)


    const [tab, setTab] = useState(0)

    // nametype
    const [nametypes, setNametypes] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/nametype')
            setNametypes(res.data)
        }
        getNameType()
    }, [callback])

    //

    useEffect(() => {
        if (param.id) {
            nametypes.forEach(nametype => {
                if (nametype._id == param.id) {
                    setDetailItem(nametype)
                }
            });
        }
    }, [param, nametypes, callback])

    const [click, setClick] = useState(false)
    const closemenu = () => setClick(false)

    const handleClick = () => {
        setClick(!click)
    }

    //see more

    //

    const settings = {
        infinite: false,
        speed: 500,
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const formatMoney = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailItem.money)

    //date range picker
    const [dates, setDates] = useState("")

    //

    //money

    const money1 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney.smoney1)
    const money2 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney.smoney2)
    const money3 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney.smoney3)
    const money4 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney.smoney4)
    const money5 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney.smoney5)



    const tien = Number(detailItem.money)

    const sum = tien + sumMoney.smoney1 + sumMoney.smoney2 + sumMoney.smoney3 + sumMoney.smoney4 + sumMoney.smoney5

    const formatTien = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum)


    // submit lai thu
    const handleSubmit = async (e) => {
        try {
            // e.preventDefault();
            if (!isLogged) {
                toast.error("Please login to proceed with registration!!!")
                history.push("/login")
            }

            if (!dates) {
                toast.error("Please choose a test drive date!!!")
            }
            else {
                await Axios.post("/api/laithu", {
                    nameUser: user.name,
                    email: user.email,
                    idUser: user._id,
                    name: detailItem.name,
                    type: detailItem.type.name,
                    money: detailItem.money,
                    smoney1: sumMoney.smoney1,
                    smoney2: sumMoney.smoney2,
                    smoney3: sumMoney.smoney3,
                    smoney4: sumMoney.smoney4,
                    smoney5: sumMoney.smoney5,
                    sum: sum,
                    date: dates
                }, {
                    headers: { Authorization: token }
                })

                history.push("/")
                toast.success("Create Success!")
            }

        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    return (
        <>

            <SimpleReactLightbox>
                <div className='position-relative'>
                    <div className='DetailProduct-header-controll' onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                        {
                            isShown ?

                                <>
                                    <div className='formHover-button-hover'>
                                        <div className='formHover'>
                                            <Link className="control-overview" activeClass='active' to="TongQuan" spy={true} offset={-230} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Tổng quan</span></Link>
                                            <Link className="control-overview" activeClass='active' to="ChiTiet" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Chi tiết</span></Link>
                                            <Link className="control-overview" activeClass='active' to="ThongSoKyThuat" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Thông số kỹ thuật</span></Link>
                                            <Link className="control-overview" activeClass='active' to="NoiThat" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Nội Thất</span></Link>
                                            <Link className="control-overview" activeClass='active' to="TienNghi" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Tiện Nghi</span></Link>
                                            <Link className="control-overview" activeClass='active' to="Models" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /><span className='d-flex align-items-center'>Models</span></Link>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='formHover-button'>
                                        <Link className="control-overview" activeClass='active' to="TongQuan" spy={true} offset={-230} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                        <Link className="control-overview" activeClass='active' to="ChiTiet" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                        <Link className="control-overview" activeClass='active' to="ThongSoKyThuat" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                        <Link className="control-overview" activeClass='active' to="NoiThat" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                        <Link className="control-overview" activeClass='active' to="TienNghi" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                        <Link className="control-overview" activeClass='active' to="Models" spy={true} offset={-270} smooth={true} duration={100} ><span className='span-icon pr-2' /></Link>
                                    </div>
                                </>

                        }

                    </div>
                    <div className='controler-right'>
                        <div className='controler-right-button' >
                            <a href={`/dangky_laithu/${param.id}`} className='laithu-product'><img className='img-steering-wheel' src={Steering_Wheel} /><span>Đăng ký lái thử xe</span></a>
                        </div>
                        <div className='controler-right-button' >
                            <a href="tel:0396764757" className='laithu-product'><i className="fa-solid fa-phone img-steering-wheel d-flex justify-content-center align-items-center"></i><span>Liên hệ</span></a>
                        </div>
                    </div>
                    <div className='detail-product-car'>
                        <div className='container'>
                            <div className='row'>
                                <div className='DetailProduct'>
                                    <div className='DetailProduct-header d-flex col-12'>
                                        <div className='DetailProduct-header-overview'>
                                            <div className='overview-name'>
                                                <span className='name-car'>
                                                    {detailItem.name}
                                                </span>
                                                <span className='LoaiXe'>
                                                    {
                                                        detailItem
                                                        && detailItem.type
                                                        && detailItem.type.name
                                                        && <span>Mẫu xe: {detailItem.type.name}</span>
                                                    }
                                                </span>
                                            </div>
                                            <div className='overview-money'>
                                                <span className='price-range mr-2'>Khoảng giá:</span>
                                                <span className='money-car'>{formatMoney}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='DetailProduct-body d-flex col-12'>
                                        <div className='DetailProduct-body-car col-12'>
                                            <div className='DetailProduct-TongQuan-name' id='TongQuan'>
                                                <div className='DetailProduct-TongQuan'>
                                                    <div className='title-detailProduct'>
                                                        <span>
                                                            Tổng Quan
                                                        </span>
                                                        <p>Thiết kế thuần điện: dấu ấn của kỷ nguyên mới</p>
                                                    </div>

                                                    <div className='DetailProduct-TongQuan-img'>
                                                        <img src={detailItem.avatar?.[0].url} />
                                                    </div>
                                                    <SRLWrapper>
                                                        <Slider className='DetailProduct-TongQuan-img-mini' {...settings}>
                                                            {
                                                                detailItem.avatar?.map((img, index) => (
                                                                    <img className='pr-2' key={index} src={img.url} alt={img.url} />
                                                                ))
                                                            }
                                                        </Slider>
                                                    </SRLWrapper>

                                                </div>
                                            </div>
                                            <div className='DetailProduct-TongQuan-money'>
                                                <h3>Giá lăn bánh</h3>
                                                <span>Tại Việt Nam, {detailItem.name} được phân phân phối chính hãng 1 phiên bản. Giá lăn bánh tham khảo như sau:</span>
                                                <div className='DetailProduct-TongQuan-table-money pt-3'>
                                                    <table className="table table-bordered">
                                                        <thead className='thead-dark'>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Tên phiên bản</th>
                                                                <th scope="col">Giá niêm yết</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">1</th>
                                                                <td>{detailItem.name}</td>
                                                                <td>{formatMoney}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className='DetailProduct-ChiTiet-name'>
                                                <span>Mô tả / Đánh giá chi tiết</span>
                                                <div id='ChiTiet' className='DetailProduct-ChiTiet' dangerouslySetInnerHTML={{ __html: detailItem.descriptionHTML }} />
                                            </div>
                                            <div className='DetailProduct-ThongSoKyThuat-name'>
                                                <span>Thông số kỹ thuật</span>
                                                <div id='ThongSoKyThuat' className='DetailProduct-ThongSoKyThuat' dangerouslySetInnerHTML={{ __html: detailItem.specificationsHTML }} />
                                            </div>
                                            <div className='DetailProduct-ThongSoKyThuat-name'>
                                                <span>Nội Thất</span>
                                                <div id='NoiThat' className='DetailProduct-ThongSoKyThuat' dangerouslySetInnerHTML={{ __html: detailItem.descriptionInteriorHTML }} />
                                            </div>
                                            <div className='DetailProduct-ThongSoKyThuat-name'>
                                                <span>Tiện Nghi</span>
                                                <div id='TienNghi' className='DetailProduct-ThongSoKyThuat' dangerouslySetInnerHTML={{ __html: detailItem.descriptionConvenientHTML }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleReactLightbox>
        </>
    )
}

export default DeatailProductBody