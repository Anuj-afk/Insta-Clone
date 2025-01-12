import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNavigation = ({ to = "/", className, image, text, children, onClick, src }) => {

    return (
        <>
            {text === "Create" ? (
                <button
                    className={"link " + className}
                    onClick={onClick}
                >
                    <i className={"text-white translate-y-[1px] text-[20px] " + image}></i>
                    <p
                        className={`text-xl -translate-y-[1px] max-md:hidden ml-2`}
                    >
                        {text}
                    </p>
                </button>
            ) : (
                <Link
                    to={to}
                    className={"link " + className}
                >
                    {src ? (
                        <img
                            className="w-6 h-6 rounded-full translate-y-[1px] z-10"
                            src={src}
                            alt={text}
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <i className={"text-white translate-y-[1px] text-[20px] " + image}></i>
                    )}
                    <p
                        className={`text-xl -translate-y-[1px] max-md:hidden ml-2`}
                    >
                        {text}
                    </p>
                </Link>
            )}
            {children}
        </>
    );
};

export default SideNavigation;
