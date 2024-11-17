import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { UserContext } from "../App";

function CommentPopup({ openComments, toggleCommentPopup}) {

    const {userAuth, userAuth: {profile_img, username, accessToken}} = useContext(UserContext);

    let [allComments, setAllComments]=useState([])
    let [newComment, setNewComment]=useState('')

    const handleNewComment=(e)=>{
        setNewComment(e.target.value)
    }
    
    const pushNewComment=()=>{
        setAllComments((prevComments) => prevComments.concat(newComment));
        setNewComment('')
    }

    return (
        <Popup
            open={openComments}
            onClose={toggleCommentPopup}
            modal
            nested
            contentStyle={{
                backgroundColor: "#262626",
                height: "530px",
                width: "500px",
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                padding: 0,
                borderWidth: "0px",
                overflow: "hidden",
                flexDirection: "column",
                border:'0px'
            }}
        >
            <div
                style={{
                    height: "470px",
                    width: "500px",
                    backgroundColor: "gray",
                }}
            >
                {allComments.map((element)=>(
                    <div key='element' style={{display:'flex',flexDirection:'row',margin:'10px'}}>
                        <img style={{height:'30px',width:'30px',borderRadius:50,marginRight:'10px'}} src={profile_img} alt="..." />
                        <div>
                            <h1>{element}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{
                        height: "60px",
                        width: "500px",
                        backgroundColor: "#262626",
                    }}
                >
                    <textarea
                        rows="6"
                        style={{
                            width: "400px",
                            maxHeight: "50px",
                            minHeight: "50px",
                            resize: "none",
                            border: "none",
                            outline: "none",
                            padding: "10px",
                            color: "white",
                            backgroundColor: "#262626",
                            fontSize: 14,
                            overflow: "auto",
                        }}
                        value={newComment}
                        onChange={handleNewComment}
                    ></textarea>
                </div>
                <button
                    style={{
                        width: "100px",
                        height: "60px",
                        backgroundColor: "#0095f6",
                        border: "2px solid #0095f6 ",
                        cursor: "pointer",
                    }}
                    onClick={pushNewComment}
                >
                    <i className="fi fi-br-check" style={{ fontSize: 22 }}></i>
                </button>
            </div>
        </Popup>
    );
}

export default CommentPopup;
