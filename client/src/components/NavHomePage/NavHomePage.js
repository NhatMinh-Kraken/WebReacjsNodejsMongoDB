import "./NavHomePage.scss";
import React from "react";
import NavMenuItems from './NavMenuItems';
import { menuItem } from "./menuItem";

function NavHomePage() {
    return (
        <div className="NavHomePage">
            <div className="container">
                <div className="NavHomePage-Body">
                    {menuItem.map((menu, index) => {
                        const depthLevel = 0;
                        return <NavMenuItems items={menu} key={index} depthLevel={depthLevel} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default NavHomePage;