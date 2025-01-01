import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "../common/aws";
import ProtectedRoute from "../components/ProtectedRoute.component";
// min-w-[calc(100vw-20rem)] ml-[20rem] h-full
const EditPage = () => {
    const {
        userAuth, userAuth: { accessToken, profile_img, username, fullname }, setUserAuth,
    } = useContext(UserContext);

    const [image, setImage] = useState(profile_img)

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
                        setImage(url);
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

    return (
        <ProtectedRoute>
            <div className="w-full ml-auto">
                <h1 className="text-white font-bold text-2xl mt-7 ml-[22rem]">Edit Profile</h1>
                <div className="mt-14 ml-[22rem] bg-light-grey max-w-[36rem] h-[5.5rem] rounded-2xl flex">
                    <img className="w-14 h-14 ml-4 mt-4 rounded-full" src={image} alt={username} referrerPolicy="no-referrer" />
                    <div className="flex flex-col ml-4 mt-5">
                        <p className="text-white font-bold">{username}</p>
                        <p className="text-white opacity-70 text-base capitalize">{fullname}</p>
                    </div>
                    <button className="bg-twitter ml-auto mr-4 h-8 min-w-[8rem] my-auto text-white text-base rounded-md font-bold hover:bg-dark-blue flex items-center justify-center" onClick={() => document.getElementById('fileInput').click()}>
                        <input id="fileInput" type="file" className="hidden" accept="image/*"  onChange={handleImageUpload}/>
                        Change photo
                    </button>

                </div>
            </div>
        </ProtectedRoute>
    )
}

export default EditPage;