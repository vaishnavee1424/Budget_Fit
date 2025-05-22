import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
import './Navbar.css';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="navbar-container">
            <button
                className="menu-button-n"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="icon" />
                ) : (
                    <HiOutlineMenu className="icon" />
                )}
            </button>

            <h2 className="title">Budget-Fit</h2>

            {openSideMenu && (
                <div className="side-menu-container">
                    <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
