import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import toast, { Toaster } from "react-hot-toast";
import { uploadImage } from "../common/aws";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { UserContext } from "../App";
import { Postrefrence } from "./sidebar.Component";

const postStructure = {
    des: "",
    likes_hide: false,
    comment_hide: false,
    link: "",
};
const Postpopup = () => {
    const [isCheckedComm, setIsCheckedComm] = useState(false);
    const [isCheckedLike, setIsCheckedLike] = useState(false);
    const [newBanner, setNewBanner] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newBannerDescription, setNewBannerDescription] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [post, setPost] = useState(postStructure);

    const {
        userAuth: { accessToken },
    } = useContext(UserContext);

    const {createPopUp, setCreatePopUp} = useContext(Postrefrence);

    let { des, likes_hide, comment_hide, link } = post;
    const handleHideLikes = (e) => {
        setIsCheckedLike((prev) => !prev);
        setPost({ ...post, likes_hide: !likes_hide });
    };

    const handleTurnOffCommenting = (e) => {
        setIsCheckedComm((prev) => !prev);
        setPost({ ...post, comment_hide: !comment_hide });
    };

    const closePopup = () => {
        setCreatePopUp(false);
        setPreviewUrl(null);
        setNewBanner(null);
    };

    const clearState = () => {
        setCreatePopUp(false);
        setNewBannerDescription("");
        setPreviewUrl(null);
        setNewBanner(null);
        setPost(postStructure);
        setPreviewUrl(null);
        setIsCheckedComm(false);
        setIsCheckedLike(false);
    };

    const PublishPost = (url) => {
        if (!des.length) {
            return toast.error("Add a Des to Publish");
        }
        let postObj = {
            des,
            likes_hide,
            comment_hide,
            link: url,
        };
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/post", postObj, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

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

    const handleDiscriptionChange = (event) => {
        setPost({ ...post, des: event.target.value });
        setNewBannerDescription(event.target.value);
    };

    const handleUpload = () => {
        if (newBanner) {
            let loadingToast = toast.loading("Uploading ...");
            uploadImage(newBanner, newBanner.type)
                .then((url) => {
                    if (url) {
                        toast.dismiss(loadingToast);
                        toast.success("uploaded successfully");
                        PublishPost(url);
                        clearState();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.dismiss(loadingToast);
                    return toast.error(
                        "Failed to upload photo. Please try again."
                    );
                });
        } else {
            toast.error("Please select a photo to upload.");
            return;
        }
    };

    return (
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
                                {console.log(newBanner)}
                                {console.log(previewUrl)}
                                {console.log(
                                    newBanner.type.startsWith("image/")
                                )}
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
                                            type="video/mp4"
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
    );
};

export default Postpopup;
