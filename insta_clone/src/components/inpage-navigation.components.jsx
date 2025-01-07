import React, { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({routes, defaultHidden=[], defaultActiveIndex = 0, children}) => {

    activeTabLineRef = useRef();
    activeTabRef = useRef();
    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

    const changePageState = (btn, i) => {

        let {offsetWidth, offsetLeft} = btn
        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";
        setInPageNavIndex(i);
    }

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex)
    }, [])

    return (
        <>
            <div className="relative mb-auto flex flex-nowrap gap-8 w-18 justify-center">
                {
                    routes.map((route, i) => {
                            return(
                                <button ref={i == defaultActiveIndex?activeTabRef:null} key={i} className={"py-4 text-sm capitalize " + (inPageNavIndex==i?"text-white ":"text-dark-grey ")+(defaultHidden.includes(route)?"md:hidden":"")} onClick={(e) => {changePageState(e.target, i)}}>
                                    <i className={(route.image) + " text-white pr-2 text-[10px] pointer-events-none"}></i>
                                    <span className="pointer-events-none">{route.name}</span>
                                </button>

                            )
                    })
                }

                <hr ref={activeTabLineRef} className="absolute top-0 w border border-white duration-300 z-10"/>

            </div>
            {
                Array.isArray(children) ? children[inPageNavIndex]:children 
            }
        </>
    )
}

export default InPageNavigation;