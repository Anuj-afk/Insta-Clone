import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet } from "react-router-dom"; // Example using react-icons
import AnimationWrapper from "../common/page.animation";
import SideNavigation from "./sidebar.navigation.component";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { UserContext } from "../App";

const Navbar = () => {

    const [isMedium, setIsMedium] = useState(window.innerWidth <= 768);
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 640);
    const [createPopUp,setCreatePopUp] = useState(false)
    const [newPost, setNewPost] = useState(null);

    const {userAuth, userAuth: {profile_img}} = useContext(UserContext);

    const handleNewPost = (event) => {
    const selectedFile = event.target.files[0];
    setNewPost(selectedFile);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth <= 640)
            setIsMedium(window.innerWidth <= 768)
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCreate=()=>{
        setCreatePopUp(true)
    }

    useEffect(() => {
        console.log(profile_img)
    }, [])

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
                            <input
                                type="text"
                                placeholder="Search"
                                className=" bg-dark-grey rounded-md placeholder:text-white placeholder:ml-8 pl-8 my-auto h-8"
                            />
                        </div>
                        <SideNavigation
                            to="/Notification"
                            className="my-auto mr-4"
                            image="fi fi-rr-heart"
                            text="Notification"
                        ></SideNavigation>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-black items-center flex justify-center">
                        <Outlet />
                    </div>
                    <div className="bg-black sticky flex text-white border-t border-dark-grey min-w-fit max-sm:flex-row duration-300  h-16 justify-around">
                        <SideNavigation
                            to="/"
                            image="fi fi-rr-house-blank"
                            text="Home"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Search"
                            image="fi fi-rr-search"
                            text="Search"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Explore"
                            image="fi fi-tr-compass-alt"
                            text="Explore"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Reels"
                            image="fi fi-tr-films"
                            text="Reels"
                        ></SideNavigation>
                        <SideNavigation
                            image="fi fi-rr-square-plus"
                            text="Create"
                            onClick={handleCreate}
                        ></SideNavigation>
                        <SideNavigation
                            to="profile"
                            image="fi fi-rr-user"
                            text="Profile"
                        ></SideNavigation>
                    </div>
                </div>
            ) : (
                <div className="flex min-h-screen flex-row">
                    {/* Navbar */}
                    <div className="bg-black sticky flex flex-col gap-4 text-white w-[15rem] border-r border-dark-grey max-md:w-[4rem] max-sm:flex-row duration-300 max-sm:w-full max-sm:h-[5rem]">
                        <Link
                            to="/"
                            className="text-3xl px-4 font-billabong mt-12 justify-center "
                        >
                            {isMedium ? (
                                <i className="fi fi-brands-instagram -translate-x-1"></i>
                            ) : (
                                <h1 className="text-3xl ml-4">Instagram</h1>
                            )}
                        </Link>
                        <SideNavigation
                            to="/"
                            className="mt-12"
                            image="fi fi-rr-house-blank"
                            text="Home"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Search"
                            image="fi fi-rr-search"
                            text="Search"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Explore"
                            image="fi fi-tr-compass-alt"
                            text="Explore"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Reels"
                            image="fi fi-tr-films"
                            text="Reels"
                        ></SideNavigation>
                        <SideNavigation
                            to="/Notification"
                            image="fi fi-rr-heart"
                            text="Notification"
                        ></SideNavigation>
                        <SideNavigation
                            image="fi fi-rr-square-plus"
                            text="Create"
                            onClick={handleCreate}
                        ></SideNavigation>
                        <SideNavigation
                            // to={`profile/${username}`}
                            image="fi fi-rr-user"
                            text="Profile"
                        ></SideNavigation>
                        <div className="flex flex-col gap-6 mt-auto">
                            <SideNavigation
                                to="/Threads"
                                image="fi fi-rr-at"
                                text="Threads"
                            ></SideNavigation>
                            <SideNavigation
                                to="/More"
                                image="fi fi-rr-menu-burger"
                                text="More"
                            ></SideNavigation>
                        </div>
                    </div>

                    {/* Outlet (Content Area) */}
                    <div className="flex-1 overflow-y-auto flex bg-black  justify-center">
                        <Outlet />
                    </div>
                </div>
            )}
            <Popup
                open={createPopUp}
                onClose={() => {
                    setCreatePopUp(false);
                }}
                modal
                nested
                contentStyle={{
                    backgroundColor: "#262626",
                    height: "530px",
                    width: "490px",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    padding: 0,
                    borderWidth: "0px",
                    overflow: "hidden",
                }}
            >
                <div>
                    <div
                        style={{
                            width: "490px",
                            height: "50px",
                            backgroundColor: "black",
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "bold",
                            borderBottom: "1px solid #333333",
                        }}
                    >
                        <h1>Create new post</h1>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: "485px",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <i
                            className="fi fi-rr-gallery"
                            style={{ fontSize: 70 }}
                        ></i>
                        <h1>Drag photos and videos here</h1>
                        <label
                            htmlFor="file-input"
                            style={{
                                cursor: "pointer",
                                padding: "5px 15px",
                                backgroundColor: "#0095F6",
                                color: "white",
                                borderRadius: 8,
                                marginTop: 20,
                            }}
                        >
                            Select File From Device
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            onChange={handleNewPost}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </Popup>
        </AnimationWrapper>
    );
};

export default Navbar;
