import React from "react";
import { getInitials } from "../../utils/helper";
import './CharAvatar.css';

const CharAvatar = ({ fullName, width, height, style }) => {
    return (
        <div
            className={`
                avatar 
                ${width || "w-12"} 
                ${height || "h-12"} 
                ${style || "text-xl text-gray-700"}
            `}
        >
            {getInitials(fullName || "")}
        </div>
    );
};

export default CharAvatar;
