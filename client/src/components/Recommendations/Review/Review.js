import React from 'react';
import './Review.scss'
import ReviewItem from '../ReviewItem/ReviewItem';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import ANh1 from '../../../assets/images/baoduong1,2.png'
import ANh2 from '../../../assets/images/baoduong2,1.png'
import ANh3 from '../../../assets/images/BaoDuong2.2.jpg'
import ANh4 from '../../../assets/images/BaoDuong2.3.jpg'

// import userPic from '../user-one.png';

const Review = () => {
    const review = [
        {
            key: "1",
            name: 'Đặt hẹn dịch vụ trực tuyến',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            img: ANh1
        },
        {
            key: "2",
            name: 'Ưu đãi đặc biệt',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            img: ANh2
        },
        {
            key: "3",
            name: 'Bảo hành & Bảo hiểm',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            img: ANh3
        },
        {
            key: "4",
            name: 'Dịch vụ & bảo dưỡng',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            img: ANh4
        },
    ]
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 3500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <section className='testimonials'>
            <div id="testimonial" className=" pt-70 pb-70 pt-3" data-aos="fade-up"
                data-aos-duration="3000">

                <div className="container">
                    <h4 className="miniTitle text-left ml-5 mt-5">Tìm hiểu thêm</h4>
                    {/* <div className="text-center ">
                    <h3 className="sectionTitle">What Our Clients are Saying?</h3>
                </div>
                <p className="text-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p> */}
                    <div className="row">
                        <div className="col-md-12">
                            <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                                {
                                    review.length === 0 ?
                                        <div className="item">
                                            <div className="shadow-effect">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uty labore et dolore magna.</p>
                                            </div>
                                            <div className="testimonial-name">
                                                <h5>Rajon Rony</h5>
                                                <small>ITALY</small>
                                            </div>
                                        </div> :
                                        review.map(reviewDetails => {
                                            return (
                                                <ReviewItem reviewDetails={reviewDetails} key={reviewDetails.key} />
                                            )
                                        })
                                }
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Review;
