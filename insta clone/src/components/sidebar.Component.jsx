import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet } from "react-router-dom"; // Example using react-icons
import AnimationWrapper from "../common/page.animation";
import SideNavigation from "./sidebar.navigation.component";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import { uploadImage } from "../common/aws";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

const postStructure = {
    des: "",
    likes_hide: false,
    comment_hide: false,
    link: "",
}

const Navbar = () => {
    
    const [isCheckedLike, setIsCheckedLike] = useState(false)
    const [isCheckedComm, setIsCheckedComm] = useState(false)
    const [isMedium, setIsMedium] = useState(window.innerWidth <= 768);
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 640);
    const [createPopUp,setCreatePopUp] = useState(false)
    const [newBanner, setNewBanner] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newBannerDescription, setNewBannerDescription] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [post, setPost] = useState(postStructure);
    let {des, likes_hide, comment_hide, link} = post
    const {userAuth, userAuth: {profile_img, username, accessToken}} = useContext(UserContext);

    const handleEmojiSelect = (emojiData) => {
        setNewBannerDescription(newBannerDescription + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handlenewBanner = (event) => {
        event.preventDefault();
        const img = event.target.files[0];
        setNewBanner(img);
        if (img) {
        setPreviewUrl(URL.createObjectURL(img));
        }
    };

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

    const closePopup = () => {
        setCreatePopUp(false);
        setPreviewUrl(null);
        setNewBanner(null);

    };

    const handleDiscriptionChange = (event) => {
        setPost({...post, des: event.target.value});
        setNewBannerDescription(event.target.value);
    };

    const handleUpload = () => {
        if(newBanner){
            let loadingToast = toast.loading("Uploading ...")
            uploadImage(newBanner).then((url) => {
                if(url){
                    toast.dismiss(loadingToast);
                    toast.success("uploaded successfully");
                    PublishPost(url);
                    clearState();
                }
            })
            .catch(err => {
                console.log(err);
                toast.dismiss(loadingToast);
                return toast.error("Failed to upload photo. Please try again.");
                
            })
        }
        else{
            toast.error("Please select a photo to upload.");
            return;
        }
    }

    const clearState=()=>{
        setCreatePopUp(false)
        setNewBannerDescription('')
        setPreviewUrl(null)
        setNewBanner(null)
        setPost(postStructure)
        setPreviewUrl(null)
        setIsCheckedComm(false);
        setIsCheckedLike(false);
    }

    const PublishPost = (url) => {
        if(!des.length){
            return toast.error("Add a Des to Publish")
        }
        let postObj = {
            des, likes_hide, comment_hide, link: url
        }
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/post", postObj, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }

    const handleHideLikes = (e) => {
        setIsCheckedLike((prev) => !prev);
        setPost({...post, likes_hide:!likes_hide});
    }

    const handleTurnOffCommenting = (e) => {
        setIsCheckedComm((prev) => !prev);
        setPost({...post, comment_hide:!comment_hide});
    }

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
                    <div className="bg-black min-h-full fixed flex flex-col gap-4 text-white w-[15rem] border-r border-dark-grey max-md:w-[4rem] max-sm:flex-row duration-300 max-sm:w-full max-sm:h-[5rem]">
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
                            to={`profile/${username}`}
                            src={profile_img}
                            text="Profile"
                            image={"rounded-full w-32 h-32 z-10"}
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
                onClose={closePopup}
                modal
                nested
                contentStyle={{
                    backgroundColor: "#262626",
                    height: "530px",
                    width: previewUrl ? "830px" : "490px",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    padding: 0,
                    borderWidth: "0px",
                    overflow: "hidden",
                }}
            >
                {previewUrl ? (
                    <div>
                        {/* Preview Section */}
                        <div
                            style={{
                                width: "830px",
                                height: "50px",
                                backgroundColor: "black",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                color: "white",
                                fontWeight: "bold",
                                borderBottom: "1px solid #333333",
                            }}
                        >
                            <button
                                onClick={() => {
                                    setPreviewUrl(null);
                                    setNewBanner(null);
                                }}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <i
                                    className="fi fi-rr-arrow-small-left"
                                    style={{ fontSize: 30, marginLeft: "10px" }}
                                ></i>
                            </button>
                            <h1>Create new post</h1>
                            <button onClick={handleUpload}>
                                <h1
                                    style={{
                                        color: "#0095F6",
                                        marginRight: "10px",
                                    }}
                                >
                                    Next
                                </h1>
                            </button>
                        </div>

                        <div
                            style={{
                                width: "830px",
                                backgroundColor: "white",
                                height: "480px",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                style={{
                                    width: "490px",
                                    height: "480px",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    backgroundColor: "black",
                                    overflow: "hidden",
                                }}
                            >
                                {newBanner.type.startsWith("image/") ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            minWidth: "100%",
                                            Height: "100%",
                                        }}
                                    />
                                ) : (
                                    <video
                                        controls
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    >
                                        <source
                                            src={previewUrl}
                                            type={newBanner.type}
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                )}
                            </div>

                            <div
                                style={{
                                    width: "340px",
                                    height: "480px",
                                    backgroundColor: "#262626",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <textarea
                                    rows="6"
                                    value={newBannerDescription}
                                    onChange={handleDiscriptionChange}
                                    style={{
                                        maxHeight: "170px",
                                        minHeight: "170px",
                                        width: "322px",
                                        backgroundColor: "#262626",
                                        marginTop: "7px",
                                        padding: "5px",
                                        color: "white",
                                        border: "0px",
                                        resize: "none",
                                    }}
                                ></textarea>
                                <div
                                    style={{
                                        height: "50px",
                                        width: "322px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            setShowEmojiPicker(!showEmojiPicker)
                                        }
                                    >
                                        <i
                                            className="fi fi-rr-smile"
                                            style={{
                                                color: "gray",
                                                fontSize: 20,
                                                marginLeft: "10px",
                                            }}
                                        ></i>
                                    </button>
                                    <h1
                                        style={{
                                            color: "gray",
                                            fontSize: 13,
                                            marginRight: "10px",
                                        }}
                                    >{`${newBannerDescription.length}/2200`}</h1>
                                </div>
                                <EmojiPicker
                                    open={showEmojiPicker}
                                    onEmojiClick={handleEmojiSelect}
                                    style={{
                                        zIndex: 20,
                                        width: "320px",
                                        height: "250px",
                                    }}
                                    searchDisabled
                                    skinTonesDisabled
                                    theme="dark"
                                    previewConfig={{ showPreview: false }}
                                />
                                <div
                                    style={{
                                        width: "290px",
                                        height: "40px",
                                        color: "white",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: "10px",
                                    }}
                                >
                                    <h1 style={{ color: "darkgray" }}>
                                        Hide Likes
                                    </h1>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        style={{ marginBottom: "20px" }}
                                        checked={isCheckedLike}
                                        onClick={handleHideLikes}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "290px",
                                        height: "40px",
                                        color: "white",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h1 style={{ color: "darkgray" }}>
                                        Turn off Commenting
                                    </h1>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        style={{ marginBottom: "20px" }}
                                        checked={isCheckedComm}
                                        onClick={handleTurnOffCommenting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                htmlFor="fileInput"
                                style={{
                                    cursor: "pointer",
                                    padding: "5px 15px",
                                    backgroundColor: "#0095F6",
                                    color: "white",
                                    borderRadius: 8,
                                    marginTop: 20,
                                }}
                            >
                                Select From Device
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                onChange={handlenewBanner}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                )}
            </Popup>
        </AnimationWrapper>
    );
};

export default Navbar;

// accept = ".png .jpg .jpeg .mp3 .mp4 .gif";
