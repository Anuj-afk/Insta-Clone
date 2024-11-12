import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"; // Example using react-icons
import AnimationWrapper from "../common/page.animation";

const Navbar = () => {
    const [isMedium, setIsMedium] = useState(window.innerWidth <= 768);
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth <= 640)
            setIsMedium(window.innerWidth <= 768)
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AnimationWrapper>
            {isSmall ? (
                <div className="flex h-screen flex-col bg-black">
                    <div className="border-b border-dark-grey h-16 flex flex-row ">
                        <Link
                            to="/"
                            className="font-billabong text-white text-3xl ml-4 absolute mt-2"
                        >
                            <h1>Instagram</h1>
                        </Link>
                        <div className="ml-auto mr-4 opacity-3 my-auto h-8 z-20">
                            <i className="fi fi-rr-search pointer-events-none text-white absolute translate-y-[6px] translate-x-[6px] text-xl"></i>
                            <input type="text" placeholder="Search" className=" bg-dark-grey rounded-md placeholder:text-white placeholder:ml-8 pl-8 my-auto h-8"/>
                        </div>

                        <Link
                            className="link my-auto mr-4"
                        >
                            <i class="fi fi-rr-heart"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Notification</p>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-black items-center flex justify-center">
                        <Outlet />
                    </div>
                    <div className="bg-black sticky flex text-white border-t border-dark-grey min-w-fit max-sm:flex-row duration-300  h-16 justify-around">

                        <Link
                            className="link"
                        >
                            <i className="fi fi-rr-house-blank"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Home</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-search"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Search</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-tr-compass-alt"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Explore</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-tr-films"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Reels</p>
                        </Link>
   
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-square-plus"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Create</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-user"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Profile</p>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex h-screen flex-row">
                    {/* Navbar */}
                    <div className="bg-black sticky flex flex-col gap-8 text-white w-[20rem] border-r border-dark-grey max-md:w-[4rem] max-sm:flex-row duration-300 max-sm:w-full max-sm:h-[5rem]">
                        <Link
                            to="/"
                            className="text-3xl px-4 font-billabong mt-12 justify-center translate-x-1"
                        >
                            {isMedium ? (
                                <i class="fi fi-brands-instagram"></i>
                            ) : (
                                <h1 className="text-3xl ml-4">Instagram</h1>
                            )}
                        </Link>
                        <Link
                            to="/"
                            className="link mt-12"
                        >
                            <i className="fi fi-rr-house-blank"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Home</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-search"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Search</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-tr-compass-alt"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Compass</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-tr-films"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Reels</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-heart"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Notification</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-square-plus"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Create</p>
                        </Link>
                        <Link
                            className="link"
                        >
                            <i class="fi fi-rr-user"></i>
                            <p className="text-2xl -translate-y-1 max-md:hidden">Profile</p>
                        </Link>
                        <div className="flex flex-col gap-10 mt-auto">
                            <Link
                                className="link"
                            >
                                <i class="fi fi-rr-at"></i>
                                <p className="text-2xl -translate-y-1 max-md:hidden">Threads</p>
                            </Link>
                            <Link
                                className="link"
                            >
                                <i class="fi fi-rr-menu-burger"></i>
                                <p className="text-2xl -translate-y-1 max-md:hidden">More</p>
                            </Link>
                        </div>
                    </div>

                    {/* Outlet (Content Area) */}
                    <div className="flex-1 overflow-y-auto bg-black items-center flex justify-center">
                        <Outlet />
                    </div>
                </div>
            )}
        </AnimationWrapper>
    );
};

export default Navbar;
