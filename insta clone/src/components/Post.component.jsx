import React, { useContext, useEffect, useState } from "react";
import CommentPopup from "./CommentPopup.component";
import { latestPostContext } from "../pages/homePage";
import axios from "axios";

function Post({profile_img ,username ,link ,des ,total_likes ,likes_hide, comment_hide, post_id, id}) {
    const [likeIcon, setLikeIcon] = useState("fi fi-rs-heart");
    const [saveIcon, setSaveIcon] = useState("fi fi-rr-bookmark");
    // const [isVerified, setIsVerified] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    const [openComments, setOpenComments] = useState(false)

    let  {latestPost, setLatestPost, } = useContext(latestPostContext)
    // latestPost:  {results: {activity: {total_likes, total_views}, author: {personal_info: {fullname, profile_img, username}}, des, link, post_id, likes_hide, comment_hide}}

    const icon = {
        fontSize: 25,
        color: "white",
    };

    const handleLike = (postIndex) => {
        // Toggle the like icon
        const newLikeIcon = likeIcon === "fi fi-rs-heart" ? "fi fi-sr-heart" : "fi fi-rs-heart";
        setLikeIcon(newLikeIcon);
    
        // Update the latestPost state immutably
        setLatestPost(prevPost => {
            const updatedResults = [...prevPost.results]; // Make a copy of the results array
            const post = updatedResults[postIndex]; // Get the post to update
            
            if(newLikeIcon === "fi fi-sr-heart"){

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like", {post_id: post_id, val: 1})
                .then(
                    post.activity.total_likes = post.activity.total_likes + 1
                )
                .catch(err => {
                    console.log(err);
                })
            }
            else{
                post.activity.total_likes = post.activity.total_likes -1
            }
            // Increment or decrement the likes based on the new like icon
            // post.activity.total_likes = newLikeIcon === "fi fi-sr-heart" 
            //     ? 
            //     post.activity.total_likes + 1 
            //     : 
            //     post.activity.total_likes - 1;
    
            return {
                ...prevPost, // Keep other properties of latestPost intact
                results: updatedResults
            };
        });
    
        
        // Update the like counter
        // setLikeCounter(prevLikes => prevLikes + (newLikeIcon === "fi fi-sr-heart" ? 1 : -1));
    };

    const toggleCommentPopup = () => {
        setOpenComments(!openComments)
    }

    const handleSave = () => {
        if (saveIcon === "fi fi-rr-bookmark") {
            setSaveIcon("fi fi-sr-bookmark");
        } else {
            setSaveIcon("fi fi-rr-bookmark");
        }
    };

    return (
        <div>
            <div
                className="card mb-3 max-w-[490px]"
                style={{ borderBottom: "0.5px solid darkgray" }}
            >
                <div
                    className="card-header bg-transparent border-light"
                    style={{
                        height: "50px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                            className="profile-pic border-light"
                            src={profile_img}
                            style={{
                                height: "38px",
                                width: "38px",
                                borderRadius: "50px",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "solid",
                            }}
                            alt="..."
                        />
                        <h1
                            style={{
                                fontSize: 16,
                                marginLeft: 8,
                                marginTop: 7,
                                fontWeight: "400",
                                color: "white",
                            }}
                        >
                            {username}
                        </h1>
                    </div>
                    <button>
                        <h1 style={{ color: "white", fontWeight: "bold" }}>
                            ...
                        </h1>
                    </button>
                </div>

                <img
                    src={link}
                    className="card-img-top"
                    alt="..."
                    style={{ width: "490px" ,border:'1px solid gray'}}
                />
                <div className="card-footer bg-transparent border-light">
                    <div
                        style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                width: "110px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <button onClick={() => handleLike(id)} className={(likes_hide? " hidden ": "")}>
                                <i className={likeIcon} style={icon}></i>
                            </button>
                            <button>
                                <i
                                    className="fi fi-rr-share-square"
                                    style={icon}
                                ></i>
                            </button>
                            <button onClick={toggleCommentPopup} className={(comment_hide? " hidden ": "")}>
                                <i
                                    className="fi fi-rr-comments"
                                    style={icon}
                                ></i>
                            </button>
                        </div>
                        <div>
                            <button onClick={handleSave}>
                                <i className={saveIcon} style={icon}></i>
                            </button>
                        </div>
                    </div>

                    <div className={(likes_hide? " hidden ": "")}>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {total_likes} likes
                        </p>
                    </div>
                    <div style={{width:'485px',marginLeft:'5px'}}>
                        <p style={{color:'white'}}>
                            {des}
                        </p>
                    </div>
                </div>
            </div>
            <CommentPopup openComments={openComments} toggleCommentPopup={toggleCommentPopup}/>
        </div>
    );
}

export default Post;
