import React from 'react'
import logoUser from '../../../../../../assets/images/user.png'

function InfOnlineUser({ infUser }) {
    return (
        <>
            <div className={`messOnline-infor`}>
                <div className='messOnline-all-infor-img'>
                    <img src={infUser.avatar ? infUser.avatar : logoUser} alt='user' className='img-all-infor' />
                    <span className='active-note'></span>
                </div>
                <div className='messOnline-all-infor-name'>
                    <p>{infUser.name}</p>
                </div>
            </div>
            <div className='messOnline-all-infor-new'>
                <p>{infUser.email}</p>
            </div>
        </>
    )
}

export default InfOnlineUser