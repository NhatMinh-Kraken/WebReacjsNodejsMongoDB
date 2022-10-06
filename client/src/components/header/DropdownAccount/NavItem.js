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
    }, [open]);

    return (
        <ul className='right-header-login' ref={ref}>
            <button className='button-login mx-1' onClick={() => setOpen((prev) => !prev)} >
                <i className="far fa-user"></i>
            </button>
            {open && props.children}
        </ul>
    );
}

export default NavItem