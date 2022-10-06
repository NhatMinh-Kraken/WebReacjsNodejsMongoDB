import React from 'react';

function Navbar(props) {
    return (
        <div className='right-header'>
            {props.children}
        </div>
    );
}

export default Navbar
