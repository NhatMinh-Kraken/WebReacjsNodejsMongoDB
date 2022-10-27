import React from 'react';
import './ReviewItem.scss'

const ReviewItem = ({reviewDetails}) => {

    const {name, description, img} = reviewDetails;
    return (
        <div className='item'>
            <div className='shadow-effect'>
                <img src={img} className="img-circle"/>
                <p>{description}</p>
            </div>
            <div className='testimonial-name'>
                <h5>{name}</h5>
            </div>
        </div>
    );
}

export default ReviewItem;
