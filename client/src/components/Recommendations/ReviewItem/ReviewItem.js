import React from 'react';
import './ReviewItem.scss'

const ReviewItem = ({reviewDetails}) => {

    const {name, address, description, img} = reviewDetails;
    return (
        <div className='item'>
            <div className='shadow-effect'>
                <img src={img} className="img-circle"/>
                <p>{description}</p>
            </div>
            <div className='testimonial-name'>
                <h5>{name}</h5>
                <small>{address}</small>
            </div>
        </div>
    );
}

export default ReviewItem;
