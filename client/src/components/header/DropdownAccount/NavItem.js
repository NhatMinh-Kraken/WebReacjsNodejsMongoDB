import React, { useState, useEffect, useRef } from 'react'



function NavItem(props) {

    const [open, setOpen] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (open && ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    });

    return (
        <>
            <button className='button-login mx-1' onClick={() => setOpen(!open)} ref={ref}>
                <i className="far fa-user"></i>
            </button>
            {open && props.children}
        </>
    );
}

export default NavItem