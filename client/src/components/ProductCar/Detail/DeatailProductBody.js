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
    //

    return (
        <>
            <SimpleReactLightbox>
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
                                                    && <span>{detailItem.type.name}</span>
                                                }
                                            </span>
                                        </div>
                                        <div className='overview-money'>
                                            <span className='price-range mr-2'>Khoảng giá:</span>
                                            <span className='money-car'>{formatMoney}</span>
                                        </div>
                                    </div>
                                    <div className='DetailProduct-header-controll'>
                                        <Link className="control-overview" activeClass='active' to="TongQuan" spy={true} offset={-330} smooth={true} duration={500} >Tổng quan</Link>
                                        <Link className="control-overview" activeClass='active' to="ChiTiet" spy={true} offset={-270} smooth={true} duration={500} >Chi tiết</Link>
                                        <Link className="control-overview" activeClass='active' to="ThongSoKyThuat" spy={true} offset={-270} smooth={true} duration={500} >Thông số kỹ thuật</Link>
                                    </div>
                                </div>
                                <div className='DetailProduct-body d-flex col-12'>
                                    <div className='DetailProduct-body-car col-8'>
                                        <div className='DetailProduct-TongQuan-name'>
                                            <div className='DetailProduct-TongQuan' id='TongQuan'>
                                                <div className='title-detailProduct'>
                                                    <span>
                                                        Tổng Quan
                                                    </span>
                                                </div>

                                                <div className='DetailProduct-TongQuan-img'>
                                                    <img src={detailItem.avatar?.[0].url} />
                                                </div>
                                                <SRLWrapper>
                                                    <Slider className='DetailProduct-TongQuan-img-mini' {...settings}>
                                                        {
                                                            detailItem.avatar?.map((img, index) => (
                                                                <img key={index} src={img.url} alt={img.url} />
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
                                    </div>
                                    <div className='DetailProduct-summary col-4'>
                                        <div className='DetailProduct-summary-name'>
                                            <div className='title-detailProduct'>
                                                <span>Hóa đơn</span>
                                            </div>
                                            <div className='detailProduct-body-Receipt'>
                                                <div className='Receipt-body'>
                                                    <div className='Receipt-body-money'>
                                                        <span>Giá lăn bánh</span>
                                                    </div>
                                                    <div className='Receipt-body-select-name pt-2'>
                                                        <span className='input-icons'><i className="fa-solid fa-star icon"></i></span>
                                                        <input type="text" disabled className='Receipt-body-select' value={formatTien} />

                                                    </div>
                                                </div>
                                                <div className='Receipt-body-nameCity'>
                                                    <div className='Receipt-nameCity-name'>
                                                        <span>Tên chi nhánh</span>
                                                    </div>
                                                    <div className='Receipt-nameCity pt-2'>
                                                        <span className='input-icons'><i className="fa-solid fa-city icon"></i></span>
                                                        <input type="text" disabled className='Receipt-nameCity-input' value="MERCEDES-BENZ-MINH" />
                                                    </div>
                                                </div>
                                                <div className='Money-Receipt'>
                                                    <span className='title-Money-Receipt'>Giá niêm yết: </span>
                                                    <span>{formatMoney}</span>
                                                </div>
                                            </div>
                                            <div className='Receipt-incurred'>
                                                <table className="table table-bordered">
                                                    <thead className='thead-dark'>
                                                        <tr>
                                                            <th scope="col">Dự tính chi phí</th>
                                                            <th scope="col" className='money-td'>(vnđ)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Giá niêm yết:</td>
                                                            <td className='money-td'>{formatMoney}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí trước bạ (12%):</td>
                                                            <td className='money-td'>{money1}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí sử dụng đường bộ (01 năm):</td>
                                                            <td className='money-td'>{money2}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bảo hiểm trách nhiệm dân sự (01 năm):</td>
                                                            <td className='money-td'>{money3}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí đăng kí biển số:</td>
                                                            <td className='money-td'>{money4}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí đăng kiểm:</td>
                                                            <td className='money-td'>{money5}</td>
                                                        </tr>
                                                        <tr className='tongtien'>
                                                            <td>Tổng cộng:</td>
                                                            <td className='money-td'>{formatTien}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='SetTime-TextCar'>
                                                <div className='SetTime-TextCar-Name'>
                                                    <span>Chọn ngày lái thử</span>
                                                </div>
                                                <div className='SetTime-TextCar-date'>
                                                    {/* <RangePicker onChange={(value) => {
                                                        // const values = moment(value[0]).format('DD-MM-YYYY')
                                                        setDates(value.map(item => {
                                                            return moment(item).format('DD-MM-YYYY')
                                                        }))
                                                    }} /> */}

                                                    <DatePicker onChange={(value) => {
                                                        //const values = moment(value[0]).format('DD-MM-YYYY')
                                                        setDates(value.format('DD-MM-YYYY'))
                                                    }}
                                                        // dateFormat="DD-MM-YYYY" 
                                                        defaultDate={dates} format='DD-MM-YYYY'
                                                    />
                                                </div>
                                            </div>
                                            <div className='Title-note'>
                                                <span><i className="fa-solid fa-circle-exclamation"></i></span> <p>Ngay sau khi nhận được yêu cầu chúng tôi sẽ liên hệ lại với quý khách trong thời gian sớm nhất.</p>
                                            </div>
                                            <div className='Submit'>
                                                <button type='submit' className='Submit-car' onClick={handleSubmit}>Đăng ký lái thử</button>
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