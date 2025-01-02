import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "../common/aws";
import ProtectedRoute from "../components/ProtectedRoute.component";
import InputBox from "../components/input.component";
// min-w-[calc(100vw-20rem)] ml-[20rem] h-full
const EditPage = () => {

    const dropDownRef = useRef();
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


    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            console.log(data);
            storeInSession("user", JSON.stringify(data));
            setUserAuth(data);
        })
        .catch(({response}) => {
            console.log(response);
            toast.error(response.data.error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "sign-in"?"/signin":"/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        let form = new FormData(authForm);
        let formData = {};
        for(let [key, value] of form.entries()){
            formData[key] = value;
        }
        let {fullname, email, password} = formData;

        if(fullname){
            if(fullname.length < 3){
                return toast.error("Fullname must be at least 3 characters long");
            }
        }
        if(!email.length){
            return toast.error("Enter Email")
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid");
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password should contain at least one uppercase letter, one lowercase letter,number and be at least 6 characters long");
        }
        userAuthThroughServer(serverRoute, formData)
    }

    const handleDropdown = () => {
        console.log(dropDownRef.current)
        dropDownRef.current.classList.toggle("hidden");
    }

    return (
        <ProtectedRoute>
            <Toaster></Toaster>
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
                <form className="max-w-[36rem] ml-[22rem] mt-8" id="authForm ">
                    <h1 className="text-xl font-bold font-sans capitalize mb-2 text-white">
                        Bio
                    </h1>

                    <InputBox name="bio" type="textarea" placeholder="Bio" pClass={true} characterLimit={160}></InputBox>
                    <h1 className="text-xl font-bold font-sans capitalize mb-2 mt-4 text-white">
                        Gender
                    </h1>
                    <div className="relative inline-block text-left w-full h-12">
                        <button id="dropdownButton" className="inline-flex justify-center w-full h-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-gray-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleDropdown}>
                        Options
                            <svg className="w-5 h-5 ml-2 -mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="dropdownMenu" className="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-gray-900 focus:outline-none bg-dark-blue" ref={dropDownRef}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton" >
                                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white" role="menuitem">Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white" role="menuitem">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white" role="menuitem">Logout</a>
                            </div>
                        </div>
                    </div>    
                    <button className="btn-light center mt-14 w-full" type="submit" onClick={handleSubmit}>
                    </button>
                </form>
            </div>
        </ProtectedRoute>
    )
}

export default EditPage;