import React from "react";

type Props = {
    children: React.ReactNode;
    handleClick: () => void;
    disabled?: boolean;
};

const GradientButton = ({ children, handleClick, disabled }: Props) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-800 ${
                disabled
                    ? "cursor-not-allowed opacity-50"
                    : "group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white"
            }`}
        >
            <span
                className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-neutral-800 rounded-md ${
                    disabled ? "" : "group-hover:bg-opacity-0"
                } flex gap-2 items-center`}
            >
                {children}
            </span>
        </button>
    );
};

export default GradientButton;
