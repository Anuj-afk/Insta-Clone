import React from "react";
import { Link } from "react-router-dom";

const SideNavigation = ({to = "/", className, image, text, children, onClick, src}) => {

    return(
        <>
            {
                text == "Create" ?
                <button
                className={"link " + (className)}
                onClick={onClick}

                >
                    <i className={image}></i>
                    <p className="text-2xl -translate-y-1 max-md:hidden">{text}</p>
                </button>
                :
            <Link
                to={to}
                className={"link " + (className)}

            >
                {
                    src?
                    <img className="w-8 h-8 rounded-full -translate-y-1 -translate-x-1" src={src} alt={text} referrerPolicy="no-referrer" />
                    :
                    <i className={image}></i>
                }
                <p className="text-2xl -translate-y-1 max-md:hidden">{text}</p>
            </Link>
            }
            {
                children
            }
        </>

    )
}

export default SideNavigation;