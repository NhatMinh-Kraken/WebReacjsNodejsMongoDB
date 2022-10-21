import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

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
            <button type="button" className={dropdown ? "text-title active" : "text-title"}>{items.title}{""}</button>
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
          <button type="button" className="text-title">{items.title}</button>
        </>
      )}
    </div >
  );
};

export default NavMenuItems
