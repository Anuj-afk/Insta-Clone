import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SettingsPanel from "../components/settings.component";
import ProtectedRoute from "../components/ProtectedRoute.component";
import toast, { Toaster } from "react-hot-toast";
import { uploadImage } from "../common/aws";

export const profileDataStructure = {
    personal_info: {
        fullname: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info: {
        total_posts: 0,
        total_followers: 0,
        total_following: 0,
    },
};

function ProfilePage() {
    let [selectedNavbarButton, setSelectedNavbarButton] = useState("");
    let [settingsNavPanel, setSettingsNavPanel] = useState(false);
    let { id: profileId } = useParams();
    let [profile, setProfile] = useState(profileDataStructure);
    let [profileLoaded, setProfileLoaded] = useState(false);

    let {
        personal_info: {
            fullname,
            username: profile_username,
            profile_img,
            bio,
        },
        account_info: { total_posts, total_followers, total_following },
    } = profile;
    let {
        userAuth, userAuth: { username, accessToken }, setUserAuth,
    } = useContext(UserContext);

    const fetchUserProfile = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId,})
        .then(({ data: user }) => {
            setProfile(user);
            setProfileLoaded(true);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchUserProfile();
        if (profileLoaded) {
            resetState();
        }
    }, [profileId]);

    const resetState = () => {
        setProfile(profileDataStructure);
    };

    const handleSelectedNavbarButton = (buttonName) => {
        setSelectedNavbarButton(buttonName);
    };

    const profileNavbar = {
        display: "flex",
        flexDirection: "row",
        height: "50px",
        alignItems: "center",
        margin: "30px",
    };

    const handleSettingsPanel = () => {
        setSettingsNavPanel((currentVal) => !currentVal);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSettingsNavPanel(false);
        }, 200);
    };

    const handleImageUpload = (e) => {
        let img = e.target.files[0]
        if(img){
            let loadingToast = toast.loading("Uploading...");
            uploadImage(img, img.type).then((url) => {
                if(url){
                    toast.dismiss(loadingToast);
                    console.log("Uploading...");
                    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/profile_Image", { url }, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    })
                    .then((response) => {
                        toast.success("uploaded successfully");
                        setProfile({...profile, personal_info: {...profile.personal_info, profile_img: url}});
                        setUserAuth({...userAuth, profile_img: url});
                    })
                    .catch(err => {
                        console.log(err);
                        toast.dismiss(loadingToast);
                        return toast.error("Failed to upload photo. Please try again.");
                    })
                }
            })
            .catch(err => {
                console.log(err);
                toast.dismiss(loadingToast);
                return toast.error("Failed to upload photo. Please try again.");
            })
        }
    }

    let profileNavbarButtons = [
        {
            buttonImage: "fi fi-rr-grid",
            buttonName: "POSTS",
        },
        {
            buttonImage: "fi fi-tr-films",
            buttonName: "REELS",
        },
        {
            buttonImage: "fi fi-rr-bookmark",
            buttonName: "SAVED",
        },
    ];

    return (
        <ProtectedRoute>
            <Toaster></Toaster>
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
                        }}
                    >
                        <div style={{ height: "150px", width: "150px" }} className={"aspect-video " + (profile_username == username ? " hover:opacity-80" : "" ) }>
                            <label htmlFor="ProfileImg">
                                <img src={profile_img} style={{ borderRadius: 100, border: "2px solid black",  }} referrerPolicy="no-referrer" className="w-full mx-auto"/>
                                {
                                    profile_username == username ? 
                                    <input className={ profile_username == username ? "" : " hidden" } type="file" id="ProfileImg" style={{ display: "none" }} accept="image/*" onChange={handleImageUpload}></input>
                                    : 
                                    <>
                                    </>
                                }

                            </label>
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
                            
                            <Link to={"/accounts/edit"}
                                className={
                                    profile_username == username
                                        ? ""
                                        : " hidden"
                                }
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
                            </Link>
                            <div
                                className="relative"
                                onClick={handleSettingsPanel}
                                onBlur={handleBlur}
                            >
                                <button>
                                    <i
                                        className="fi fi-sr-settings mt-1"
                                        style={{ marginLeft: "400px" }}
                                    ></i>
                                </button>
                                {settingsNavPanel ? (
                                    <SettingsPanel></SettingsPanel>
                                ) : (
                                    ""
                                )}
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
                            <h1 style={{ marginLeft: "20px" }}>
                                {" "}
                                {total_followers} followers
                            </h1>
                            <h1 style={{ marginLeft: "20px" }}>
                                {" "}
                                {total_following} following
                            </h1>
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

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        style={{
                            height: "50px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                            fontSize: 13,
                        }}
                    >
                        {profileNavbarButtons.map((elements) => (
                            <button
                                key={elements.buttonName}
                                onClick={() =>
                                    handleSelectedNavbarButton(
                                        elements.buttonName
                                    )
                                }
                                style={{
                                    ...profileNavbar,
                                    borderTop:
                                        selectedNavbarButton ===
                                        elements.buttonName
                                            ? "2px solid white"
                                            : "none",
                                }}
                            >
                                <i className={`${elements.buttonImage}`}></i>
                                <h1 style={{ marginLeft: "7px" }}>
                                    {elements.buttonName}
                                </h1>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default ProfilePage;
