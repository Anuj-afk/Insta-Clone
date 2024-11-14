import React, { useState } from "react";

function Post() {
    const [likeIcon, setLikeIcon] = useState("fi fi-rs-heart");
    const [saveIcon, setSaveIcon] = useState("fi fi-rr-bookmark");
    // const [isVerified, setIsVerified] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);

    const icon = {
        fontSize: 25,
        color: "white",
    };

    const handleLike = () => {
        if (likeIcon === "fi fi-rs-heart") {
            setLikeIcon("fi fi-sr-heart");
            setLikeCounter((prevLikes) => prevLikes + 1);
        } else {
            setLikeIcon("fi fi-rs-heart");
            setLikeCounter((prevLikes) => prevLikes - 1);
        }
    };

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
                            src="https://imgs.search.brave.com/DG-lQwOpD6baSZBkzBK95jFiR5HptdTky7aTtnjEbaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWVw/YWkub3JnL3N0YXRp/Yy9pbWFnZXMvZG9s/cGhpbjMuc3Zn"
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
                            UserName ☑
                        </h1>
                    </div>
                    <button>
                        <h1 style={{ color: "white", fontWeight: "bold" }}>
                            ...
                        </h1>
                    </button>
                </div>

                <img
                    src="https://imgs.search.brave.com/iLMEW1KwR5cPiFFRxdRWsCGH107qJN0fScgf0YfvoxY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTI1MzQ1MTMwMDYt/Mzc3MTVmMzM2YTM5/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjAuMw"
                    className="card-img-top"
                    alt="..."
                    style={{ width: "490px" }}
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
                            <button onClick={handleLike}>
                                <i className={likeIcon} style={icon}></i>
                            </button>
                            <button>
                                <i
                                    className="fi fi-rr-share-square"
                                    style={icon}
                                ></i>
                            </button>
                            <button>
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

                    <div>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {likeCounter} likes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
