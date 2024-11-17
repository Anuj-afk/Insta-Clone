import React, { useContext } from "react";
import AnimationWrapper from "../common/page.animation";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const SettingsPanel = () => {

    const {userAuth: {username}, setUserAuth} = useContext(UserContext);
    const navigate = useNavigate()
    
    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({access_token: null});
        navigate("/signin")
    }

    return (
        <AnimationWrapper transition={{duration: 0.2}} className="absolute right-0 z-50">
            <div className="bg-black absolute right-0 border border-grey w-60 overflow-hidden duration-200">
                <span className="absolute border-t border-grey w-[100%]"></span>
                <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={signOutUser}>
                    <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>
            </div>
        </AnimationWrapper>
    )
}

export default SettingsPanel;