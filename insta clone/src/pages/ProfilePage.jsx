import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import SettingsPanel from "../components/settings.component";

export const profileDataStructure = {
    personal_info:{
        fullname: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info:{
        total_posts: 0,
        total_followers: 0,
        total_following: 0,
    }
}

function ProfilePage() {
    let [selectPosts, setSelectPosts] = useState(true);
    let [selectReels, setSelectReels] = useState(false);
    let [selectSaved, setSelectSaved] = useState(false);
    let [settingsNavPanel, setSettingsNavPanel] = useState(false)
    let {id: profileId} = useParams();
    let [profile, setProfile] = useState(profileDataStructure)
    let [profileLoaded, setProfileLoaded] = useState(false);

    let {personal_info: {fullname, username: profile_username, profile_img, bio}, account_info: {total_posts, total_followers, total_following}} = profile

    let {userAuth: {username}} = useContext(UserContext)

    const fetchUserProfile = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {username: profileId})
        .then(({data: user}) => {
            setProfile(user);
            setProfileLoaded(true)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchUserProfile();
        if(profileLoaded){
            resetState();
        }
    }, [profileId])

    const resetState = () => {
        setSelectPosts(true);
        setSelectReels(false);
        setSelectSaved(false);
        setProfile(profileDataStructure);
    }

    const handlePostsSelect = () => {
        setSelectPosts(true);
        setSelectReels(false);
        setSelectSaved(false);
    };

    const handleReelsSelect = () => {
        setSelectPosts(false);
        setSelectReels(true);
        setSelectSaved(false);
    };

    const handleSavedSelect = () => {
        setSelectPosts(false);
        setSelectReels(false);
        setSelectSaved(true);
    };

    const handleSettingsPanel = () => {
        setSettingsNavPanel(currentVal => !currentVal);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setSettingsNavPanel(false);
        }, 200)
    }

    return (
        <div>
            <div
                style={{
                    height: "235px",
                    width: "900px",
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "40px",
                    borderBottom: "1px solid #333333",
                }}
            >
                {/* profile pic */}
                <div
                    style={{
                        height: "235px",
                        width: "283px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ height: "150px", width: "150px" }}>
                        <img
                            src={profile_img}
                            style={{
                                borderRadius: 100,
                                border: "2px solid black",
                            }}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                {/* details */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "5px",
                            color: "white",
                            fontWeight: "500",
                        }}
                    >
                        <h1 style={{ fontSize: 18 }}>{profile_username}</h1>

                        <button
                            className={(profile_username == username ? "" : " hidden") }
                            style={{
                                whiteSpace: "nowrap",
                                backgroundColor: "#424242",
                                marginLeft: "15px",
                                paddingLeft: "15px",
                                paddingRight: "15px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                color: "white",
                                borderRadius: 8,
                                fontWeight: 500,
                                fontSize: 14,
                            }}
                        >
                            <h1>Edit Profile</h1>
                        </button>
                        <div className="relative" onClick={handleSettingsPanel} onBlur={handleBlur}>
                            <button>
                                <i
                                    className="fi fi-sr-settings mt-1"
                                    style={{ marginLeft: "400px" }}
                                ></i>
                            </button>
                            {
                                settingsNavPanel? <SettingsPanel></SettingsPanel> : ""
                            }
                        </div>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            color: "white",
                            marginTop: "20px",
                            fontWeight: 500,
                        }}
                    >
                        <h1> {total_posts} posts </h1>
                        <h1 style={{ marginLeft: "20px" }}> {total_followers} followers</h1>
                        <h1 style={{ marginLeft: "20px" }}> {total_following} following</h1>
                    </div>

                    <h1
                        style={{
                            fontSize: 18,
                            color: "white",
                            fontWeight: 500,
                            marginTop: "18px",
                        }}
                    >
                        {fullname}
                    </h1>

                    <div
                        style={{
                            color: "white",
                            height: "auto",
                            width: "550px",
                            marginTop: "18px",
                            borderRadius: "5px",
                        }}
                    >
                        <p
                            style={{
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                                fontSize: 12,
                            }}
                        >
                            {bio}
                        </p>
                    </div>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:'center'}}>
                <div
                    style={{
                        height: "50px",
                        width: "300px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        fontSize: 13,
                    }}
                >
                    <button
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderTop: selectPosts ? "2px solid white" : "none",
                            height: "50px",
                            alignItems: "center",
                        }}
                        onClick={handlePostsSelect}
                    >
                        <i className="fi fi-rr-grid"></i>
                        <h1 style={{ marginLeft: "7px" }}>POSTS</h1>
                    </button>
                    <button
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            borderTop: selectReels ? "2px solid white" : "none",
                            height: "50px",
                            alignItems: "center",
                        }}
                        onClick={handleReelsSelect}
                    >
                        <i className="fi fi-tr-films"></i>
                        <h1 style={{ marginLeft: "7px" }}>REELS</h1>
                    </button>
                    <button
                        className={(profile_username == username ? "" : " hidden") + " flex flex-row " + (selectSaved ? " border-t-2 border-white ": "") +" h-[50px] items-center"}
                        onClick={handleSavedSelect}
                    >
                        <i className={"fi fi-rr-bookmark "}></i>
                        <h1 style={{ marginLeft: "7px" }}>SAVED</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
