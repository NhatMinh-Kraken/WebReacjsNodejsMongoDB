import NavMenuItems from "./NavMenuItems";
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <div className={`dropdownn ${dropdownClass} ${dropdown ? "show" : ""}`}>
      <div className="menu">
        {submenus.map((submenu, index) => (
          <NavMenuItems items={submenu} key={index} depthLevel={depthLevel} />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
