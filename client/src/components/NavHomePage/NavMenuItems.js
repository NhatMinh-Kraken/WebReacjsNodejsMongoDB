import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom"

const NavMenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <div
      className="NavHomePage-Item"
      ref={ref}
    // onMouseEnter={onMouseEnter}
    // onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            className={dropdown ? "NavHomePage-Item-Button active" : "NavHomePage-Item-Button"}
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            <i className={items.icon} aria-hidden="true"></i>
            <div type="button" className={dropdown ? "text-title active" : "text-title"}>{items.title}{""}</div>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <>
          <Link to={items.link} className="text-title text-black">{items.title}</Link>
        </>
      )}
    </div >
  );
};

export default NavMenuItems
