import React from 'react';

function Navbar(props) {
    return (
        <div className='right-header'>
            <ul className='right-header-login'>
                {props.children}
            </ul>
        </div>
    );
}

export default Navbar
