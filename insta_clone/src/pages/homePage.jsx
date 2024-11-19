import React, { createContext, useContext, useEffect, useState } from "react";
import Post from "../components/Post.component";
import { FilterPagination } from "../common/filterPagination";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimationWrapper from "../common/page.animation";
import Loader from "../components/Loader.component";
import { UserContext } from "../App";
import ProtectedRoute from "../components/ProtectedRoute.component";

const latestPostStructure = {
    results: [],
    page: 1,
    totalDocs: 1,
};

export const latestPostContext = createContext({});

const HomePage = () => {
    let [latestPost, setLatestPost] = useState(null);

    const fetchLatestPost = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-posts", {
                page,
            })
            .then(async ({ data }) => {
                let formattedData = await FilterPagination({
                    state: latestPost,
                    data: data.post,
                    page,
                    totalPages: data.total_pages,
                    countRoute: "/all-latest-posts-count",
                });
                console.log(formattedData);
                setLatestPost(formattedData);
                console.log(formattedData.page);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchLatestPost({ page: 1 });
    }, []);

    return (
        <ProtectedRoute>
            <latestPostContext.Provider value={{ latestPost, setLatestPost }}>
                <AnimationWrapper>
                    {latestPost == null ? (
                        <Loader></Loader>
                    ) : (
                        <div className="flex-1  items-center flex justify-center">
                            <InfiniteScroll
                                dataLength={latestPost.results.length}
                                next={() =>
                                    fetchLatestPost({
                                        page: latestPost.page + 1,
                                    })
                                }
                                hasMore={
                                    latestPost.totalDocs / 5 > latestPost.page
                                }
                                loader={
                                    <h4 style={{ color: "white" }}>
                                        ....................
                                    </h4>
                                }
                            >
                                <div
                                    className="container row"
                                    style={{ marginTop: "120px" }}
                                >
                                    {latestPost.results.map(
                                        (
                                            {
                                                activity: {
                                                    total_likes,
                                                    total_views,
                                                },
                                                author: {
                                                    personal_info: {
                                                        fullname,
                                                        profile_img,
                                                        username,
                                                    },
                                                },
                                                des,
                                                link,
                                                post_id,
                                                likes_hide,
                                                comment_hide,
                                            },
                                            id
                                        ) => (
                                            <div
                                                className="col md-12"
                                                key={id}
                                                style={{
                                                    marginBottom: "100px",
                                                }}
                                            >
                                                <Post
                                                    profile_img={profile_img}
                                                    username={username}
                                                    link={link}
                                                    des={des}
                                                    total_likes={total_likes}
                                                    likes_hide={likes_hide}
                                                    comment_hide={comment_hide}
                                                    post_id={post_id}
                                                    id={id}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </InfiniteScroll>
                        </div>
                    )}
                </AnimationWrapper>
            </latestPostContext.Provider>
        </ProtectedRoute>
    );
};

export default HomePage;
