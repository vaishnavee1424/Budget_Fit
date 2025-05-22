
import React, { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from "react-icons/lu";
import './EmojiPickerPopup.css'; // Importing the external CSS file

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="emoji-picker-container">
            <div onClick={() => setIsOpen(true)}>
                <div className="icon-selector flex items-center gap-4 cursor-pointer">
                    {icon ? (
                        <img src={icon} alt="Icon" className="icon-image" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className="icon-text w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {isOpen && (
                <div className="emoji-popup-container relative">
                    <button
                        className="close-button w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                    <EmojiPicker open={isOpen} onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")} />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
