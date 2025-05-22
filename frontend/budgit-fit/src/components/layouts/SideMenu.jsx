
import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu, onClose }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
        if (onClose) onClose(); // menu band karne ka kaam
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
        if (onClose) onClose(); // logout ke baad bhi menu band
    };

    return (
        <div className="side-menu-wrapper">
            <div className="user-section">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl}
                        alt="Profile"
                        className="user-avatar"
                    />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}
                <h5 className="user-name">{user?.fullName || ''}</h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`menu-button ${activeMenu === item.label ? 'active' : ''}`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="menu-icon" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;

