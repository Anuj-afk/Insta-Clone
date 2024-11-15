import React from "react";
import { Link } from "react-router-dom";

const SideNavigation = ({to = "/", className, image, text, children, onClick}) => {

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
                <i className={image}></i>
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